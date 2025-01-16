import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { createId } from '@paralleldrive/cuid2';
import Redis from 'ioredis';
import {
  ClientToServerEvents,
  InterServerEvents,
  JobId,
  RoomState,
  ServerToClientEvents,
  SocketData,
  JobList,
} from '@henein/mamudae-lib';
import { serializeJson } from 'nx/src/utils/json';

const app = express();
const httpServer = http.createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, { cors: { origin: '*' } });

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(cors());

app.use(express.json());

const rooms = new Redis('');

const getRoom = async (roomId: string) => {
  const room = await rooms.get(roomId);

  if (!room) {
    return null;
  }

  return JSON.parse(room) as RoomState;
};

const setRoom = async (roomId: string, room: RoomState) => {
  await rooms.set(roomId, JSON.stringify(room));
};

app.get('/admin', (req, res) => {
  res.render('admin', { jobList: JobList });
});

app.post('/create-room', async (req, res) => {
  const { leftTeamName, rightTeamName, votedPicks, votedBan } = req.body as {
    leftTeamName: string;
    rightTeamName: string;
    votedPicks: JobId[];
    votedBan: JobId;
  };

  if (!leftTeamName || !rightTeamName) {
    res.status(400).send('leftTeamName, rightTeamName 필수');
    return;
  }

  if (!Array.isArray(votedPicks) || votedPicks.length !== 2) {
    res.status(400).send('votedPicks는 2개여야 함');
    return;
  }

  if (!votedBan) {
    res.status(400).send('votedBan 필수');
    return;
  }

  const roomId = createId();
  await setRoom(roomId, {
    sequences: [
      { action: 'start' },
      { action: 'pick', team: 'left', index: 0 },
      { action: 'pick', team: 'right', index: 0 },
      { action: 'ban', team: 'left', index: 0 },
      { action: 'ban', team: 'right', index: 0 },
      { action: 'pick', team: 'right', index: 1 },
      { action: 'pick', team: 'right', index: 2 },
      { action: 'pick', team: 'left', index: 1 },
      { action: 'pick', team: 'left', index: 2 },
      { action: 'pick', team: 'right', index: 3 },
      { action: 'pick', team: 'right', index: 4 },
      { action: 'pick', team: 'left', index: 3 },
      { action: 'pick', team: 'left', index: 4 },
      { action: 'coinToss' },
      { action: 'votePick' },
    ],
    leftTeam: {
      name: leftTeamName ?? 'A',
      pickList: [],
      banList: [],
    },
    rightTeam: {
      name: rightTeamName ?? 'B',
      pickList: [],
      banList: [],
    },
    votedPicks: votedPicks,
    votedBan: votedBan,
  });

  res.json({ roomId });
});

app.post('/start-room', async (req, res) => {
  const { roomId } = req.body as { roomId: string };

  const room = await getRoom(roomId);

  if (!room) {
    res.status(404).send('방이 없음');
    return;
  }

  if (room.sequences[0].action !== 'start') {
    res.status(400).send('이미 시작된 방');
    return;
  }

  room.sequences.shift();
  await setRoom(roomId, room);

  io.to(roomId).emit('update', room);

  res.json({ roomId: roomId, result: '시작!' });
});

app.post('/coin-toss', async (req, res) => {
  const { roomId } = req.body as { roomId: string };

  const room = await getRoom(roomId);

  if (!room) {
    res.status(404).send('방이 없음');
    return;
  }

  if (room.sequences[0].action !== 'coinToss') {
    res.status(400).send('코인 토스 순서가 아님');
    return;
  }

  const coinTossTeam = Math.random() < 0.5 ? 'left' : 'right';
  room.coinTossTeam = coinTossTeam;
  room.sequences.shift();
  await setRoom(roomId, room);

  io.to(roomId).emit('update', room);

  res.json({ roomId: roomId, result: coinTossTeam });
});

io.on('connection', async (socket) => {
  const query = socket.handshake.query;
  const roomId = query.roomId as string;
  const team = query.team as 'left' | 'right';

  {
    const room = await getRoom(roomId);

    if (!room) {
      socket.emit('welcome', undefined, '방이 없음');
      return;
    }

    socket.join(roomId);
    socket.emit('welcome', room);

    // TODO: 방에 있는 사람 체크해야 함. 그리고 저장.

    console.log(`[${socket.id}] connection: ${roomId}, ${team}`);
  }

  socket.on('select', async (jobId) => {
    const room = await getRoom(roomId);

    if (!room) {
      return;
    }

    room.selected = jobId;
    await setRoom(roomId, room);

    io.to(roomId).emit('update', room);

    console.log(`[${socket.id}] select: ${jobId} in ${roomId}`);
  });

  socket.on('push', async (jobId) => {
    const room = await getRoom(roomId);

    if (!room) {
      return;
    }

    const nextSequence = room.sequences[0];

    if (nextSequence.team !== team) {
      return;
    }

    const teamData = team === 'left' ? room.leftTeam : room.rightTeam;

    if (nextSequence.action === 'ban') {
      teamData.banList.push(jobId);
    } else if (nextSequence.action === 'pick') {
      teamData.pickList.push(jobId);
    } else {
      return;
    }

    room.sequences.shift();
    room.selected = undefined;
    await setRoom(roomId, room);

    io.to(roomId).emit('update', room);

    console.log(`[${socket.id}] ban: ${jobId} in ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[${socket.id}] 접속 끊어짐 ㅠㅠ`);
  });
});

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});
