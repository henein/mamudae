import SquirrelEvents from './app/events/squirrel.events';
import ElectronEvents from './app/events/electron.events';
import UpdateEvents from './app/events/update.events';
import { app, BrowserWindow } from 'electron';
import App from './app/app';

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }

    app.on('browser-window-created', (event, window) => {
      window.on('resize', () => {

        if (window.getTitle() !== 'Maple Pick')
        {
          return;
        }

        const ratio = 16 / 9;
        const size = window.getContentSize();

        let width = size[0];
        let height = size[1];

        if (width / height < ratio) {
          width = Math.round(height * ratio);
        } else {
          height = Math.round(width / ratio);
        }

        window.setContentSize(width, height);
      });
    });
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();
