import {
  randomBool,
  randomFloat,
  randomInt,
} from '../../../engine/utils/random';
import { Sprite, Texture } from 'pixi.js';

export enum DIRECTION {
  NE,
  NW,
  SE,
  SW,
}

export class Logo extends Sprite {
  public direction!: DIRECTION;
  public speed!: number;

  get left() {
    return -this.width * 0.5;
  }

  get right() {
    return this.width * 0.5;
  }

  get top() {
    return -this.height * 0.5;
  }

  get bottom() {
    return this.height * 0.5;
  }

  constructor() {
    const tex = randomBool() ? 'logo.svg' : 'logo-white.svg';
    super(Texture.from(tex));
    this.anchor.set(0.5);
    this.scale.set(0.25);
    this.direction = randomInt(0, 3);
    this.speed = randomFloat(1, 6);
  }
}
