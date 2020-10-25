export class Button extends PIXI.Container {
  private _isDisabled = false;
  private _filter: PIXI.filters.ColorMatrixFilter;

  constructor() {
    super();
    this.interactive = true;
    this.buttonMode = true;
    this._filter = new PIXI.filters.ColorMatrixFilter();
    this.filters = [this._filter];

    this.on('pointerdown', () => {
      if (!this.isDisabled) {
        this._filter.brightness(0.8, false);
      }
    });
    this.on('pointerup', () => {
      if (!this.isDisabled) {
        this._filter.brightness(1.2, false);
      }
    });
    this.on('pointerover', () => {
      if (!this.isDisabled) {
        this._filter.brightness(1.2, false);
      }
    });
    this.on('pointerout', () => {
      if (!this.isDisabled) {
        this._filter.reset();
      }
    });
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    this._isDisabled = value;

    if (value) {
      this._filter.greyscale(0.2, false);
      this.interactive = false;
      this.buttonMode = false;
    } else {
      this._filter.reset();
      this.interactive = true;
      this.buttonMode = true;
    }
  }
}
