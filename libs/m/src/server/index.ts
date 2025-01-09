import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';

import State from './state';
import { InitPayload, IOEvent, SequencePayload } from '../common/events';
import { SelectPayload, TeamNamePayload } from './../common/events';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

dotenv.config();

const port = process.env.PORT || 3000;

let state = new State(io);

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/admin.html'));
});

const onInit = (socket: Socket) => {
  const payload: InitPayload = {
    nextSequence: state.nextSequence,
    nextNextSequence: state.nextNextSequence,
    leftTeamName: state.leftTeamName,
    rightTeamName: state.rightTeamName,
    unPickedList: state.unPickedList,
    leftBanList: state.leftBanList,
    rightBanList: state.rightBanList,
    leftPickList: state.leftPickList,
    rightPickList: state.rightPickList,
    leftOpponentPick: state.leftOpponentPick,
    rightOpponentPick: state.rightOpponentPick,
    auth: getAuth(socket.handshake.query.key),
    leftSelect: state.leftSelect,
    rightSelect: state.rightSelect,
  };

  socket.emit(IOEvent.INIT, payload);
};

io.on('connection', (socket) => {
  console.log(`[${socket.id}] 접속!`);
  onInit(socket);

  socket.on('disconnect', () => {
    console.log(`[${socket.id}] 접속 끊어짐 ㅠㅠ`);
  });

  socket.on(IOEvent.INIT, () => {
    console.log(`[${socket.id}] 초기화 요청!?`);
    onInit(socket);
  });

  socket.on(IOEvent.BAN_PICK, (payload: SequencePayload) => {
    if (checkNextEvent(IOEvent.BAN_PICK)) {
      if (
        payload.team == 'left' &&
        getAuth(socket.handshake.query.key) == 'leftLeader'
      ) {
        state.onBanPick(payload);
      } else if (
        payload.team == 'right' &&
        getAuth(socket.handshake.query.key) == 'rightLeader'
      ) {
        state.onBanPick(payload);
      }
    }
  });

  socket.on(IOEvent.SELECT, (payload: SelectPayload) => {
    if (checkNextEvent(IOEvent.BAN_PICK)) {
      if (
        payload.leftSelect &&
        getAuth(socket.handshake.query.key) == 'leftLeader'
      ) {
        state.onSelect({ leftSelect: payload.leftSelect });
      } else if (
        payload.rightSelect &&
        getAuth(socket.handshake.query.key) == 'rightLeader'
      ) {
        state.onSelect({ rightSelect: payload.rightSelect });
      }
    }
  });
});

io.of('/admin').on('connection', (socket) => {
  if (checkAdmin(socket.handshake.query.key)) {
    console.log(`[${socket.id}] 관리자 접속!!!`);

    socket.emit(IOEvent.LOGIN, true, state.leftTeamName, state.rightTeamName);

    socket.on('disconnect', () => {
      console.log(`[${socket.id}] 관리자 접속 끊어짐 ㅠㅠ`);
    });

    socket.on(IOEvent.TEAM_NAME, (payload: TeamNamePayload) => {
      console.log(
        `[${socket.id}] 팀명 변경: left=${payload.leftTeamName} right=${payload.rightTeamName}`
      );
      state.onTeamName(payload);
    });

    socket.on(IOEvent.START, () => {
      if (checkNextEvent(IOEvent.START)) {
        state.onStart();
      }
    });

    socket.on(IOEvent.RESET, () => {
      console.log(`[${socket.id}] 관리자의 리셋 요청!!!`);
      state = new State(io);
      io.emit(IOEvent.RESET);
    });

    socket.on(IOEvent.END, () => {
      if (checkNextEvent(IOEvent.END)) {
        state.onEnd();
      }
    });
  } else {
    console.log(`[${socket.id}] 관리자 암호 불일치`);
    socket.emit('login', false, '', '');
  }
});

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});

function checkNextEvent(event: IOEvent): boolean {
  const nextSequence = state.nextSequence;

  if (nextSequence?.event == event) {
    return true;
  }
  return false;
}

function checkAdmin(key?: string | string[]) {
  if (key == process.env.ADMIN_KEY) {
    return true;
  }
  return false;
}

function getAuth(key?: string | string[]) {
  switch (key) {
    case process.env.LEFT_MEMBER_KEY:
      return 'leftMember';
    case process.env.RIGHT_MEMBER_KEY:
      return 'rightMember';
    case process.env.LEFT_LEADER_KEY:
      return 'leftLeader';
    case process.env.RIGHT_LEADER_KEY:
      return 'rightLeader';
    default:
      return undefined;
  }
}
