import { autorun } from 'mobx';
import { store } from '../store';
import { Portrait } from './portrait';

export class BanViewer extends PIXI.Container {
  constructor() {
    super();

    const leftBan = [
      this.addChild(new Portrait({ size: 64 })),
      this.addChild(new Portrait({ size: 64 })),
      this.addChild(new Portrait({ size: 64 })),
    ];

    leftBan[0].position.set(32, 32);
    leftBan[1].position.set(112, 32);
    leftBan[2].position.set(192, 32);

    autorun(() => {
      if (store.jobStore.leftBanList.length >= 1)
        leftBan[0].jobId = store.jobStore.leftBanList[0];
    });
  }
}
