import { Portrait } from './portrait';
import { Tween, Easing } from '@tweenjs/tween.js';
import { autorun, IReactionDisposer } from 'mobx';
import { Container, Sprite } from 'pixi.js';
import { store } from '../../../store/state-store';
import { getJob } from '@henein/mamudae-lib';
import { th } from 'date-fns/locale';

export class BanPanel extends Container {
  private _isNext = false;
  private _tween: Tween<Sprite>;
  portrait: Portrait;
  nextOverlay: Sprite;
  currentDisposer?: IReactionDisposer;

  constructor(size: number) {
    super();

    this.portrait = this.addChild(new Portrait({ size, jobId: 0 }));

    this.nextOverlay = this.addChild(
      Sprite.from('main/portraits/next_ban.png'),
    );
    this.nextOverlay.alpha = 0;
    this.nextOverlay.width = size;
    this.nextOverlay.height = size;
    this._tween = new Tween(this.nextOverlay)
      .to({ alpha: 1 }, 1000)
      .easing(Easing.Quadratic.InOut)
      .repeat(Infinity)
      .yoyo(true);
  }

  get isNext(): boolean {
    return this._isNext;
  }

  set isNext(value: boolean) {
    this._isNext = value;

    if (this.currentDisposer) {
      this.currentDisposer();
      this.portrait.alpha = 1;
    }

    this.currentDisposer = autorun(() => {
      const selectJobId = store.roomState?.selected;

      if (!selectJobId) {
        return;
      }

      this.portrait.jobId = selectJobId;
      this.portrait.alpha = 0.5
    });

    if (this._isNext) {
      this.nextOverlay.alpha = 0.2;
      this._tween.start();
    } else {
      this._tween.stop();
      this.nextOverlay.alpha = 0;
    }
  }
}
