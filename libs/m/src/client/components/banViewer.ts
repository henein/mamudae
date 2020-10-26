import { autorun } from 'mobx';
import { store } from '../store';
import { Portrait } from './portrait';

export class BanViewer extends PIXI.Container {
  constructor() {
    super();

    const leftBan = [
      this.addChild(new Portrait({ size: 84 })),
      this.addChild(new Portrait({ size: 84 })),
      this.addChild(new Portrait({ size: 84 })),
    ];

    leftBan[0].position.set(32, 32);
    leftBan[1].position.set(32 + 84 + 16, 32);
    leftBan[2].position.set(32 + 84 + 16 + 84 + 16 + 16, 32);

    autorun(() => {
      store.sequenceStore.reset;
      for (let i = 0; i < leftBan.length; i++) {
        leftBan[i].jobId = 0;
      }
    });

    autorun(() => {
      for (let i = 0; i < leftBan.length; i++) {
        if (store.jobStore.leftBanList.length <= i) return;
        leftBan[i].jobId = store.jobStore.leftBanList[i];
      }
    });
  }
}
