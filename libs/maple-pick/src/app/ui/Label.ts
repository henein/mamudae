import type { ICanvas, ITextStyle, TextStyle } from "pixi.js";
import { Text } from "pixi.js";

const defaultLabelStyle: Partial<ITextStyle> = {
  fontFamily: "Arial Rounded MT Bold",
  align: "center",
};

export type LabelOptions = typeof defaultLabelStyle;

/**
 * A Text extension pre-formatted for this app, starting centred by default,
 * because it is the most common use in the app.
 */
export class Label extends Text {
  constructor(text?: string | number, style?: Partial<ITextStyle> | TextStyle, canvas?: ICanvas) {
    const finalStyle = { ...defaultLabelStyle, ...style };
    super(text, finalStyle, canvas);
    // Label is always centred, but this can be changed in instance afterwards
    this.anchor.set(0.5);
  }
}
