import { Scrollbox } from 'pixi-scrollbox';
import { Tween } from '@tweenjs/tween.js';
import { Job, jobList } from '../../common/jobs';
import { constants } from '../constants';
import { Portrait } from './portrait';

class PortraitButton extends PIXI.Container {
  private _isDisabled = false;
  portrait: Portrait;
  filter: PIXI.filters.ColorMatrixFilter;

  constructor(job: Job) {
    super();
    this.portrait = this.addChild(new Portrait({ size: 128, jobId: job.id }));
    this.portrait.interactive = true;
    this.portrait.buttonMode = true;
    this.filter = new PIXI.filters.ColorMatrixFilter();
    this.portrait.filters = [this.filter];

    this.portrait.on('pointerdown', () => {
      if (!this.isDisabled) {
        console.log(job.jobName);
      }
    });
    this.portrait.on('pointerover', () => {
      if (!this.isDisabled) {
        this.filter.brightness(1.2, false);
      }
    });
    this.portrait.on('pointerout', () => {
      if (!this.isDisabled) {
        this.filter.reset();
      }
    });

    const name = this.addChild(
      new PIXI.Text(job.jobName, { fontSize: 20, fill: '#000000' })
    );
    name.anchor.set(0.5, 0);
    name.position.set(64, 132);
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    this._isDisabled = value;

    if (value) {
      this.filter.greyscale(0.2, false);
      this.portrait.interactive = false;
      this.portrait.buttonMode = false;
    } else {
      this.filter.reset();
      this.portrait.interactive = true;
      this.portrait.buttonMode = true;
    }
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

    const portraitButtonList: PortraitButton[] = [];

    for (let i = 0; i < jobList.length; i++) {
      portraitButtonList[i] = scrollbox.content.addChild(
        new PortraitButton(jobList[i])
      );
      portraitButtonList[i].position.set(
        48 + 176 * (i % 5),
        168 * Math.floor(i / 5)
      );
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
