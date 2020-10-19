import * as PIXI from 'pixi.js';
import io from 'socket.io-client';
import { IOEvent, JobId } from '../common/enums';
import { InitPayload } from '../common/payloadTypes';
import { Sequence } from '../common/sequenceQueue';

import './styles.css';
import { store } from './store';

const socket = io({
  reconnectionDelayMax: 10000,
  query: {
    auth: '123',
  },
});

socket.on(IOEvent.INIT, (data: InitPayload) => {
  store.sequenceStore.nextSequence = data.nextSequence; //변뎡
  store.jobStore.initList(
    data.unPickedList,
    data.leftBanList,
    data.rightBanList,
    data.leftPickList,
    data.rightPickList
  );
});

socket.on(IOEvent.START, () => {
  console.log('start');
});

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
