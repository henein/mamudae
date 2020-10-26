export class TitleBar extends PIXI.Container {
  private _left: PIXI.Graphics;
  private _right: PIXI.Graphics;
  private _main: PIXI.Graphics;

  constructor() {
    super();

    this._left = this.addChild(new PIXI.Graphics());
    this._left.beginFill(0x660000);
    this._left.drawRect(428, 0, 232, 100);
    this._left.endFill();

    this._right = this.addChild(new PIXI.Graphics());
    this._right.beginFill(0x000066);
    this._right.drawRect(1260, 0, 232, 100);
    this._right.endFill();

    this._main = this.addChild(new PIXI.Graphics());
    this._main.beginFill(0xffffff);
    this._main.drawRect(660, 0, 600, 140);
    this._main.endFill();

    const title = this.addChild(
      new PIXI.Text('메무대', { fontSize: 64, fill: '#000000' })
    );
    title.anchor.set(0.5);
    title.position.set(1920 / 2, 70);
  }
}
