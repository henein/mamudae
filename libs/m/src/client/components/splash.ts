import { Easing, Tween } from '@tweenjs/tween.js';
import { JobId } from '../../common/enums';
import { getJob } from '../../common/jobs';

export class Splash extends PIXI.Container {
  private _jobId: JobId = JobId.BEGINNER;
  private _scale: number;
  private _isOpponent: boolean;
  private _direction: 'left' | 'right';

  sprite: PIXI.heaven.Sprite;
  x: number;
  y: number;

  constructor(
    jobId: JobId,
    x: number,
    y: number,
    scale: number,
    isOpponent = false,
    direction: 'left' | 'right' = 'left'
  ) {
    super();
    this.sprite = this.addChild(new PIXI.Sprite()).convertToHeaven();
    this.sprite.scale.set(scale);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.jobId = jobId;
    this.x = x;
    this.y = y;
    this._scale = scale;
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
        this.sprite.color.setDark(object.dark, object.dark, object.dark);
      })
      .chain(
        new Tween({ scale: this._scale })
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
      this.sprite.texture = PIXI.Texture.EMPTY;
    } else {
      this.sprite.texture = PIXI.Texture.from(
        `../assets/splashes/${this.jobId}.png`
      );

      if (this._isOpponent) {
        const job = getJob(this.jobId);

        this.sprite.scale.set(this._scale);
        this.sprite.scale.x *=
          (this._direction == 'left' && job.reverse) ||
          (this._direction == 'right' && !job.reverse)
            ? -1
            : 1;
        this.sprite.anchor.set(
          0.5 + job.offsetX / 1024,
          0.5 + job.offsetY / 604
        );
        this.sprite.position.set(this.x, this.y);
      }
    }
  }
}
