/*
  스프라이트 화질 개선?
*/

import { autorun } from 'mobx';
import { store } from '../store';

export class Camera extends PIXI.Container {
  private _background: PIXI.Sprite;
  private _splash: PIXI.Sprite;

  constructor() {
    super();

    this._background = this.addChild(
      PIXI.Sprite.from('./assets/backgrounds/10.png')
    );

    this._splash = this.addChild(PIXI.Sprite.from('./assets/splashes/1.png'));
    this._splash.anchor.set(0.5);
    this._splash.scale.set(2);
    this._splash.position.set(1920 / 2, 1080 / 2);

    autorun(() => {
      if (!store.jobStore.selectedJob) {
        this._splash.visible = false;
      } else {
        this._splash.texture = PIXI.Texture.from(
          `./assets/splashes/${store.jobStore.selectedJob}.png`
        );
        this._splash.visible = true;
      }
    });

    this.addChild(createBlurOverlay());

    this.addChild(PIXI.Sprite.from('./assets/backgrounds/cameraUI.png'));
  }
}

function createBlurOverlay() {
  const container = new PIXI.Container();

  const blurFilter = new PIXI.filters.BlurFilter();
  blurFilter.blur = 16;
  blurFilter.quality = 6;

  const graphics = PIXI.Sprite.from('./assets/backgrounds/multiply.png');
  graphics.filters = [new PIXI.picture.MaskFilter(blurFilter)];
  container.addChild(graphics);

  const multiply = PIXI.Sprite.from('./assets/backgrounds/multiply.png');
  multiply.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  container.addChild(multiply);

  return container;
}
