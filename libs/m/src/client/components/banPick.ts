import { Scrollbox } from 'pixi-scrollbox';
import TWEEN, { Tween } from '@tweenjs/tween.js';
import { Job, jobList } from '../../common/jobs';
import { constants } from '../constants';

function makePortraitButton(job: Job) {
  const container = new PIXI.Container();

  const portrait = PIXI.Sprite.from(`./assets/portraits/${job.id}.png`);
  portrait.width = 128;
  portrait.height = 128;
  portrait.interactive = true;
  portrait.buttonMode = true;
  portrait.on('pointerdown', () => {
    console.log(job.jobName);
  });
  container.addChild(portrait);

  const name = new PIXI.Text(job.jobName, { fontSize: 20, fill: '#000000' });
  name.anchor.set(0.5, 0);
  name.position.set(64, 132);
  container.addChild(name);

  return container;
}

let isVision = false;

export function createBanPickModal() {
  const container = new PIXI.Container();
  const modal = container.addChild(new PIXI.Container());
  modal.interactiveChildren = false;

  const graphics = modal.addChild(new PIXI.Graphics());
  graphics.beginFill(0xffffff, 0.9);
  graphics.drawRoundedRect(0, 0, 928, 672, 24);
  graphics.endFill();

  const scrollbox = modal.addChild(
    new Scrollbox({
      boxWidth: 928,
      boxHeight: 576,
      fade: true,
      fadeScrollboxWait: 1000,
      fadeScrollbarTime: 300,
      scrollbarForegroundAlpha: 0.8,
      scrollbarBackgroundAlpha: 0,
      scrollbarOffsetVertical: -16,
      scrollbarSize: 4,
    })
  );
  scrollbox.position.set(0, 48);

  const widthBox = scrollbox.content.addChild(new PIXI.Graphics());
  widthBox.beginFill(0xffffff, 0);
  widthBox.drawRect(0, 0, 928, 10);
  widthBox.endFill();

  for (let i = 0; i < jobList.length; i++) {
    const portraitButton = scrollbox.content.addChild(
      makePortraitButton(jobList[i])
    );

    portraitButton.position.set(48 + 176 * (i % 5), 168 * Math.floor(i / 5));
  }
  scrollbox.update();

  modal.position.set(constants.BASE_WIDTH / 2, 648 + 24);
  modal.alpha = 0;
  modal.pivot.set(modal.width / 2, modal.height / 2);

  const appearTween = new TWEEN.Tween(modal).to(
    { position: { y: 648 }, alpha: 1 },
    200
  );

  const disappearTween = new TWEEN.Tween(modal).to(
    { position: { y: 648 + 24 }, alpha: 0 },
    200
  );

  const toggleButton = container.addChild(new PIXI.Graphics());
  toggleButton.beginFill(0xffffff, 1);
  toggleButton.drawRect(1920 / 2 - 50, 1080 - 60 - 16, 100, 48);
  toggleButton.endFill();
  toggleButton.interactive = true;
  toggleButton.buttonMode = true;
  toggleButton.on('pointerdown', () => {
    console.log(isVision);
    if (isVision) {
      isVision = false;
      modal.interactiveChildren = false;
      appearTween.stop();
      disappearTween.start();
    } else {
      isVision = true;
      modal.interactiveChildren = true;
      disappearTween.stop();
      appearTween.start();
    }
  });

  return container;
}
