import { AlphaFilter, Container, Graphics, Text, TextStyle, Ticker } from "pixi.js";
import { engine } from "../../getEngine";
import { Camera } from "./components/camera";
import { TitleBar } from "./components/titleBar";
import { BanViewer } from "./components/banViewer";
import { PickViewer } from "./components/pickViewer";
import { BanPickModal } from "./components/banPickModal";
import TWEEN from "@tweenjs/tween.js";

export class MainScreen extends Container {
  public static assetBundles = ["main"];

  constructor() {
    super();

    this.addChild(new Camera());

    this.addChild(new TitleBar());

    this.addChild(new BanViewer());

    this.addChild(new PickViewer());

    this.addChild(new BanPickModal());

    const authorText = this.addChild(
      new Text(
        'made by Pdom (프돔이@스카니아)',
        new TextStyle({
          fontFamily: 'Maplestory Light',
          fontSize: 24,
          fill: 0xb2b2b2,
          dropShadow: { color: 0x000000, distance: 0, blur: 4 },
        })
      )
    );
    authorText.anchor.set(1, 1);
    authorText.position.set(1920 - 28, 1080 - 24);

    this.filters = [new AlphaFilter()];
    this.filterArea = engine().screen;

    const graphics = this.addChild(new Graphics());
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 1920, 1080);
    graphics.endFill();

    this.mask = graphics;
  }

  /** Prepare the screen just before showing */
  public prepare() {
    //
  }

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {
    TWEEN.update(_time.lastTime);
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    //
  }

  /** Resume gameplay */
  public async resume() {
    //
  }

  /** Fully reset */
  public reset() {
    //
  }

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    //
  }

  /** Show screen with animations */
  public async show(): Promise<void> {
    //
  }

  /** Hide screen with animations */
  public async hide() {
    //
  }

  /** Auto pause the app when window go out of focus */
  public blur() {
    //
  }
}


// WebFont.load({
//   custom: {
//     families: ['NanumBarunGothic', 'Maplestory Light', 'Maplestory Bold'],
//     urls: ['./assets/fonts.css'],
//   },

//   active() {
//     onFontLoaded();
//   },
// });

// async function onFontLoaded() {
//   const loader = new Loader();

//   const loading = app.stage.addChild(
//     new Text({ text: '로딩 중...', style: { fill: 0xffffff } })
//   );

//   const backgrounds = [];
//   for (let i = 0; i <= 26; i++) {
//     backgrounds.push(`./assets/backgrounds/${i}.png`);
//   }
//   await loader.load(backgrounds);

//   const splashes = [];
//   for (let i = 1; i <= 44; i++) {
//     splashes.push(`./assets/splashes/${i}.png`);
//   }
//   await loader.load(splashes);

//   await loader.load('../assets/backgrounds/multiply.png');
//   await loader.load('../assets/backgrounds/multiplyBan.png');

//   loading.destroy();
//   onAssetsLoaded();
// }
