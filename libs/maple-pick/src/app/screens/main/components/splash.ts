import { Spine } from '../../../../spine';
import { JobId, getJob } from '@henein/mamudae-lib';
import { Easing, Tween } from '@tweenjs/tween.js';
import { Assets, ColorMatrixFilter, Container, Sprite, Texture } from 'pixi.js';

export class Splash extends Container {
  private _jobId: JobId = JobId.BEGINNER;
  private _scale_: number;
  private _isOpponent: boolean;
  private _direction: 'left' | 'right';

  colorMatrixFilter: ColorMatrixFilter;
  sprite: Sprite;
  spine: Spine;
  offsetX: number;
  offsetY: number;
  c: Container;

  constructor(
    jobId: JobId,
    x: number,
    y: number,
    scale: number,
    isOpponent = false,
    direction: 'left' | 'right' = 'left',
  ) {
    super();
    this.colorMatrixFilter = new ColorMatrixFilter();
    this.filters = [this.colorMatrixFilter];

    this.sprite = this.addChild(new Sprite());
    this.sprite.scale.set(scale);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);

    this.c = this.addChild(new Container());
    this.spine = this.c.addChild(
      new Spine(Assets.get('/spine/4/skeleton.json').spineData),
    );
    this.spine.visible = false;
    this.spine.position.set(100, 100);

    this.jobId = jobId;
    this.offsetX = x;
    this.offsetY = y;
    this._scale_ = scale;
    this._isOpponent = isOpponent;
    this._direction = direction;
  }

  remove = (onRemove?: () => void) => {
    new Tween({
      dark: 0,
    })
      .to({ dark: 1 }, 1000)
      .easing(Easing.Quartic.InOut)
      .onUpdate((object) => {
        const value = object.dark;
        this.colorMatrixFilter.matrix = [
          1,
          0,
          0,
          0,
          value,
          0,
          1,
          0,
          0,
          value,
          0,
          0,
          1,
          0,
          value,
          0,
          0,
          0,
          1,
          0,
        ];
      })
      .chain(
        new Tween({ scale: this._scale_ })
          .to({ scale: 0 }, 300)
          .easing(Easing.Quartic.In)
          .onUpdate((object) => {
            this.sprite.scale.set(object.scale);
            this.c.scale.set(1.5 * object.scale);
            if (this._isOpponent) {
              const job = getJob(this.jobId);
              this.sprite.scale.x *=
                (this._direction === 'left' && job.reverse) ||
                (this._direction === 'right' && !job.reverse)
                  ? -1
                  : 1;
            }
          })
          .onComplete(() => {
            if (onRemove) {
              onRemove();
            }
          }),
      )
      .start();
  };

  get jobId() {
    return this._jobId;
  }

  set jobId(value: JobId) {
    if (this._jobId === value) {
      return;
    }
    this._jobId = value;

    if (this._jobId === 0) {
      this.sprite.texture = Texture.EMPTY;
    } else {
      const job = getJob(this._jobId);

      if (!job.spine) {
        this.sprite.texture = Texture.from(`main/splashes/${this.jobId}.png`);
        this.spine.visible = false;
        return;
      }

      this.sprite.texture = Texture.EMPTY;

      this.spine?.destroy();
      this.spine = this.c.addChild(
        new Spine(Assets.get(`/spine/${job.spine}/skeleton.json`).spineData),
      );
      this.spine.state.setAnimation(0, 'animation', true);
      this.spine.autoUpdate = true;
      this.spine.visible = true;
      this.c.scale.set(1.5);
      this.c.pivot.set(700, 250);
      this.c.position.set(1920 / 2, 1080 / 2);

      if (job.spine === 15) {
        this.c.position.set(1320, 400);
      }

      // if (this._isOpponent) {
      //   const job = getJob(this.jobId);

      //   this.sprite.scale.set(this._scale_);
      //   this.sprite.scale.x *=
      //     (this._direction === 'left' && job.reverse) ||
      //     (this._direction === 'right' && !job.reverse)
      //       ? -1
      //       : 1;
      //   this.sprite.anchor.set(
      //     0.5 + job.offsetX / 1024,
      //     0.5 + job.offsetY / 604
      //   );
      //   this.sprite.position.set(this.offsetX, this.offsetY);
      // }
    }
  }
}
