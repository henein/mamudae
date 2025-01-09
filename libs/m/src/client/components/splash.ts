import { Easing, Tween } from '@tweenjs/tween.js';
import { JobId } from '../../common/enums';
import { getJob } from '../../common/jobs';
import { Container, Sprite, Texture } from 'pixi.js';

export class Splash extends Container {
  private _jobId: JobId = JobId.BEGINNER;
  private _scale_: number;
  private _isOpponent: boolean;
  private _direction: 'left' | 'right';

  sprite: Sprite;
  offsetX: number;
  offsetY: number;

  constructor(
    jobId: JobId,
    x: number,
    y: number,
    scale: number,
    isOpponent = false,
    direction: 'left' | 'right' = 'left'
  ) {
    super();
    this.sprite = this.addChild(new Sprite());
    this.sprite.scale.set(scale);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
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
        // this.sprite.color.setDark(object.dark, object.dark, object.dark);
      })
      .chain(
        new Tween({ scale: this._scale_ })
          .to({ scale: 0 }, 300)
          .easing(Easing.Quartic.In)
          .onUpdate((object) => {
            this.sprite.scale.set(object.scale);
            if (this._isOpponent) {
              const job = getJob(this.jobId);
              this.sprite.scale.x *=
                (this._direction == 'left' && job.reverse) ||
                (this._direction == 'right' && !job.reverse)
                  ? -1
                  : 1;
            }
          })
          .onComplete(() => {
            if (onRemove) {
              onRemove();
            }
          })
      )
      .start();
  };

  get jobId() {
    return this._jobId;
  }

  set jobId(value: JobId) {
    if (this._jobId == value) {
      return;
    }
    this._jobId = value;

    if (this._jobId == 0) {
      this.sprite.texture = Texture.EMPTY;
    } else {
      this.sprite.texture = Texture.from(
        `../assets/splashes/${this.jobId}.png`
      );

      if (this._isOpponent) {
        const job = getJob(this.jobId);

        this.sprite.scale.set(this._scale_);
        this.sprite.scale.x *=
          (this._direction == 'left' && job.reverse) ||
          (this._direction == 'right' && !job.reverse)
            ? -1
            : 1;
        this.sprite.anchor.set(
          0.5 + job.offsetX / 1024,
          0.5 + job.offsetY / 604
        );
        this.sprite.position.set(this.offsetX, this.offsetY);
      }
    }
  }
}
