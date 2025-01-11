import { Graphics, Text, TextStyle } from 'pixi.js';
import { Button } from './button';

type Option = {
  title?: string;
  width?: number;
  height?: number;
  backgroundColor?: number;
  textColor?: number;
};

export class TextButton extends Button {
  constructor(option: Option = {}) {
    super();

    const {
      title = '',
      width = 100,
      height = 100,
      backgroundColor,
      textColor,
    } = option;

    const background = this.addChild(new Graphics());
    background.beginFill(backgroundColor ?? 0x000000);
    background.drawRoundedRect(0, 0, width, height, 64);
    background.endFill();

    const text = this.addChild(
      new Text(
        title,
        new TextStyle({
          fontFamily: 'Maplestory Light',
          fontSize: 28,
          fill: textColor,
        })
      )
    );
    text.anchor.set(0.5);
    text.position.set(width / 2, height / 2);
  }
}
