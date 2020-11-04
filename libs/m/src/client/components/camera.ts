/*
  스프라이트 화질 개선?
*/

import { autorun, reaction } from 'mobx';
import { store } from '../store';
import { Tween } from '@tweenjs/tween.js';
import SimplexNoise from 'simplex-noise';
import { Easing } from '@tweenjs/tween.js';
import { getJob } from '../../common/jobs';

export class Camera extends PIXI.Container {
  private _backgroundContainer: PIXI.Container;
  private _background: PIXI.Sprite;
  private _nextBackground: PIXI.Sprite;
  private _splashContainer: PIXI.Container;
  private _mainSplash: PIXI.heaven.Sprite;
  private _leftSplash: PIXI.heaven.Sprite;
  private _rightSplash: PIXI.heaven.Sprite;
  private _colorFilter: PIXI.filters.ColorMatrixFilter;
  private _blurFilter: PIXI.filters.BlurFilter;
  private _jobNameText: PIXI.Text;
  private _simplexX = new SimplexNoise(Math.random);
  private _simplexY = new SimplexNoise(Math.random);
  private _changeTween?: Tween<any>;
  private _nextChangeTween?: Tween<any>;
  private _selecteTween?: Tween<any>;
  private _shakeTween: Tween<any>;
  private _shakeRange = 32;

  constructor() {
    super();

    const container = this.addChild(new PIXI.Container());

    this._backgroundContainer = container.addChild(new PIXI.Container());

    this._background = this._backgroundContainer.addChild(
      PIXI.Sprite.from('./assets/backgrounds/0.png')
    );
    this._background.anchor.set(0.5);
    this._background.scale.set(2);
    this._background.position.set(1920 / 2, 1080 / 2);

    this._nextBackground = this._backgroundContainer.addChild(
      new PIXI.Sprite()
    );
    this._nextBackground.anchor.set(0.5);
    this._nextBackground.scale.set(2);
    this._nextBackground.position.set(1920 / 2, 1080 / 2);

    this._splashContainer = container.addChild(new PIXI.Container());

    this._mainSplash = this._splashContainer
      .addChild(new PIXI.Sprite())
      .convertToHeaven();
    this._mainSplash.anchor.set(0.5);
    this._mainSplash.scale.set(2);
    this._mainSplash.position.set(1920 / 2, 1080 / 2);

    this._leftSplash = this._splashContainer
      .addChild(new PIXI.Sprite())
      .convertToHeaven();
    this._leftSplash.anchor.set(0.5);
    this._leftSplash.scale.set(1.5);
    this._leftSplash.position.set(1920 / 2 - 200, 1080 / 2);

    this._rightSplash = this._splashContainer
      .addChild(new PIXI.Sprite())
      .convertToHeaven();
    this._rightSplash.anchor.set(0.5);
    this._rightSplash.scale.set(1.5);
    this._rightSplash.position.set(1920 / 2 + 200, 1080 / 2);

    this._colorFilter = new PIXI.filters.ColorMatrixFilter();
    this._blurFilter = new PIXI.filters.BlurFilter();
    this._blurFilter.enabled = false;
    this._blurFilter.blur = 0;
    this._blurFilter.quality = 10;

    reaction(
      () => store.sequenceStore.reset,
      () => {
        if (this._changeTween) {
          this._changeTween.stopChainedTweens();
        }
        this._changeTween = undefined;
        this._nextChangeTween = undefined;
        this._selecteTween = undefined;

        this._background.texture = PIXI.Texture.from(
          './assets/backgrounds/0.png'
        );
        this._nextBackground.visible = false;
        this._mainSplash.texture = PIXI.Texture.EMPTY;
        this._leftSplash.texture = PIXI.Texture.EMPTY;
        this._rightSplash.texture = PIXI.Texture.EMPTY;
        this._jobNameText.text = '';
      }
    );

    autorun(() => {
      if (!store.jobStore.selectJobId) {
        if (store.jobStore.selectJobId == undefined) {
          if (
            store.sequenceStore.currentSequence?.payload?.action ==
            'opponentPick'
          ) {
            if (store.sequenceStore.team == 'left') {
              this._leftSplash.texture = PIXI.Texture.from(
                `../assets/splashes/${store.jobStore.leftSelect}.png`
              );
            } else if (store.sequenceStore.team == 'right') {
              this._rightSplash.texture = PIXI.Texture.from(
                `../assets/splashes/${store.jobStore.rightSelect}.png`
              );
            }
          }
          return;
        }

        const preTween = new Tween({
          dark: 0,
          shakeRange: 64,
        })
          .to({ dark: 1, shakeRange: 0 }, 1000)
          .easing(Easing.Quartic.InOut)
          .onUpdate((object) => {
            this._mainSplash.color.setDark(
              object.dark,
              object.dark,
              object.dark
            );
            this.shakeRange = object.shakeRange;
          });

        const afterTween = new Tween({ scale: 2 })
          .to({ scale: 0 }, 300)
          .easing(Easing.Quartic.In)
          .onUpdate((object) => {
            this._mainSplash.scale.set(object.scale);
            this._jobNameText.alpha = object.scale / 2;
          })
          .chain(
            new Tween({ shakeRange: 0 })
              .to({ shakeRange: 32 })
              .easing(Easing.Quartic.InOut)
              .onUpdate((object) => {
                this.shakeRange = object.shakeRange;
              })
              .onComplete(() => {
                if (this._nextChangeTween) {
                  this._changeTween = this._nextChangeTween.start();
                  this._nextChangeTween = undefined;
                } else {
                  this._changeTween = undefined;
                }
              })
          );

        if (this._changeTween) {
          this._selecteTween = preTween.chain(afterTween);
        } else {
          this._changeTween = preTween.chain(afterTween).start();
        }
      } else {
        const preTween = new Tween({
          brightness: 1,
          blur: 0,
          nextBackgroundAlpha: 0,
          jobId: store.jobStore.selectJobId,
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
            this._nextBackground.visible = true;
            this._nextBackground.alpha = object.nextBackgroundAlpha;
            this._nextBackground.texture = PIXI.Texture.from(
              `../assets/backgrounds/${
                getJob(object.jobId).background ?? 0
              }.png`
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
          jobId: store.jobStore.selectJobId,
        })
          .to({ brightness: 1, blur: 0 }, 300)
          .easing(Easing.Quartic.InOut)
          .onStart((object) => {
            this._mainSplash.color.setDark(0, 0, 0);
            this._mainSplash.scale.set(2);
            this._mainSplash.texture = PIXI.Texture.from(
              `./assets/splashes/${object.jobId}.png`
            );
            this._mainSplash.visible = true;
            this._jobNameText.text = getJob(object.jobId).jobName;
            this._jobNameText.alpha = 1;
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
            } else if (this._selecteTween) {
              this._changeTween = this._selecteTween.start();
              this._selecteTween = undefined;
            } else {
              this._changeTween = undefined;
            }
          });

        if (this._changeTween) {
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
        this._backgroundContainer.position.set(
          this._simplexX.noise2D(0, time) * (this.shakeRange / 4),
          this._simplexY.noise2D(0, time) * (this.shakeRange / 4)
        );
        this._splashContainer.position.set(
          this._simplexX.noise2D(0, time) * this.shakeRange,
          this._simplexY.noise2D(0, time) * this.shakeRange
        );
      })
      .start();

    container.filters = [this._colorFilter, this._blurFilter];

    this._jobNameText = this.addChild(
      new PIXI.Text(
        '',
        new PIXI.TextStyle({
          fontFamily: 'MaplestoryOTFBold',
          fontSize: '48px',
          fill: '#ffffff',
          dropShadow: true,
          dropShadowColor: '#404040',
          dropShadowDistance: 0,
          dropShadowBlur: 4,
        })
      )
    );
    this._jobNameText.anchor.set(0.5);
    this._jobNameText.position.set(1920 / 2, 916);

    this.addChild(createBlurOverlay());

    this.addChild(PIXI.Sprite.from('./assets/ui/cameraUI.png'));
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
      this._splashContainer.position.set(0, 0);
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
