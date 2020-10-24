import { JobId } from '../../common/enums';

type Option = {
  jobId?: JobId;
  size?: number;
};

export class Portrait extends PIXI.Container {
  private _jobId?: JobId;
  private _size: number;
  private _sprite: PIXI.Sprite;

  constructor(option: Option = {}) {
    super();

    const { jobId = 0, size = 128 } = option;

    this._jobId = jobId;
    this._size = size;
    this._sprite = this.addChild(
      PIXI.Sprite.from(`../assets/portraits/${this._jobId}.png`)
    );

    this._sprite.scale.set(this._size / 128);
  }

  set jobId(value: JobId) {
    this._jobId = value;
    this._sprite.texture = PIXI.Texture.from(
      `../assets/portraits/${this._jobId}.png`
    );
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
    this._sprite.scale.set(this._size / 128);
  }
}
