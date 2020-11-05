/*
  스프라이트 화질 개선?
*/

import { autorun, reaction } from 'mobx';
import { store } from '../store';
import { Tween } from '@tweenjs/tween.js';
import SimplexNoise from 'simplex-noise';
import { Easing } from '@tweenjs/tween.js';
import { getJob } from '../../common/jobs';
import { Splash } from './splash';
import { JobId } from '../../common/enums';
import { IOEvent } from '../../common/events';

export class Camera extends PIXI.Container {
  private _backgroundContainer: PIXI.Container;
  private _background: PIXI.Sprite;
  private _nextBackground: PIXI.Sprite;
  private _splashContainer: PIXI.Container;
  private _mainSplash?: Splash;
  private _leftSplash: Splash;
  private _rightSplash: Splash;
  private _cloudContainer: PIXI.Container;
  private _cloudA: PIXI.Sprite;
  private _cloudB: PIXI.Sprite;
  private _cloudAppearTween: Tween<any>;
  private _cloudDisappearTween: Tween<any>;
  private _cloudAlpha = 0;
  private _cloudVisible = false;
  private _colorFilter: PIXI.filters.ColorMatrixFilter;
  private _blurFilter: PIXI.filters.BlurFilter;
  private _jobNameText: PIXI.Text;
  private _simplexX = new SimplexNoise(Math.random);
  private _simplexY = new SimplexNoise(Math.random);
  private _shakeTween: Tween<any>;
  private _shakeRange = 32;
  private _eventQueue: CameraEventQueue;
  private _lastJobId?: 0 | JobId;
  private _opponentOffset = 360;

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

    this._leftSplash = this._splashContainer.addChild(
      new Splash(
        0,
        1920 / 2 - this._opponentOffset,
        1080 / 2,
        1.5,
        true,
        'left'
      )
    );

    this._rightSplash = this._splashContainer.addChild(
      new Splash(
        0,
        1920 / 2 + this._opponentOffset,
        1080 / 2,
        1.5,
        true,
        'right'
      )
    );

    this._leftSplash.alpha = 0.5;
    this._rightSplash.alpha = 0.5;

    this._cloudContainer = this.addChild(new PIXI.Container());

    this._cloudA = this._cloudContainer.addChild(
      PIXI.Sprite.from('../assets/ui/cloudA.png')
    );
    this._cloudA.anchor.set(0.5);
    this._cloudA.scale.set(2);
    this._cloudA.position.set(1920 / 2, 1080 / 2);

    this._cloudB = this._cloudContainer.addChild(
      PIXI.Sprite.from('../assets/ui/cloudB.png')
    );
    this._cloudB.anchor.set(0.5);
    autorun(() => {
      this._cloudB.scale.set(2);
      this._cloudB.scale.x *= store.sequenceStore.team == 'left' ? 1 : -1;
    });
    this._cloudB.position.set(1920 / 2, 1080 / 2);

    this._cloudAppearTween = new Tween({ alpha: 0 })
      .to({ alpha: 1 }, 2000)
      .easing(Easing.Quartic.InOut)
      .onUpdate((object) => {
        this.cloudAlpha = object.alpha;
      });

    this._cloudDisappearTween = new Tween({ alpha: 1 })
      .to({ alpha: 0 })
      .easing(Easing.Quartic.InOut)
      .onUpdate((object) => {
        this.cloudAlpha = object.alpha;
      });

    this.cloudAlpha = 0;

    this._colorFilter = new PIXI.filters.ColorMatrixFilter();
    this._blurFilter = new PIXI.filters.BlurFilter();
    this._blurFilter.enabled = false;
    this._blurFilter.blur = 0;
    this._blurFilter.quality = 10;

    this._eventQueue = new CameraEventQueue(this.onEvent);

    reaction(
      () => store.sequenceStore.reset,
      () => {
        this._background.texture = PIXI.Texture.from(
          './assets/backgrounds/0.png'
        );
        this._nextBackground.visible = false;
        this._mainSplash?.destroy();
        this._mainSplash = undefined;
        this._leftSplash.destroy();
        this._leftSplash = this._splashContainer.addChild(
          new Splash(
            0,
            1920 / 2 - this._opponentOffset,
            1080 / 2,
            1.5,
            true,
            'left'
          )
        );
        this._rightSplash.destroy();
        this._rightSplash = this._splashContainer.addChild(
          new Splash(
            0,
            1920 / 2 + this._opponentOffset,
            1080 / 2,
            1.5,
            true,
            'right'
          )
        );
        this._leftSplash.alpha = 0.5;
        this._rightSplash.alpha = 0.5;
        this._jobNameText.text = '';
        this._eventQueue = new CameraEventQueue(this.onEvent);
        this._lastJobId = undefined;
        this.cloudVisible = false;
      }
    );

    autorun(() => {
      switch (store.sequenceStore.currentSequence?.payload?.action) {
        case 'ban':
        case 'pick':
          if (this._lastJobId == store.jobStore.selectJobId) {
            return;
          }

          if (!store.jobStore.selectJobId) {
            if (store.jobStore.selectJobId == undefined) {
              return;
            }
            this._eventQueue.enqueue({
              action: 'select',
            });
          } else {
            this._eventQueue.enqueue({
              action: 'change',
              jobId: store.jobStore.selectJobId,
            });
          }

          this._lastJobId = store.jobStore.selectJobId;
          break;
        case 'opponentPick':
          if (store.sequenceStore.nextSequence?.event != IOEvent.END) {
            this._eventQueue.enqueue({ action: 'defaultBG' });
          }
          break;
      }
    });

    autorun(() => {
      if (
        store.sequenceStore.currentSequence?.payload?.action ==
          'opponentPick' ||
        store.sequenceStore.currentSequence?.event == IOEvent.END
      ) {
        if (store.sequenceStore.team == 'left') {
          if (store.jobStore.leftOpponentPick) {
            this._leftSplash.jobId = store.jobStore.leftOpponentPick;
            this._leftSplash.alpha = 1;
          } else {
            this._leftSplash.jobId = store.jobStore.leftSelect ?? 0;
          }
        } else if (store.sequenceStore.team == 'right') {
          if (store.jobStore.rightOpponentPick) {
            this._rightSplash.jobId = store.jobStore.rightOpponentPick;
            this._rightSplash.alpha = 1;
          } else {
            this._rightSplash.jobId = store.jobStore.rightSelect ?? 0;
          }
        }
      } else if (!store.sequenceStore.currentSequence?.event) {
        if (
          store.jobStore.leftOpponentPick &&
          store.jobStore.rightOpponentPick
        ) {
          if (store.sequenceStore.team == 'left') {
            this._rightSplash.jobId = store.jobStore.rightOpponentPick;
            this._rightSplash.alpha = 1;
          } else if (store.sequenceStore.team == 'right') {
            this._leftSplash.jobId = store.jobStore.leftOpponentPick;
            this._leftSplash.alpha = 1;
          }

          const target =
            store.sequenceStore.team == 'left'
              ? this._rightSplash
              : this._leftSplash;

          if (
            store.sequenceStore.team == 'left'
              ? this._leftSplash.alpha == 1
              : this._rightSplash.alpha == 1
          ) {
            target.alpha = 0;
            target.position.x = store.sequenceStore.team == 'left' ? 600 : -600;

            new Tween(target)
              .to({
                alpha: 1,
                position: {
                  x: 0,
                },
              })
              .easing(Easing.Quartic.InOut)
              .chain(
                new Tween({}).to({}, 1000).onComplete(() => {
                  this._leftSplash.remove();
                  this._rightSplash.remove();
                })
              )
              .start();
          } else {
            target.alpha = 0;
          }
        }
      }
    });

    autorun(() => {
      if (
        store.sequenceStore.currentSequence?.payload?.action ==
          'opponentPick' ||
        store.sequenceStore.currentSequence?.event == IOEvent.END
      ) {
        this.cloudVisible = true;
      } else {
        this.cloudVisible = false;
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
        this._cloudContainer.position.set(
          this._simplexX.noise2D(0, time) * (this.shakeRange / -4),
          this._simplexY.noise2D(0, time) * (this.shakeRange / -4)
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

  get cloudAlpha() {
    return this._cloudAlpha;
  }

  set cloudAlpha(value: number) {
    this._cloudAlpha = value;
    this._cloudA.alpha = value;
    this._cloudB.alpha = value;
    this._cloudB.position.x =
      1920 / 2 +
      (store.sequenceStore.team == 'left'
        ? 400 * (1 - value)
        : -400 * (1 - value));
  }

  set cloudVisible(value: boolean) {
    if (this._cloudVisible == value) {
      return;
    }

    this._cloudVisible = value;

    if (value) {
      this._cloudDisappearTween.stop();
      this._cloudAppearTween.start();
    } else {
      this._cloudAppearTween.stop();
      this._cloudDisappearTween.start();
    }
  }

  onEvent = (event: CameraEvent, done: () => void) => {
    switch (event.action) {
      case 'change':
        this.onChange(event.jobId ?? JobId.BEGINNER, done);
        break;
      case 'select':
        if (this._mainSplash) {
          this._mainSplash.remove(() => {
            this._mainSplash = undefined;
            done();
          });
          new Tween(this._jobNameText)
            .to({ alpha: 0 }, 1000)
            .easing(Easing.Quartic.InOut)
            .start();
        }
        break;
      case 'defaultBG':
        this.onDefaultBG(done);
        break;
    }
  };

  onChange = (jobId: JobId, done: () => void) => {
    new Tween({
      brightness: 1,
      blur: 0,
      nextBackgroundAlpha: 0,
      jobId: jobId,
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
          `../assets/backgrounds/${getJob(object.jobId).background ?? 0}.png`
        );
      })
      .onUpdate((object) => {
        this._colorFilter.brightness(object.brightness, false);
        this._blurFilter.blur = object.blur;
        this._nextBackground.alpha = object.nextBackgroundAlpha;
      })
      .chain(
        new Tween({
          brightness: 1.3,
          blur: 32,
          jobId: jobId,
        })
          .to({ brightness: 1, blur: 0 }, 300)
          .easing(Easing.Quartic.InOut)
          .onStart((object) => {
            if (this._mainSplash) {
              this._mainSplash.jobId = object.jobId;
            } else {
              this._mainSplash = this._splashContainer.addChild(
                new Splash(object.jobId, 1920 / 2, 1080 / 2, 2)
              );
            }
            this._jobNameText.text = getJob(object.jobId).jobName;
            this._jobNameText.alpha = 1;
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

            done();
          })
      )
      .start();
  };

  onDefaultBG = (done: () => void) => {
    new Tween({
      brightness: 1,
      blur: 0,
      nextBackgroundAlpha: 0,
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
          './assets/backgrounds/0.png'
        );
      })
      .onUpdate((object) => {
        this._colorFilter.brightness(object.brightness, false);
        this._blurFilter.blur = object.blur;
        this._nextBackground.alpha = object.nextBackgroundAlpha;
      })
      .chain(
        new Tween({
          brightness: 1.3,
          blur: 32,
        })
          .to({ brightness: 1, blur: 0 }, 300)
          .easing(Easing.Quartic.InOut)
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

            done();
          })
      )
      .start();
  };

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

type CameraEvent = {
  action: 'change' | 'select' | 'defaultBG';
  jobId?: JobId;
};

class CameraEventQueue {
  private _cameraEvents: CameraEvent[];
  private _onEvent: (event: CameraEvent, done: () => void) => void;
  private _isProgress = false;

  constructor(onEvent: (event: CameraEvent, done: () => void) => void) {
    this._cameraEvents = [];
    this._onEvent = onEvent;
  }

  enqueue = (item: CameraEvent) => {
    if (this._isProgress) {
      if (!this._cameraEvents.length) {
        this._cameraEvents.push(item);
      } else {
        if (
          this._cameraEvents[this._cameraEvents.length - 1].action ==
          item.action
        ) {
          this._cameraEvents[this._cameraEvents.length - 1] = item;
        } else {
          this._cameraEvents.push(item);
        }
      }
    } else {
      this._isProgress = true;
      this._onEvent(item, this.next);
    }
  };

  next = () => {
    const nextEvent = this.dequeue();
    if (nextEvent) {
      this._onEvent(nextEvent, this.next);
    } else {
      this._isProgress = false;
    }
  };

  dequeue = () => {
    return this._cameraEvents.shift();
  };
}
