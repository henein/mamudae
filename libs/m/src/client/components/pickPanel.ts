import { JobId } from '../../common/enums';

type Option = {
  direction?: 'left' | 'right';
};

export class PickPanel extends PIXI.Container {
  private _jobId?: JobId;
  background: PIXI.Graphics;
  sprite: PIXI.Sprite;

  constructor(option: Option = {}) {
    super();

    const { direction = 'left' } = option;

    this.background = this.addChild(new PIXI.Graphics());
    this.background.beginFill(0x000000, 0.5);
    this.background.drawRect(0, 0, 364, 120);
    this.background.endFill();

    const graphics = this.addChild(new PIXI.Graphics());
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, 364, 120);
    graphics.endFill();
    this.mask = graphics;

    this.sprite = this.addChild(PIXI.Sprite.from('../assets/splashes/1.png'));
    this.sprite.anchor.set(0.5),
      this.sprite.position.set(
        this.background.width / 2 + (direction == 'left' ? -20 : 20),
        this.background.height / 2
      );
  }

  reset() {
    this._jobId = undefined;
    this.sprite.texture = PIXI.Texture.from('../assets/splashes/1.png');
  }

  set jobId(value: JobId) {
    this._jobId = value;
    this.sprite.texture = PIXI.Texture.from(
      `../assets/splashes/${this._jobId}.png`
    );
  }
}
