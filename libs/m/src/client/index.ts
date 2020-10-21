import * as PIXI from 'pixi.js';
import 'pixi-picture';
import { Scrollbox } from 'pixi-scrollbox';
import io from 'socket.io-client';
import { IOEvent, JobId } from '../common/enums';
import { InitPayload } from '../common/payloadTypes';
import { Sequence } from '../common/sequenceQueue';

import './styles.css';
import { store } from './store';
import { Job, jobList } from '../common/jobs';

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

function makeBlurOverlay() {
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

function makePortraitButton(job: Job) {
  const container = new PIXI.Container();

  const portrait = PIXI.Sprite.from(`./assets/portraits/${job.id}.png`);
  portrait.width = 128;
  portrait.height = 128;
  portrait.interactive = true;
  portrait.buttonMode = true;
  container.addChild(portrait);

  const name = new PIXI.Text(job.jobName, { fontSize: 20, fill: '#ffffff' });
  name.anchor.set(0.5, 0);
  name.position.set(64, 132);
  container.addChild(name);

  return container;
}

function makeBanPickContainer() {
  const container = new PIXI.Container();

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0x333333);
  graphics.drawRoundedRect(0, 0, 768, 900, 24);
  graphics.endFill();
  container.addChild(graphics);

  const scrollbox = new Scrollbox({
    boxWidth: 704,
    boxHeight: 400,
    fade: true,
    fadeScrollboxWait: 1000,
    fadeScrollbarTime: 300,
    scrollbarForegroundAlpha: 0.8,
    scrollbarBackgroundAlpha: 0,
    scrollbarSize: 4,
    scrollbarOffsetVertical: 8,
  });
  scrollbox.position.set(32, 32);
  container.addChild(scrollbox);

  for (let i = 0; i < jobList.length; i++) {
    //const portraitButton = makePortraitButton(i + 1);
    const portraitButton = makePortraitButton(jobList[i]);
    portraitButton.position.set(144 * (i % 5), 168 * Math.floor(i / 5));
    scrollbox.content.addChild(portraitButton);
  }
  scrollbox.update();

  container.position.set(app.screen.width / 2, app.screen.height / 2);
  container.pivot.set(container.width / 2, 0);

  return container;
}

const container = new PIXI.Container();
app.stage.addChild(container);

const background = PIXI.Sprite.from('./assets/backgrounds/10.png');
container.addChild(background);

container.addChild(makeBlurOverlay());

container.addChild(makeBanPickContainer());

app.stage.filters = [new PIXI.filters.AlphaFilter()];
app.stage.filterArea = app.screen;

document.body.appendChild(app.view);
