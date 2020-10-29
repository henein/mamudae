import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';

import State from './state';
import { IOEvent, SequencePayload } from '../common/events';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

dotenv.config();

const state = new State(io);
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/admin.html'));
});

io.on('connection', (socket) => {
  console.log(`[${socket.id}] 접속!`);
  socket.emit(IOEvent.INIT, {
    nextSequence: state.getNextSequence(),
    unPickedList: state.unPickedList,
    leftBanList: state.leftBanList,
    rightBanList: state.rightBanList,
    leftPickList: state.leftPickList,
    rightPickList: state.rightPickList,
    auth: getAuth(socket.handshake.query.key),
  });
  socket.on('disconnect', () => {
    console.log(`[${socket.id}] 접속 끊어짐 ㅠㅠ`);
  });

  socket.on(IOEvent.INIT, () => {
    console.log(`[${socket.id}] 초기화 요청!?`);
    socket.emit(IOEvent.INIT, {
      nextSequence: state.getNextSequence(),
      unPickedList: state.unPickedList,
      leftBanList: state.leftBanList,
      rightBanList: state.rightBanList,
      leftPickList: state.leftPickList,
      rightPickList: state.rightPickList,
      auth: getAuth(socket.handshake.query.key),
    });
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

  socket.on(IOEvent.END, () => {
    if (checkNextEvent(IOEvent.END)) {
      state.onEnd();
    }
  });
});

io.of('/admin').on('connection', (socket) => {
  console.log(`[${socket.id}] 관리자 접속!!!`);
  socket.on('start', () => {
    if (checkNextEvent(IOEvent.START)) {
      state.onStart();
    }
  });
  socket.on('reset', () => {
    console.log(`[${socket.id}] 관리자의 리셋 요청!!!`);
    state.onReset();
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});

function checkNextEvent(event: IOEvent): boolean {
  const nextSequence = state.getNextSequence();

  if (nextSequence?.event == event) {
    return true;
  }
  return false;
}

function getAuth(key: string) {
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
