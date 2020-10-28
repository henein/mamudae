type Option = {
  color?: number;
  alpha?: number;
  x: number;
  y: number;
  width: number;
  height: number;
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
};

export class DetailRoundedRect extends PIXI.Graphics {
  constructor(option: Option) {
    super();

    this.beginFill(option.color, option.alpha);
    if (option.topLeft) {
      this.moveTo(0, option.topLeft);
      this.arcTo(0, 0, option.topLeft, 0, option.topLeft);
    } else {
      this.moveTo(0, 0);
    }

    if (option.topRight) {
      this.lineTo(option.width - option.topRight, 0);
      this.arcTo(
        option.width,
        0,
        option.width,
        option.topRight,
        option.topRight
      );
    } else {
      this.lineTo(option.width, 0);
    }

    if (option.bottomRight) {
      this.lineTo(option.width, option.height - option.bottomRight);
      this.arcTo(
        option.width,
        option.height,
        option.width - option.bottomRight,
        option.height,
        option.bottomRight
      );
    } else {
      this.lineTo(option.width, option.height);
    }

    if (option.bottomLeft) {
      this.lineTo(option.bottomLeft, option.height);
      this.arcTo(
        0,
        option.height,
        0,
        option.height - option.bottomLeft,
        option.bottomLeft
      );
    } else {
      this.lineTo(0, option.height);
    }

    if (option.topLeft) {
      this.lineTo(0, option.topLeft);
    } else {
      this.lineTo(0, 0);
    }

    this.endFill();

    this.position.set(option.x, option.y);
  }
}
