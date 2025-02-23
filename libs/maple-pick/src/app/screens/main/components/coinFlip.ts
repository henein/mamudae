import { Container, Graphics, Text, Ticker } from 'pixi.js';

export class CoinFlip extends Container {
  front: Container;
  back: Container;

  constructor(leftName: string, rightName: string) {
    super();

    this.front = this.addChild(new Container());
    const frontBg = this.front.addChild(new Graphics());
    frontBg.circle(0, 0, 200).fill(0x0075ca);
    frontBg.circle(0, 0, 190).stroke({ color: 0xffffff, width: 4 });
    const frontText = this.front.addChild(
      new Text({
        text: leftName,
        style: {
          fontFamily: 'Maplestory Bold',
          fontSize: '64px',
          fill: '#ffffff',
        },
      }),
    );
    frontText.anchor.set(0.5);
    frontText.position.set(0, 0);

    this.back = this.addChild(new Container());
    const backBg = this.back.addChild(new Graphics());
    backBg.circle(0, 0, 200).fill(0xde9300);
    backBg.circle(0, 0, 190).stroke({ color: 0xffffff, width: 4 });
    const backText = this.back.addChild(
      new Text({
        text: rightName,
        style: {
          fontFamily: 'Maplestory Bold',
          fontSize: '64px',
          fill: '#ffffff',
        },
      }),
    );
    backText.anchor.set(0.5);
    backText.position.set(0, 0);
  }

  update(time: Ticker) {
    
  }
}
