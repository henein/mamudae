import { Easing, Tween } from '@tweenjs/tween.js';
import { Job, jobList } from '../../common/jobs';
import { constants } from '../constants';
import { Portrait } from './portrait';
import { Button } from './button';
import { TextButton } from './textButton';
import { store } from '../store';
import { autorun, reaction } from 'mobx';
import {
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from 'pixi.js';
import { ScrollBox } from '@pixi/ui';

class PortraitButton extends Button {
  private _isSelected = false;
  job: Job;
  portrait: Portrait;
  overlay: Sprite;

  constructor(job: Job) {
    super();
    this.job = job;
    this.portrait = this.addChild(new Portrait({ size: 128, jobId: job.id }));
    this.hitArea = new Rectangle(0, 0, 128, 128);

    this.overlay = this.addChild(
      Sprite.from('../assets/portraits/overlay.png')
    );
    this.overlay.visible = false;

    const name = this.addChild(
      new Text(
        job.jobName,
        new TextStyle({
          fontFamily: 'NanumBarunGothic',
          fontSize: 20,
          fill: '#404040',
        })
      )
    );
    name.anchor.set(0.5, 0);
    name.position.set(64, 132);
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;

    if (value) {
      this.overlay.visible = true;
    } else {
      this.overlay.visible = false;
    }
  }
}

export class BanPickModal extends Container {
  private _isVision = false;
  modal: Container;
  appearTween: Tween<Container>;
  disappearTween: Tween<Container>;
  selectedButton?: PortraitButton;
  toggleButton: Sprite;
  returnButton: TextButton;

  constructor() {
    super();
    this.modal = this.addChild(new Container());
    this.modal.interactiveChildren = false;

    this.appearTween = new Tween(this.modal)
      .to({ position: { y: 576 }, alpha: 1 }, 500)
      .easing(Easing.Quartic.Out);

    this.disappearTween = new Tween(this.modal)
      .to({ position: { y: 576 + 24 }, alpha: 0 }, 100)
      .easing(Easing.Quartic.Out);

    const graphics = this.modal.addChild(new Graphics());
    graphics.beginFill(0xffffff, 0.8);
    graphics.drawRoundedRect(0, 0, 928, 752, 64);
    graphics.endFill();

    const scrollBox = this.modal.addChild(
      new ScrollBox({
        width: 928,
        height: 576,
      })
    );
    scrollBox.position.set(0, 48);

    const widthBox = scrollBox.addChild(new Graphics());
    widthBox.beginFill(0xffffff, 0);
    widthBox.drawRect(0, 0, 928, 10);
    widthBox.endFill();

    const portraitButtonList: PortraitButton[] = [];

    for (let i = 0; i < jobList.length; i++) {
      portraitButtonList[i] = scrollBox.addChild(
        new PortraitButton(jobList[i])
      );
      portraitButtonList[i].position.set(
        48 + 176 * (i % 5),
        168 * Math.floor(i / 5)
      );
      portraitButtonList[i].on('pointertap', () => {
        if (!portraitButtonList[i].isDisabled) {
          store.sequenceStore.emitSelect(portraitButtonList[i].job.id);
        }
      });
    }

    reaction(
      () => store.sequenceStore.reset,
      () => {
        portraitButtonList.forEach((value) => {
          if (store.jobStore.disableList.indexOf(value.job.id) == -1) {
            value.isDisabled = false;
          } else {
            value.isDisabled = true;
          }
        });
      }
    );

    autorun(() => {
      if (store.jobStore.disableList.length) {
        portraitButtonList.forEach((value) => {
          if (store.jobStore.disableList.indexOf(value.job.id) == -1) {
            value.isDisabled = false;
          } else {
            value.isDisabled = true;
          }
        });
      }
    });

    this.returnButton = this.modal.addChild(
      new TextButton({
        title: '선택',
        backgroundColor: 0x0075ca,
        textColor: 0xffffff,
        width: 200,
        height: 96,
      })
    );
    this.returnButton.isDisabled = true;
    this.returnButton.pivot.set(this.returnButton.width / 2, 0);
    this.returnButton.position.set(928 / 2, 640);
    this.returnButton.on('pointertap', () => {
      if (store.jobStore.teamSelect) {
        store.sequenceStore.emitBanPick();
        this.isVision = false;
      }
    });

    autorun(() => {
      if (this.selectedButton) {
        this.selectedButton.isSelected = false;
      }

      if (store.jobStore.teamSelect) {
        this.selectedButton = portraitButtonList[store.jobStore.teamSelect - 1];
        this.selectedButton.isSelected = true;
        this.returnButton.isDisabled = false;
      } else {
        this.returnButton.isDisabled = true;
      }
    });

    this.modal.position.set(constants.BASE_WIDTH / 2, 576 + 24);
    this.modal.alpha = 0;
    this.modal.pivot.set(this.modal.width / 2, this.modal.height / 2);

    this.toggleButton = this.addChild(Sprite.from('../assets/ui/up.png'));
    this.toggleButton.position.set(910, 1000);
    this.toggleButton.on('pointerdown', this.onToggle);

    autorun(() => {
      const auth = store.sequenceStore.auth;

      if (auth == 'leftMember' || auth == 'rightMember') {
        this.toggleButton.visible = false;
      } else {
        this.toggleButton.visible = true;
      }
    });

    autorun(() => {
      if (store.jobStore.isModalEnabled) {
        this.toggleButton.alpha = 1;
        this.toggleButton.interactive = true;
        // this.toggleButton.buttonMode = true;
      } else {
        this.toggleButton.alpha = 0.3;
        this.toggleButton.interactive = false;
        // this.toggleButton.buttonMode = false;
        this.isVision = false;
      }
    });
  }

  onToggle = () => {
    if (this.isVision) {
      this.isVision = false;
    } else {
      this.isVision = true;
    }
  };

  get isVision(): boolean {
    return this._isVision;
  }

  set isVision(value: boolean) {
    this._isVision = value;

    if (this._isVision) {
      this.modal.interactiveChildren = true;
      this.disappearTween.stop();
      this.appearTween.start();
      this.toggleButton.texture = Texture.from('../assets/ui/down.png');
    } else {
      this.modal.interactiveChildren = false;
      this.appearTween.stop();
      this.disappearTween.start();
      this.toggleButton.texture = Texture.from('../assets/ui/up.png');
    }
  }
}
