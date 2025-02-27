import { engine } from '../../getEngine';
import { store } from '../../store/state-store';
import { BanPickModal } from './components/banPickModal';
import { BanViewer } from './components/banViewer';
import { Camera } from './components/camera';
import { CoinFlip } from './components/coinFlip';
import { PickViewer } from './components/pickViewer';
import { TitleBar } from './components/titleBar';
import TWEEN from '@tweenjs/tween.js';
import { reaction } from 'mobx';
import { AlphaFilter, Container, Graphics } from 'pixi.js';

export class MainScreen extends Container {
  public static assetBundles = ['main'];

  coinFlip: CoinFlip;

  constructor() {
    super();

    this.addChild(new Camera());

    this.addChild(new TitleBar());

    this.addChild(new BanViewer());

    this.addChild(new PickViewer());

    this.addChild(new BanPickModal());

    this.filters = [new AlphaFilter()];
    this.filterArea = engine().screen;

    const graphics = this.addChild(new Graphics());
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 1920, 1080);
    graphics.endFill();

    this.mask = graphics;

    this.coinFlip = this.addChild(new CoinFlip());
    this.coinFlip.position = { x: 1920 / 2, y: 1080 / 2 };

    reaction(
      () => store.roomState.coinTossTeam,
      async (coinTossTeam) => {
        if (coinTossTeam) {
          store.isPaused = true;
          await this.coinFlip.run(coinTossTeam);
          store.isPaused = false;
        }
      },
    );
  }

  /** Prepare the screen just before showing */
  public prepare() {
    function animate(time: number) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }

    requestAnimationFrame(animate);
  }

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(dt: number) {
    // TWEEN.update(dt);
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
