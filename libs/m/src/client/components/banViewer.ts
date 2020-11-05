import { autorun } from 'mobx';
import { store } from '../store';
import { BanPanel } from './banPanel';

export class BanViewer extends PIXI.Container {
  private _nextPanel?: BanPanel;
  private _size = 64;

  constructor() {
    super();

    const leftBan = [
      this.addChild(new BanPanel(this._size)),
      this.addChild(new BanPanel(this._size)),
      this.addChild(new BanPanel(this._size)),
    ];

    leftBan[0].position.set(32, 32);
    leftBan[1].position.set(32 + this._size + 16, 32);
    leftBan[2].position.set(32 + this._size + 16 + this._size + 16 + 16, 32);

    const rightBan = [
      this.addChild(new BanPanel(this._size)),
      this.addChild(new BanPanel(this._size)),
      this.addChild(new BanPanel(this._size)),
    ];

    rightBan[0].position.set(1920 - this._size - 32, 32);
    rightBan[1].position.set(1920 - this._size - (32 + this._size + 16), 32);
    rightBan[2].position.set(
      1920 - this._size - (32 + this._size + 16 + this._size + 16 + 16),
      32
    );

    autorun(() => {
      store.sequenceStore.reset;
      for (let i = 0; i < leftBan.length; i++) {
        leftBan[i].jobId = 0;
      }
      for (let i = 0; i < rightBan.length; i++) {
        rightBan[i].jobId = 0;
      }
    });

    autorun(() => {
      for (let i = 0; i < leftBan.length; i++) {
        if (store.jobStore.leftBanList.length <= i) break;
        leftBan[i].jobId = store.jobStore.leftBanList[i];
      }
      for (let i = 0; i < rightBan.length; i++) {
        if (store.jobStore.rightBanList.length <= i) break;
        rightBan[i].jobId = store.jobStore.rightBanList[i];
      }
    });

    autorun(() => {
      const nextPayload = store.sequenceStore.currentSequence?.payload;

      if (this._nextPanel) {
        this._nextPanel.isNext = false;
      }

      if (nextPayload?.action == 'ban') {
        const target = nextPayload?.team == 'left' ? leftBan : rightBan;

        if (nextPayload.index != undefined) {
          this._nextPanel = target[nextPayload.index];
          this._nextPanel.isNext = true;
        }
      }
    });
  }
}
