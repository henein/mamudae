import * as PIXI from 'pixi.js';
import io from 'socket.io-client';

import { store } from './store';

const socket = io({
  reconnectionDelayMax: 10000,
  query: {
    auth: '123',
  },
});

socket.emit('chat message', '메세지 입니다.');

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
app.renderer.autoDensity = true;

document.body.appendChild(app.view);
