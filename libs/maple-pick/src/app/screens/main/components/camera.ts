/*
  스프라이트 화질 개선?
*/
import { store } from '../../../store/state-store';
import { Splash } from './splash';
import { getJob, JobId } from '@henein/mamudae-lib';
import { MaskFilter } from '@pixi/picture';
import { Tween } from '@tweenjs/tween.js';
import { Easing } from '@tweenjs/tween.js';
import { autorun, reaction } from 'mobx';
import { ZoomBlurFilter } from 'pixi-filters';
import {
  BlurFilter,
  ColorMatrixFilter,
  Container,
  Sprite,
  TextStyle,
  Texture,
  Text,
  BLEND_MODES,
  Graphics,
} from 'pixi.js';
import { createNoise2D } from 'simplex-noise';

export class Camera extends Container {
  private _backgroundContainer: Container;
  private _background: Sprite;
  private _nextBackground: Sprite;
  private _splashContainer: Container;
  private _mainSplash?: Splash;
  private _leftSplash: Splash;
  private _rightSplash: Splash;
  private _cloudAlpha = 0;
  private _cloudVisible = false;
  private _colorFilter: ColorMatrixFilter;
  private _blurFilter: BlurFilter;
  // private _jobNameText: Text;
  private _simplexX = createNoise2D();
  private _simplexY = createNoise2D();
  private _shakeTween: Tween<any>;
  private _shakeRange = 16;
  private _eventQueue: CameraEventQueue;
  private _lastJobId?: 0 | JobId;
  private _opponentOffset = 360;
  private _logo: Sprite;

  constructor() {
    super();

    const container = this.addChild(new Container());

    this._backgroundContainer = container.addChild(new Container());

    this._background = this._backgroundContainer.addChild(
      Sprite.from('main/backgrounds/0.png'),
    );
    this._background.anchor.set(0.5);
    this._background.scale.set(2);
    this._background.position.set(1920 / 2, 1080 / 2);

    this._nextBackground = this._backgroundContainer.addChild(new Sprite());
    this._nextBackground.anchor.set(0.5);
    this._nextBackground.scale.set(2);
    this._nextBackground.position.set(1920 / 2, 1080 / 2);

    this._splashContainer = container.addChild(new Container());

    this._logo = this._splashContainer.addChild(
      Sprite.from('main/ui/logo.png'),
    );
    this._logo.visible = false;

    autorun(() => {
      if (store.currentSequence?.action === 'start') {
        this._logo.visible = true;
      } else {
        this._logo.visible = false;
      }
    });

    this._leftSplash = this._splashContainer.addChild(
      new Splash(
        0,
        1920 / 2 - this._opponentOffset,
        1080 / 2,
        1.5,
        true,
        'left',
      ),
    );

    this._rightSplash = this._splashContainer.addChild(
      new Splash(
        0,
        1920 / 2 + this._opponentOffset,
        1080 / 2,
        1.5,
        true,
        'right',
      ),
    );

    this._leftSplash.alpha = 0.5;
    this._rightSplash.alpha = 0.5;

    this._colorFilter = new ColorMatrixFilter();
    this._blurFilter = new BlurFilter();
    this._blurFilter.enabled = false;
    this._blurFilter.blur = 0;
    this._blurFilter.quality = 10;

    this._eventQueue = new CameraEventQueue(this.onEvent);

    reaction(
      () => store.reset,
      () => {
        this._background.texture = Texture.from('main/backgrounds/0.png');
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
            'left',
          ),
        );
        this._rightSplash.destroy();
        this._rightSplash = this._splashContainer.addChild(
          new Splash(
            0,
            1920 / 2 + this._opponentOffset,
            1080 / 2,
            1.5,
            true,
            'right',
          ),
        );
        this._leftSplash.alpha = 0.5;
        this._rightSplash.alpha = 0.5;
        // this._jobNameText.text = '';
        this._eventQueue = new CameraEventQueue(this.onEvent);
        this._lastJobId = undefined;
        // this.cloudVisible = false;
      },
    );

    autorun(() => {
      if (this._lastJobId === store.roomState.selected) {
        return;
      }

      if (!store.roomState.selected) {
        if (
          this._lastJobId !== undefined &&
          store.roomState.selected === undefined
        ) {
          this._eventQueue.enqueue({
            action: 'select',
          });
        }
      } else {
        this._eventQueue.enqueue({
          action: 'change',
          jobId: store.roomState.selected,
        });
      }

      this._lastJobId = store.roomState.selected;
    });

    // NOTE: 상대픽 관련
    // autorun(() => {
    //   if (
    //     store.sequenceStore.currentSequence?.payload?.action ===
    //       'opponentPick' ||
    //     store.sequenceStore.currentSequence?.action === 'end'
    //   ) {
    //     if (store.sequenceStore.team === 'left') {
    //       if (store.jobStore.leftOpponentPick) {
    //         this._leftSplash.jobId = store.jobStore.leftOpponentPick;
    //         this._leftSplash.alpha = 1;
    //       } else {
    //         this._leftSplash.jobId = store.jobStore.leftSelect ?? 0;
    //       }
    //     } else if (store.sequenceStore.team === 'right') {
    //       if (store.jobStore.rightOpponentPick) {
    //         this._rightSplash.jobId = store.jobStore.rightOpponentPick;
    //         this._rightSplash.alpha = 1;
    //       } else {
    //         this._rightSplash.jobId = store.jobStore.rightSelect ?? 0;
    //       }
    //     }
    //   } else if (!store.sequenceStore.currentSequence?.event) {
    //     if (
    //       store.jobStore.leftOpponentPick &&
    //       store.jobStore.rightOpponentPick
    //     ) {
    //       if (store.sequenceStore.team === 'left') {
    //         this._rightSplash.jobId = store.jobStore.rightOpponentPick;
    //         this._rightSplash.alpha = 1;
    //       } else if (store.sequenceStore.team === 'right') {
    //         this._leftSplash.jobId = store.jobStore.leftOpponentPick;
    //         this._leftSplash.alpha = 1;
    //       }

    //       const target =
    //         store.sequenceStore.team === 'left'
    //           ? this._rightSplash
    //           : this._leftSplash;

    //       if (
    //         store.sequenceStore.team === 'left'
    //           ? this._leftSplash.alpha === 1
    //           : this._rightSplash.alpha === 1
    //       ) {
    //         target.alpha = 0;
    //         target.position.x = store.sequenceStore.team === 'left' ? 600 : -600;

    //         new Tween(target)
    //           .to({
    //             alpha: 1,
    //             position: {
    //               x: 0,
    //             },
    //           })
    //           .easing(Easing.Quartic.InOut)
    //           .chain(
    //             new Tween({}).to({}, 1000).onComplete(() => {
    //               this._leftSplash.remove();
    //               this._rightSplash.remove();
    //             })
    //           )
    //           .start();
    //       } else {
    //         target.alpha = 0;
    //       }
    //     }
    //   }
    // });

    // NOTE: 상대픽 관련련
    // autorun(() => {
    //   if (
    //     store.sequenceStore.currentSequence?.payload?.action ===
    //       'opponentPick' ||
    //     store.sequenceStore.currentSequence?.event === IOEvent.END
    //   ) {
    //     this.cloudVisible = true;
    //   } else {
    //     this.cloudVisible = false;
    //   }
    // });

    let time = 0;
    this._shakeTween = new Tween({})
      .to({})
      .repeat(Infinity)
      .onStart(() => {
        this._simplexX = createNoise2D();
        this._simplexY = createNoise2D();
      })
      .onUpdate((object, elapsed) => {
        time += elapsed / 180;
        this._backgroundContainer.position.set(
          this._simplexX(0, time) * (this.shakeRange / 4),
          this._simplexY(0, time) * (this.shakeRange / 4),
        );
        this._splashContainer.position.set(
          this._simplexX(0, time) * this.shakeRange,
          this._simplexY(0, time) * this.shakeRange - 20,
        );
      })
      .start();

    const zoomFilter = new ZoomBlurFilter();
    zoomFilter.center = [1920 / 2, 1080 / 2];
    zoomFilter.innerRadius = 600;

    container.filters = [this._colorFilter, this._blurFilter, zoomFilter];

    // this._jobNameText = this.addChild(
    //   new Text(
    //     '',
    //     new TextStyle({
    //       fontFamily: 'Maplestory Bold',
    //       fontSize: 48,
    //       fill: '#ffffff',
    //       dropShadow: true,
    //       dropShadowColor: 0x404040,
    //       dropShadowDistance: 0,
    //       dropShadowBlur: 4,
    //     }),
    //   ),
    // );
    // this._jobNameText.anchor.set(0.5, 0.5);
    // this._jobNameText.position.set(1920 / 2, 786);

    this.addChild(new BlurOverlay());

    // this.addChild(Sprite.from('main/ui/cameraUI.png'));
  }

  // get cloudAlpha() {
  //   return this._cloudAlpha;
  // }

  // set cloudAlpha(value: number) {
  //   this._cloudAlpha = value;
  //   this._cloudA.alpha = value;
  //   this._cloudB.alpha = value;
  //   this._cloudB.position.x =
  //     1920 / 2 +
  //     (store.sequenceStore.team === 'left'
  //       ? 400 * (1 - value)
  //       : -400 * (1 - value));
  // }

  // set cloudVisible(value: boolean) {
  //   if (this._cloudVisible === value) {
  //     return;
  //   }

  //   this._cloudVisible = value;

  //   if (value) {
  //     this._cloudDisappearTween.stop();
  //     this._cloudAppearTween.start();
  //   } else {
  //     this._cloudAppearTween.stop();
  //     this._cloudDisappearTween.start();
  //   }
  // }

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
          // new Tween(this._jobNameText)
          //   .to({ alpha: 0 }, 1000)
          //   .easing(Easing.Quartic.InOut)
          //   .start();
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
          blur: 64,
          nextBackgroundAlpha: 1,
        },
        300,
      )
      .easing(Easing.Quartic.InOut)
      .onStart((object) => {
        this._colorFilter.reset();
        this._blurFilter.enabled = true;
        this._blurFilter.blur = object.blur;
        this._nextBackground.visible = true;
        this._nextBackground.alpha = object.nextBackgroundAlpha;
        this._nextBackground.texture = Texture.from(
          `main/backgrounds/${getJob(object.jobId).background ?? 0}.png`,
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
          blur: 64,
          jobId: jobId,
        })
          .to({ brightness: 1, blur: 0 }, 300)
          .easing(Easing.Quartic.InOut)
          .onStart((object) => {
            if (this._mainSplash) {
              this._mainSplash.jobId = object.jobId;
            } else {
              this._mainSplash = this._splashContainer.addChild(
                new Splash(object.jobId, 1920 / 2, 1080 / 2, 2),
              );
            }
            // this._jobNameText.text = getJob(object.jobId).jobName;
            // this._jobNameText.alpha = 1;
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
          }),
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
        300,
      )
      .easing(Easing.Quartic.InOut)
      .onStart((object) => {
        this._colorFilter.reset();
        this._blurFilter.enabled = true;
        this._blurFilter.blur = object.blur;
        this._nextBackground.visible = true;
        this._nextBackground.alpha = object.nextBackgroundAlpha;
        this._nextBackground.texture = Texture.from('main/backgrounds/0.png');
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
          }),
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

class BlurOverlay extends Container {
  private _state: 'default' | 'ban';
  private _tween?: Tween<any>;
  private _multiply: Sprite;

  constructor() {
    super();

    this._state = 'default';

    const blurFilter = new BlurFilter();
    blurFilter.blur = 32;
    blurFilter.quality = 6;
    blurFilter.repeatEdgePixels = true;

    const graphics = Sprite.from('main/backgrounds/mask.png');
    graphics.filters = [new MaskFilter(blurFilter)];
    this.addChild(graphics);

    this._multiply = Sprite.from('main/backgrounds/multiply.png');
    this._multiply.blendMode = BLEND_MODES.MULTIPLY;
    this.addChild(this._multiply);

    autorun(() => {
      if (store.currentSequence?.action === 'ban') {
        this.state = 'ban';
      } else {
        this.state = 'default';
      }
    });
  }

  set state(value: 'default' | 'ban') {
    if (this._state === value) {
      return;
    }

    this._state = value;

    switch (this._state) {
      case 'default':
        this._multiply.texture = Texture.from('main/backgrounds/multiply.png');
        break;
      case 'ban':
        this._multiply.texture = Texture.from(
          'main/backgrounds/multiplyBan.png',
        );
        break;
    }
  }
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
          this._cameraEvents[this._cameraEvents.length - 1].action ===
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
