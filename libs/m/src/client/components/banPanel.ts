import { Portrait } from './portrait';
import { Tween } from '@tweenjs/tween.js';

export class BanPanel extends Portrait {
  private _isNext = false;
  nextOverlay: PIXI.Sprite;

  constructor() {
    super({ size: 84 });
  }

  get isNext(): boolean {
    return this._isNext;
  }

  set isNext(value: boolean) {
    this._isNext = value;
  }
}
