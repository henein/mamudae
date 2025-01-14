import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import { createId } from '@paralleldrive/cuid2';
import { JobId, RoomState, Team } from '@henein/mamudae-lib';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(cors());

const rooms = new Map<string, RoomState>();

// app.get('/admin', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/admin.html'));
// });

app.post('/create-room', (req, res) => {
  const { myTeam, leftTeamName, rightTeamName, votedPicks, votedBan } = req.body as {
    myTeam: Team;
    leftTeamName: string;
    rightTeamName: string;
    votedPicks: JobId[];
    votedBan: JobId;
  };

  if (!myTeam) {
    res.status(400).send('myTeam 필수');
    return;
  }

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

  rooms.set(roomId, {
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
      { action: 'votePick' },
      { action: 'pick', team: 'left', index: 5 },
      { action: 'pick', team: 'right', index: 5 },
      { action: 'end' },
    ],
    leftTeam: {
      name: leftTeamName ?? '팀1',
      pickList: [],
      banList: [],
    },
    rightTeam: {
      name: rightTeamName ?? '팀2',
      pickList: [],
      banList: [],
    },
    votedPicks: votedPicks,
    votedBan: votedBan,
  });

  res.json({ roomId });
});

io.on('connection', (socket) => {
  console.log(`[${socket.id}] 접속!`);
  // onInit(socket);

  socket.on('disconnect', () => {
    console.log(`[${socket.id}] 접속 끊어짐 ㅠㅠ`);
  });
});

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});
