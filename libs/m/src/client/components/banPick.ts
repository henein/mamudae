import { Scrollbox } from 'pixi-scrollbox';
import TWEEN from '@tweenjs/tween.js';
import { Job, jobList } from '../../common/jobs';
import { constants } from '../constants';

function makePortraitButton(job: Job) {
  const container = new PIXI.Container();

  const portrait = PIXI.Sprite.from(`./assets/portraits/${job.id}.png`);
  portrait.width = 128;
  portrait.height = 128;
  portrait.interactive = true;
  portrait.buttonMode = true;
  container.addChild(portrait);

  const name = new PIXI.Text(job.jobName, { fontSize: 20, fill: '#000000' });
  name.anchor.set(0.5, 0);
  name.position.set(64, 132);
  container.addChild(name);

  return container;
}

export function createBanPickModal() {
  const container = new PIXI.Container();

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0xffffff, 0.9);
  graphics.drawRoundedRect(0, 0, 928, 672, 24);
  graphics.endFill();
  container.addChild(graphics);

  const scrollbox = new Scrollbox({
    boxWidth: 928,
    boxHeight: 576,
    fade: true,
    fadeScrollboxWait: 1000,
    fadeScrollbarTime: 300,
    scrollbarForegroundAlpha: 0.8,
    scrollbarBackgroundAlpha: 0,
    scrollbarOffsetVertical: -16,
    scrollbarSize: 4,
  });
  scrollbox.position.set(0, 48);
  container.addChild(scrollbox);

  const widthBox = new PIXI.Graphics();
  widthBox.beginFill(0xffffff, 0);
  widthBox.drawRect(0, 0, 928, 10);
  widthBox.endFill();
  scrollbox.content.addChild(widthBox);

  for (let i = 0; i < jobList.length; i++) {
    //const portraitButton = makePortraitButton(i + 1);
    const portraitButton = makePortraitButton(jobList[i]);
    portraitButton.position.set(48 + 176 * (i % 5), 168 * Math.floor(i / 5));
    scrollbox.content.addChild(portraitButton);
  }
  scrollbox.update();

  container.position.set(constants.BASE_WIDTH / 2, 648 + 24);
  container.alpha = 0;
  container.pivot.set(container.width / 2, container.height / 2);

  new TWEEN.Tween(container)
    .to({ position: { y: '-24' }, alpha: 1 }, 200)
    .start();

  return container;
}
