import { Sprite, Texture } from 'pixi.js';
import { JobId } from '../../common/enums';

type Option = {
  jobId?: JobId;
  size?: number;
};

export class Portrait extends Sprite {
  private _jobId?: JobId;
  private _size: number;

  constructor(option: Option = {}) {
    super();

    const { jobId = 0, size = 128 } = option;

    this._jobId = jobId;
    this._size = size;
    this.texture = Texture.from(`../assets/portraits/${this._jobId}.png`);

    this.scale.set(this._size / 128);
  }

  set jobId(value: JobId) {
    this._jobId = value;
    this.texture = Texture.from(`../assets/portraits/${this._jobId}.png`);
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
    this.scale.set(this._size / 128);
  }
}
