exports = {};
import TWEEN from '@tweenjs/tween.js';
import WebFont from 'webfontloader';
import { constants } from './constants';
import { BanPickModal } from './components/banPickModal';
import './styles.css';
import { BanViewer } from './components/banViewer';
import { PickViewer } from './components/pickViewer';
import { TitleBar } from './components/titleBar';
import { Camera } from './components/camera';
import {
  AlphaFilter,
  Application,
  Container,
  Graphics,
  Loader,
  Text,
  TextStyle,
} from 'pixi.js';

const app = new Application({
  width: 1920,
  height: 1080,
});
document.body.appendChild(app.view);

WebFont.load({
  custom: {
    families: ['NanumBarunGothic', 'MaplestoryOTFLight', 'MaplestoryOTFBold'],
    urls: ['./assets/fonts.css'],
  },

  active() {
    onFontLoaded();
  },
});

async function onFontLoaded() {
  const loader = new Loader();

  const loading = app.stage.addChild(
    new Text({ text: '로딩 중...', style: { fill: 0xffffff } })
  );

  const backgrounds = [];
  for (let i = 0; i <= 26; i++) {
    backgrounds.push(`./assets/backgrounds/${i}.png`);
  }
  await loader.load(backgrounds);

  const splashes = [];
  for (let i = 1; i <= 44; i++) {
    splashes.push(`./assets/splashes/${i}.png`);
  }
  await loader.load(splashes);

  await loader.load('../assets/backgrounds/multiply.png');
  await loader.load('../assets/backgrounds/multiplyBan.png');

  loading.destroy();
  onAssetsLoaded();
}

function onAssetsLoaded() {
  const baseContainer = new Container();

  baseContainer.addChild(new Camera());

  baseContainer.addChild(new TitleBar());

  baseContainer.addChild(new BanViewer());

  baseContainer.addChild(new PickViewer());

  baseContainer.addChild(new BanPickModal());

  const authorText = baseContainer.addChild(
    new Text(
      'made by Pdom (프돔이@스카니아)',
      new TextStyle({
        fontFamily: 'MaplestoryOTFLight',
        fontSize: 24,
        fill: 0xb2b2b2,
        dropShadow: { color: 0x000000, distance: 0, blur: 4 },
      })
    )
  );
  authorText.anchor.set(1, 1);
  authorText.position.set(1920 - 28, 1080 - 24);

  baseContainer.pivot.set(constants.BASE_WIDTH / 2, constants.BASE_HEIGHT / 2);
  app.stage.addChild(baseContainer);

  app.stage.filters = [new AlphaFilter()];
  app.stage.filterArea = app.screen;

  const graphics = baseContainer.addChild(new Graphics());
  graphics.beginFill(0xffffff);
  graphics.drawRect(0, 0, 1920, 1080);
  graphics.endFill();

  baseContainer.mask = graphics;

  window.addEventListener('resize', onResize);

  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;

    app.renderer.resize(width, height);

    if (ratio < constants.BASE_RATIO) {
      baseContainer.scale.set(width / constants.BASE_WIDTH);
    } else {
      baseContainer.scale.set(height / constants.BASE_HEIGHT);
    }
    baseContainer.position.set(width / 2, height / 2);
  }
  onResize();
}

app.ticker.add(() => {
  TWEEN.update();
});
