import * as PIXI from 'pixi.js';
import 'pixi-picture';
import TWEEN from '@tweenjs/tween.js';
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

declare global {
  interface Window {
    WebFontConfig: any;
  }
}

window.WebFontConfig = {
  google: {
    families: ['Jua'],
  },

  active() {
    onAssetsLoaded();
  },
};

/* eslint-disable */
(function() {
  const wf = document.createElement('script');
  wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = 'text/javascript';
  wf.async = true;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode?.insertBefore(wf, s);
}());
/* eslint-enabled */

function onAssetsLoaded() {
  const baseContainer = new PIXI.Container();
  
  baseContainer.addChild(new Camera())

  baseContainer.addChild(new TitleBar());

  baseContainer.addChild(new BanViewer());

  baseContainer.addChild(new PickViewer());

  baseContainer.addChild(new BanPickModal());

  const text = baseContainer.addChild(
    new PIXI.Text('시퀸스', { fontFamily: 'Jua', fontSize: 50, fill: '#ffffff' })
  );
  text.position.set(500, 500);
  autorun(() => {
    text.text = store.sequenceStore.nextSequence?.event.toString() ?? '';
  });

  baseContainer.pivot.set(constants.BASE_WIDTH / 2, constants.BASE_HEIGHT / 2);
  app.stage.addChild(baseContainer);

  app.stage.filters = [new PIXI.filters.AlphaFilter()];
  app.stage.filterArea = app.screen;

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
