import { Button } from './button';

type Option = {
  title?: string;
  width?: number;
  height?: number;
  backgroundColor?: number;
};

export class TextButton extends Button {
  constructor(option: Option = {}) {
    super();

    const { title = '', width = 100, height = 100, backgroundColor } = option;

    const background = this.addChild(new PIXI.Graphics());
    background.beginFill(backgroundColor);
    background.drawRect(0, 0, width, height);
    background.endFill();

    const text = this.addChild(new PIXI.Text(title));
    text.anchor.set(0.5);
    text.position.set(width / 2, height / 2);
  }
}
