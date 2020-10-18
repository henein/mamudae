import * as PIXI from 'pixi.js';
import io from 'socket.io-client';

import './styles.css';
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
const sprite = PIXI.Sprite.from('./assets/splashes/10.png');
sprite.anchor.set(0.5);
app.stage.addChild(sprite);

document.body.appendChild(app.view);

window.addEventListener('resize', onResize);

function onResize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  sprite.position.set(app.screen.width / 2, app.screen.height / 2);
}
onResize();
