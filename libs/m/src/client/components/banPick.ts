import { Scrollbox } from 'pixi-scrollbox';
import { Tween } from '@tweenjs/tween.js';
import { Job, jobList } from '../../common/jobs';
import { constants } from '../constants';
import { Portrait } from './portrait';

class PortraitButton extends PIXI.Container {
  constructor(job: Job) {
    super();
    const portrait = this.addChild(new Portrait({ size: 128, jobId: job.id }));

    portrait.interactive = true;
    portrait.buttonMode = true;
    portrait.on('pointerdown', () => {
      console.log(job.jobName);
    });

    const name = this.addChild(
      new PIXI.Text(job.jobName, { fontSize: 20, fill: '#000000' })
    );
    name.anchor.set(0.5, 0);
    name.position.set(64, 132);
  }
}

export class BanPickModal extends PIXI.Container {
  modal: PIXI.Container;
  appearTween: Tween<PIXI.Container>;
  disappearTween: Tween<PIXI.Container>;
  isVision = false;

  constructor() {
    super();
    this.modal = this.addChild(new PIXI.Container());
    this.modal.interactiveChildren = false;

    this.appearTween = new Tween(this.modal).to(
      { position: { y: 648 }, alpha: 1 },
      200
    );

    this.disappearTween = new Tween(this.modal).to(
      { position: { y: 648 + 24 }, alpha: 0 },
      200
    );

    const graphics = this.modal.addChild(new PIXI.Graphics());
    graphics.beginFill(0xffffff, 0.9);
    graphics.drawRoundedRect(0, 0, 928, 672, 24);
    graphics.endFill();

    const scrollbox = this.modal.addChild(
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
        new PortraitButton(jobList[i])
      );

      portraitButton.position.set(48 + 176 * (i % 5), 168 * Math.floor(i / 5));
    }
    scrollbox.update();

    this.modal.position.set(constants.BASE_WIDTH / 2, 648 + 24);
    this.modal.alpha = 0;
    this.modal.pivot.set(this.modal.width / 2, this.modal.height / 2);

    const toggleButton = this.addChild(new PIXI.Graphics());
    toggleButton.beginFill(0xffffff, 1);
    toggleButton.drawRect(1920 / 2 - 50, 1080 - 60 - 16, 100, 48);
    toggleButton.endFill();
    toggleButton.interactive = true;
    toggleButton.buttonMode = true;
    toggleButton.on('pointerdown', this.onToggle);
  }

  onToggle = () => {
    if (this.isVision) {
      this.isVision = false;
      this.modal.interactiveChildren = false;
      this.appearTween.stop();
      this.disappearTween.start();
    } else {
      this.isVision = true;
      this.modal.interactiveChildren = true;
      this.disappearTween.stop();
      this.appearTween.start();
    }
  };
}
