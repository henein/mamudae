import * as PIXI from 'pixi.js';
import 'pixi-picture';
import io from 'socket.io-client';
import TWEEN from '@tweenjs/tween.js';
import { IOEvent, JobId } from '../common/enums';
import { InitPayload } from '../common/events';
import { constants } from './constants';
import { BanPickModal } from './components/banPickModal';
import './styles.css';
import { store } from './store';
import { Portrait } from './components/portrait';
import { BanViewer } from './components/banViewer';

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

  setTimeout(() => {
    store.jobStore.moveJob({ action: 'ban', team: 'left', jobId: JobId.ADELE });
  }, 2000);
  setTimeout(() => {
    store.jobStore.moveJob({
      action: 'ban',
      team: 'left',
      jobId: JobId.ANGELIC_BUSTER,
    });
  }, 3000);
  setTimeout(() => {
    store.jobStore.moveJob({
      action: 'ban',
      team: 'left',
      jobId: JobId.BLASTER,
    });
  }, 4000);
  setTimeout(() => {
    store.jobStore.moveJob({
      action: 'ban',
      team: 'left',
      jobId: JobId.ARAN,
    });
  }, 5000);
});

socket.on(IOEvent.START, () => {
  console.log('start');
});

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
});
app.renderer.autoDensity = true;

function createBlurOverlay() {
  const container = new PIXI.Container();

  const blurFilter = new PIXI.filters.BlurFilter();
  blurFilter.blur = 16;

  const graphics = PIXI.Sprite.from('./assets/backgrounds/multiply.png');
  graphics.filters = [new PIXI.picture.MaskFilter(blurFilter)];
  container.addChild(graphics);

  const multiply = PIXI.Sprite.from('./assets/backgrounds/multiply.png');
  multiply.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  container.addChild(multiply);

  return container;
}

const baseContainer = new PIXI.Container();

baseContainer.addChild(PIXI.Sprite.from('./assets/backgrounds/10.png'));

baseContainer.addChild(PIXI.Sprite.from('./assets/splashes/10.png'));

baseContainer.addChild(createBlurOverlay());

baseContainer.addChild(PIXI.Sprite.from('./assets/backgrounds/cameraUI.png'));

baseContainer.addChild(new BanViewer());

baseContainer.addChild(new BanPickModal());

baseContainer.pivot.set(constants.BASE_WIDTH / 2, constants.BASE_HEIGHT / 2);
app.stage.addChild(baseContainer);

app.stage.filters = [new PIXI.filters.AlphaFilter()];
app.stage.filterArea = app.screen;

app.ticker.add(() => {
  TWEEN.update();
});

document.body.appendChild(app.view);

window.addEventListener('resize', onResize);

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;

  app.renderer.resize(width, height);

  if (ratio < constants.BASE_RATIO) {
    baseContainer.scale.set(width / constants.BASE_WIDTH);
  } else {
    baseContainer.scale.set(height / constants.BASE_HEIGHT);
  }
  baseContainer.position.set(width / 2, height / 2);
}
onResize();
