import FontFaceObserver from 'fontfaceobserver';
import DefaultMultiStyleText, { TextStyleSet } from 'pixi-multistyle-text';

const fontFaceObserver = new FontFaceObserver('Jua');

export class Text extends PIXI.Text {
  constructor(
    text: string,
    style?: PIXI.TextStyle,
    canvas?: HTMLCanvasElement
  ) {
    super(text, style, canvas);

    fontFaceObserver.load(text).then(() => {
      super.text = super.text + '.';
      super.text = super.text.slice(0, -1);
    });
  }

  setText(value: string) {
    super.text = value;
    fontFaceObserver.load(value).then(() => {
      super.text = super.text + '.';
      super.text = super.text.slice(0, -1);
    });
  }
}

export class MultiStyleText extends DefaultMultiStyleText {
  constructor(text: string, styles: TextStyleSet) {
    super(text, styles);

    fontFaceObserver.load(text).then(() => {
      super.text = super.text + '.';
      super.text = super.text.slice(0, -1);
    });
  }

  setText(value: string) {
    super.text = value;
    fontFaceObserver.load(value).then(() => {
      super.text = super.text + '.';
      super.text = super.text.slice(0, -1);
    });
  }
}
