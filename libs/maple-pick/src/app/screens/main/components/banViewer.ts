import { autorun } from 'mobx';
import { store } from '../../../store/state-store';
import { BanPanel } from './banPanel';
import { Container } from 'pixi.js';

export class BanViewer extends Container {
  private _nextPanel?: BanPanel;
  private _size = 64;

  constructor() {
    super();

    const leftBan = [
      this.addChild(new BanPanel(this._size)),
    ];

    leftBan[0].position.set(32, 32);
    // leftBan[1].position.set(32 + this._size + 16, 32);
    // leftBan[2].position.set(32 + this._size + 16 + this._size + 16 + 16, 32);

    const rightBan = [
      this.addChild(new BanPanel(this._size)),
    ];

    rightBan[0].position.set(1920 - this._size - 32, 32);
    // rightBan[1].position.set(1920 - this._size - (32 + this._size + 16), 32);
    // rightBan[2].position.set(
    //   1920 - this._size - (32 + this._size + 16 + this._size + 16 + 16),
    //   32
    // );

    autorun(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      store.reset;

      for (let i = 0; i < leftBan.length; i++) {
        leftBan[i].jobId = 0;
      }
      for (let i = 0; i < rightBan.length; i++) {
        rightBan[i].jobId = 0;
      }
    });

    autorun(() => {
      if (!store.roomState)
        return;

      for (let i = 0; i < leftBan.length; i++) {
        if (store.roomState.leftTeam.banList.length <= i) break;
        leftBan[i].jobId = store.roomState.leftTeam.banList[i];
      }
      for (let i = 0; i < rightBan.length; i++) {
        if (store.roomState.rightTeam.banList.length <= i) break;
        rightBan[i].jobId = store.roomState.rightTeam.banList[i];
      }
    });

    autorun(() => {
      const currentSequence = store.currentSequence;

      if (this._nextPanel) {
        this._nextPanel.isNext = false;
      }

      if (currentSequence?.action === 'ban') {
        const target = currentSequence?.team === 'left' ? leftBan : rightBan;

        if (currentSequence.index !== undefined) {
          this._nextPanel = target[currentSequence.index];
          this._nextPanel.isNext = true;
        }
      }
    });
  }
}
