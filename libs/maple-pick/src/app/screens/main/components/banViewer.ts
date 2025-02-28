import { store } from '../../../store/state-store';
import { BanPanel } from './banPanel';
import { autorun } from 'mobx';
import { Container, Graphics } from 'pixi.js';

export class BanViewer extends Container {
  private _nextPanel?: BanPanel;
  private _size = 84;

  constructor() {
    super();

    const leftBan = [this.addChild(new BanPanel(this._size))];

    leftBan[0].position.set(0, 830 - this._size);
    // leftBan[1].position.set(32 + this._size + 16, 32);
    // leftBan[2].position.set(32 + this._size + 16 + this._size + 16 + 16, 32);

    const rightBan = [this.addChild(new BanPanel(this._size))];

    rightBan[0].position.set(1920 - this._size, 830 - this._size);
    // rightBan[1].position.set(1920 - this._size - (32 + this._size + 16), 32);
    // rightBan[2].position.set(
    //   1920 - this._size - (32 + this._size + 16 + this._size + 16 + 16),
    //   32
    // );

    const voteBg = this.addChild(new Graphics());
    voteBg.beginFill(0x212225, 0.95);
    voteBg.drawRect(0, 0, 400, 250);
    voteBg.endFill();
    voteBg.position.set(760, 830);

    const ban1 = voteBg.addChild(new BanPanel(this._size));
    ban1.portrait.jobId = store.roomState.votedBan;
    ban1.position.set(158 - 84 - 32, 83);

    const ban2 = voteBg.addChild(new BanPanel(this._size));
    ban2.portrait.jobId = store.roomState.votedPicks[0];
    ban2.position.set(158, 83);

    const ban3 = voteBg.addChild(new BanPanel(this._size));
    ban3.portrait.jobId = store.roomState.votedPicks[1];
    ban3.position.set(158 + 84 + 32, 83);

    autorun(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      store.reset;

      for (let i = 0; i < leftBan.length; i++) {
        leftBan[i].portrait.jobId = 0;
      }
      for (let i = 0; i < rightBan.length; i++) {
        rightBan[i].portrait.jobId = 0;
      }
    });

    autorun(() => {
      if (!store.roomState) return;

      for (let i = 0; i < leftBan.length; i++) {
        if (store.roomState.leftTeam.banList.length <= i) break;
        leftBan[i].portrait.jobId = store.roomState.leftTeam.banList[i];
      }
      for (let i = 0; i < rightBan.length; i++) {
        if (store.roomState.rightTeam.banList.length <= i) break;
        rightBan[i].portrait.jobId = store.roomState.rightTeam.banList[i];
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
