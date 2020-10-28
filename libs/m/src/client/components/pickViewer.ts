import { autorun } from 'mobx';
import { store } from '../store';
import { PickPanel } from './pickPanel';

export class PickViewer extends PIXI.Container {
  constructor() {
    super();

    const leftPick: PickPanel[] = [];

    for (let i = 0; i < 6; i++) {
      leftPick[i] = this.addChild(new PickPanel({ direction: 'left' }));
      leftPick[i].position.set(0, 168 + 136 * i);
    }

    const rightPick: PickPanel[] = [];

    for (let i = 0; i < 6; i++) {
      rightPick[i] = this.addChild(new PickPanel({ direction: 'right' }));
      rightPick[i].position.set(1524, 168 + 136 * i);
    }

    autorun(() => {
      store.sequenceStore.reset;
      for (let i = 0; i < leftPick.length; i++) {
        leftPick[i].reset();
      }
      for (let i = 0; i < rightPick.length; i++) {
        rightPick[i].reset();
      }
    });

    autorun(() => {
      for (let i = 0; i < leftPick.length; i++) {
        if (store.jobStore.leftPickList.length <= i) break;
        leftPick[i].jobId = store.jobStore.leftPickList[i];
      }
      for (let i = 0; i < rightPick.length; i++) {
        if (store.jobStore.rightPickList.length <= i) break;
        rightPick[i].jobId = store.jobStore.rightPickList[i];
      }
    });
  }
}
