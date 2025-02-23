import { Coin } from './coin';
import { Team } from '@henein/mamudae-lib';
import { animate } from 'motion';
import { Container } from 'pixi.js';

export class CoinFlip extends Container {
  coin: Coin;

  constructor(leftName: string, rightName: string) {
    super();

    this.coin = this.addChild(new Coin(leftName, rightName));
    this.coin.alpha = 0;
  }

  async run(team: Team) {
    this.coin.visible = true;

    await animate(
      this.coin,
      { coinAngle: 2 * Math.PI * 10, coinScale: 1.5, alpha: 1 },
      { duration: 1, ease: 'easeOut' },
    );

    await animate(
      this.coin,
      { coinAngle: team === 'left' ? 0 : Math.PI, coinScale: 1, alpha: 1 },
      { duration: 1, ease: 'easeIn' },
    );

    await animate(
      this.coin,
      { alpha: 0 },
      { delay: 1, duration: 1, ease: 'easeOut' },
    );

    this.coin.visible = false;
  }
}
