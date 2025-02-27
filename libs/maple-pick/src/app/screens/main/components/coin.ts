import { store } from '../../../store/state-store';
import { autorun } from 'mobx';
import { Container, Graphics, Text } from 'pixi.js';

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
    this.scale.set(value);
  }

  constructor() {
    super();

    this.front = this.addChild(new Container());
    const frontBg = this.front.addChild(new Graphics());
    frontBg.beginFill(0x0075ca).drawCircle(0, 0, 200).endFill();
    frontBg.lineStyle(1, 0xffffff).beginFill().drawCircle(0, 0, 190).endFill();
    const frontText = this.front.addChild(
      new Text(store.roomState.leftTeam.name, {
        fontFamily: 'Maplestory Bold',
        fontSize: '64px',
        fill: '#ffffff',
      }),
    );
    frontText.anchor.set(0.5);
    frontText.position.set(0, 0);

    this.back = this.addChild(new Container());
    const backBg = this.back.addChild(new Graphics());
    backBg.beginFill(0xde9300).drawCircle(0, 0, 200).endFill();
    backBg.lineStyle(1, 0xffffff).beginFill().drawCircle(0, 0, 190).endFill();
    const backText = this.back.addChild(
      new Text(store.roomState.rightTeam.name, {
        fontFamily: 'Maplestory Bold',
        fontSize: '64px',
        fill: '#ffffff',
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
    });
  }
}
