import { Container, Graphics, Text } from 'pixi.js';
import { StateStore, store } from '../../../store/state-store';
import { autorun } from 'mobx';

export class Coin extends Container {
  front: Container;
  back: Container;

  private _coinAngle = 0;

  get coinAngle() {
    return this._coinAngle;
  }

  set coinAngle(value) {
    this._coinAngle = value;

    this.front.scale.y = Math.cos(this._coinAngle);
    this.back.scale.y = -Math.cos(this._coinAngle);

    this.front.visible = this.front.scale.y > 0;
    this.back.visible = !this.front.visible;
  }

  private _coinScale = 1;

  get coinScale() {
    return this._coinScale;
  }

  set coinScale(value) {
    this._coinScale = value;
    this.scale = value
  }

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

    autorun(() => {
      frontText.text = store.roomState.leftTeam.name;
      frontText.anchor.set(0.5);
      frontText.position.set(0, 0);

      backText.text = store.roomState.rightTeam.name;
      backText.anchor.set(0.5);
      backText.position.set(0, 0);
    })
  }
}
