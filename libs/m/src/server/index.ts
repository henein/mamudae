import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

import { IOEvent } from '../common/enums';
import State from './state';
import { SequencePayload } from '../common/payloadTypes';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const state = new State(io);
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log(`[${socket.id}] connected`);
  socket.emit(IOEvent.INIT, {
    nextSequence: state.getNextSequence(),
    unPickedList: state.unPickedList,
    leftBanList: state.leftBanList,
    rightBanList: state.rightBanList,
    leftPickList: state.leftPickList,
    rightPickList: state.rightPickList,
  });
  socket.on('disconnect', () => {
    console.log(`[${socket.id}] disconnected`);
  });

  socket.on(IOEvent.START, () => {
    if (checkNextEvent(IOEvent.START)) {
      state.onStart();
    }
  });

  socket.on(IOEvent.BAN, (payload: SequencePayload) => {
    if (checkNextEvent(IOEvent.BAN, payload)) {
      state.onBan(payload);
    }
  });

  socket.on(IOEvent.PICK, (payload: SequencePayload) => {
    if (checkNextEvent(IOEvent.PICK, payload)) {
      state.onPick(payload);
    }
  });

  socket.on(IOEvent.END, () => {
    if (checkNextEvent(IOEvent.END)) {
      state.onEnd();
    }
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('메이플 교차 선택기 실행 됨!');
});

function checkNextEvent(event: IOEvent, payload?: SequencePayload): boolean {
  const nextSequence = state.getNextSequence();

  if (nextSequence?.event == event) {
    if (deepEqual(nextSequence?.payload, payload)) {
      return true;
    }
  }
  return false;
}

function deepEqual(x: any, y: any) {
  if (x === y) {
    return true;
  } else if (
    typeof x == 'object' &&
    x != null &&
    typeof y == 'object' &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
}
