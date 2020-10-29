import { JobId } from '../../common/enums';
import { DetailRoundedRect } from './detailRoundedRect';

type Option = {
  direction?: 'left' | 'right';
};

export class PickPanel extends PIXI.Container {
  private _jobId?: JobId;
  background: PIXI.Sprite;
  sprite: PIXI.Sprite;

  constructor(option: Option = {}) {
    super();

    const { direction = 'left' } = option;

    this.background = this.addChild(
      PIXI.Sprite.from(
        `../assets/ui/${direction == 'left' ? 'leftPickBG' : 'rightPickBG'}.png`
      )
    );

    const graphics = this.addChild(
      new DetailRoundedRect({
        x: 0,
        y: 0,
        width: 396,
        height: 120,
        topRight: direction == 'left' ? 64 : 0,
        topLeft: direction == 'right' ? 64 : 0,
      })
    );
    this.mask = graphics;

    this.sprite = this.addChild(new PIXI.Sprite());
    this.sprite.anchor.set(0.5),
      this.sprite.position.set(
        396 / 2 + (direction == 'left' ? -20 : 20),
        120 / 2
      );
  }

  reset() {
    this._jobId = undefined;
    this.sprite.texture = PIXI.Texture.EMPTY;
  }

  set jobId(value: JobId) {
    this._jobId = value;
    this.sprite.texture = PIXI.Texture.from(
      `../assets/splashes/${this._jobId}.png`
    );
  }
}
