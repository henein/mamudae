import * as PIXI from 'pixi.js';
import 'pixi-picture';
import 'pixi-heaven';
import TWEEN from '@tweenjs/tween.js';
import WebFont from 'webfontloader';
import { constants } from './constants';
import { BanPickModal } from './components/banPickModal';
import './styles.css';
import { store } from './store';
import { BanViewer } from './components/banViewer';
import { autorun } from 'mobx';
import { PickViewer } from './components/pickViewer';
import { TitleBar } from './components/titleBar';
import { Camera } from './components/camera';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
});
document.body.appendChild(app.view);

WebFont.load({
  google: {
    families: ['Jua'],
  },

  active() {
    onAssetsLoaded();
  },
});

function onAssetsLoaded() {
  const baseContainer = new PIXI.Container();

  baseContainer.addChild(new Camera());

  baseContainer.addChild(new TitleBar());

  baseContainer.addChild(new BanViewer());

  baseContainer.addChild(new PickViewer());

  baseContainer.addChild(new BanPickModal());

  baseContainer.pivot.set(constants.BASE_WIDTH / 2, constants.BASE_HEIGHT / 2);
  app.stage.addChild(baseContainer);

  app.stage.filters = [new PIXI.filters.AlphaFilter()];
  app.stage.filterArea = app.screen;

  const graphics = baseContainer.addChild(new PIXI.Graphics());
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
