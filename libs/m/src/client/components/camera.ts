/*
  스프라이트 화질 개선?
*/

import { autorun } from 'mobx';
import { store } from '../store';
import { Tween } from '@tweenjs/tween.js';
import SimplexNoise from 'simplex-noise';
import { Easing } from '@tweenjs/tween.js';

export class Camera extends PIXI.Container {
  private _background: PIXI.Sprite;
  private _nextBackground: PIXI.Sprite;
  private _splash: PIXI.heaven.Sprite;
  private _colorFilter: PIXI.filters.ColorMatrixFilter;
  private _blurFilter: PIXI.filters.BlurFilter;
  private _simplexX = new SimplexNoise(Math.random);
  private _simplexY = new SimplexNoise(Math.random);
  private _changeTween?: Tween<any>;
  private _nextChangeTween?: Tween<any>;
  private _selecteTween?: Tween<any>;
  private _shakeTween: Tween<any>;
  private _shakeRange = 0;

  constructor() {
    super();

    const container = this.addChild(new PIXI.Container());

    this._background = container.addChild(
      PIXI.Sprite.from('./assets/backgrounds/10.png')
    );

    this._nextBackground = container.addChild(new PIXI.Sprite());

    this._splash = container.addChild(new PIXI.Sprite()).convertToHeaven();
    this._splash.anchor.set(0.5);
    this._splash.scale.set(2);
    this._splash.position.set(1920 / 2, 1080 / 2);

    this._colorFilter = new PIXI.filters.ColorMatrixFilter();
    this._blurFilter = new PIXI.filters.BlurFilter();
    this._blurFilter.enabled = false;
    this._blurFilter.blur = 0;
    this._blurFilter.quality = 10;

    autorun(() => {
      if (!store.jobStore.selectedJob) {
        if (store.jobStore.selectedJob == 0) {
          const preTween = new Tween({ dark: 0, shakeRange: 64 })
            .to({ dark: 1, shakeRange: 0 }, 1000)
            .easing(Easing.Quartic.InOut)
            .onUpdate((object) => {
              this._splash.color.setDark(object.dark, object.dark, object.dark);
              this.shakeRange = object.shakeRange;
            });

          const afterTween = new Tween({ scale: 2 })
            .to({ scale: 0 }, 300)
            .easing(Easing.Quartic.In)
            .onUpdate((object) => {
              this._splash.scale.set(object.scale);
            })
            .onComplete(() => {
              if (this._nextChangeTween) {
                this._changeTween = this._nextChangeTween.start();
                this._nextChangeTween = undefined;
              } else {
                this._selecteTween = undefined;
              }
            });

          this._selecteTween = preTween.chain(afterTween).start();
        } else {
          this._splash.visible = false;
        }
      } else {
        const preTween = new Tween({
          brightness: 1,
          blur: 0,
          nextBackgroundAlpha: 0,
          jobId: store.jobStore.selectedJob,
        })
          .to(
            {
              brightness: 1.3,
              blur: 32,
              nextBackgroundAlpha: 1,
            },
            300
          )
          .easing(Easing.Quartic.InOut)
          .onStart((object) => {
            this._colorFilter.reset();
            this._blurFilter.enabled = true;
            this._blurFilter.blur = object.blur;
            this._background.alpha = 1;
            this._nextBackground.visible = true;
            this._nextBackground.alpha = object.nextBackgroundAlpha;
            this._nextBackground.texture = PIXI.Texture.from(
              '../assets/backgrounds/11.png'
            );
          })
          .onUpdate((object) => {
            this._colorFilter.brightness(object.brightness, false);
            this._blurFilter.blur = object.blur;
            this._nextBackground.alpha = object.nextBackgroundAlpha;
          });

        const afterTween = new Tween({
          brightness: 1.3,
          blur: 32,
          jobId: store.jobStore.selectedJob,
        })
          .to({ brightness: 1, blur: 0 }, 300)
          .easing(Easing.Quartic.InOut)
          .onStart((object) => {
            this._splash.color.setDark(0, 0, 0);
            this._splash.scale.set(2);
            this._splash.texture = PIXI.Texture.from(
              `./assets/splashes/${object.jobId}.png`
            );
            this._splash.visible = true;
            this.shakeRange = 64;
          })
          .onUpdate((object) => {
            this._colorFilter.brightness(object.brightness, false);
            this._blurFilter.blur = object.blur;
          })
          .onComplete((object) => {
            this._colorFilter.reset();
            this._blurFilter.enabled = false;
            this._blurFilter.blur = object.blur;
            this._background.texture = this._nextBackground.texture;
            this._nextBackground.visible = false;

            if (this._nextChangeTween) {
              this._changeTween = this._nextChangeTween.start();
              this._nextChangeTween = undefined;
            } else {
              this._changeTween = undefined;
            }
          });

        if (this._changeTween || this._selecteTween) {
          this._nextChangeTween = preTween.chain(afterTween);
        } else {
          this._changeTween = preTween.chain(afterTween).start();
        }
      }
    });

    let time = 0;
    this._shakeTween = new Tween({})
      .to({})
      .repeat(Infinity)
      .onStart(() => {
        this._simplexX = new SimplexNoise(Math.random);
        this._simplexY = new SimplexNoise(Math.random);
      })
      .onUpdate((object, elapsed) => {
        time += elapsed / 60;
        this._splash.position.set(
          1920 / 2 + this._simplexX.noise2D(0, time) * this.shakeRange,
          1080 / 2 + this._simplexY.noise2D(0, time) * this.shakeRange
        );
      });

    container.filters = [this._colorFilter, this._blurFilter];

    this.addChild(createBlurOverlay());

    this.addChild(PIXI.Sprite.from('./assets/backgrounds/cameraUI.png'));
  }

  get shakeRange(): number {
    return this._shakeRange;
  }

  set shakeRange(value: number) {
    this._shakeRange = value;

    if (this._shakeRange) {
      this._shakeTween.start();
    } else {
      this._shakeTween.stop();
      this._splash.position.set(1920 / 2, 1080 / 2);
    }
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
