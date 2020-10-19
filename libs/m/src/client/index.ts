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

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  backgroundColor: 0x1099bb,
});
app.renderer.autoDensity = true;

const container = new PIXI.Container();
app.stage.addChild(container);

const blurBackground = PIXI.Sprite.from('./assets/backgrounds/10.png');
const blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 16;
blurBackground.filters = [blurFilter];
blurBackground.filterArea;
container.addChild(blurBackground);

const multiply = PIXI.Sprite.from('./assets/backgrounds/multiply.png');
multiply.blendMode = PIXI.BLEND_MODES.MULTIPLY;
container.addChild(multiply);

const background = PIXI.Sprite.from('./assets/backgrounds/10.png');
const graphics = new PIXI.Graphics();
graphics.beginFill(0xff3300);
graphics.drawRect(428, 248, 1064, 800);
graphics.endFill();
background.mask = graphics;
container.addChild(background);

document.body.appendChild(app.view);
