import { Label } from './Label';
import { Slider } from '@pixi/ui';
import { Graphics } from 'pixi.js';

/**
 * A volume slider component to be used in the Settings popup.
 */
export class VolumeSlider extends Slider {
  /** Message displayed for the slider */
  public messageLabel: Label;

  constructor(label: string, min = -0.1, max = 100, value = 100) {
    const width = 280;
    const height = 20;
    const radius = 20;
    const border = 4;
    const handleRadius = 14;
    const handleBorder = 4;
    const meshColor = 0xec1561;
    const fillColor = 0xef6294;
    const borderColor = 0xec1561;
    const backgroundColor = 0xffffff;

    const bg = new Graphics()
      .beginFill(borderColor)
      .drawRoundedRect(0, 0, width, height, radius)
      .endFill()
      .beginFill(backgroundColor)
      .drawRoundedRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .endFill();

    const fill = new Graphics()
      .beginFill(borderColor)
      .drawRoundedRect(0, 0, width, height, radius)
      .endFill()
      .beginFill(fillColor)
      .drawRoundedRect(
        border,
        border,
        width - border * 2,
        height - border * 2,
        radius,
      )
      .endFill();

    const slider = new Graphics()
      .beginFill(meshColor)
      .drawCircle(0, 0, handleRadius + handleBorder)
      .endFill();

    super({
      bg,
      fill,
      slider,
      min,
      max,
    });

    this.value = value;

    this.messageLabel = new Label(label, {
      align: 'left',
      fill: 0x4a4a4a,
      fontSize: 18,
    });
    this.messageLabel.anchor.x = 0;
    this.messageLabel.x = 10;
    this.messageLabel.y = -18;
    this.addChild(this.messageLabel);
  }
}
