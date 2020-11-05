import { Easing, Tween } from '@tweenjs/tween.js';
import { JobId } from '../../common/enums';

export class Splash extends PIXI.Sprite {
  private _jobId: JobId = JobId.BEGINNER;

  sprite: PIXI.heaven.Sprite;

  constructor(jobId: JobId, x: number, y: number) {
    super();
    this.sprite = this.addChild(new PIXI.Sprite()).convertToHeaven();
    this.sprite.scale.set(2);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.jobId = jobId;
  }

  remove = (onRemove: () => void) => {
    new Tween({
      dark: 0,
    })
      .to({ dark: 1 }, 1000)
      .easing(Easing.Quartic.InOut)
      .onUpdate((object) => {
        this.sprite.color.setDark(object.dark, object.dark, object.dark);
      })
      .chain(
        new Tween({ scale: 2 })
          .to({ scale: 0 }, 300)
          .easing(Easing.Quartic.In)
          .onUpdate((object) => {
            this.sprite.scale.set(object.scale);
          })
          .onComplete(() => {
            onRemove();
          })
      )
      .start();
  };

  get jobId() {
    return this._jobId;
  }

  set jobId(value: JobId) {
    if (!value || this._jobId == value) {
      return;
    }
    this._jobId = value;

    this.sprite.texture = PIXI.Texture.from(
      `../assets/splashes/${this.jobId}.png`
    );
  }
}
