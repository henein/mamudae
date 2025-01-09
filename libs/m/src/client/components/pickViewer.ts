import { autorun, reaction } from 'mobx';
import { IOEvent } from '../../common/events';
import { store } from '../store';
import { PickPanel } from './pickPanel';
import { Container } from 'pixi.js';

export class PickViewer extends Container {
  private _currentPick?: PickPanel;

  constructor() {
    super();

    const leftPick: PickPanel[] = [];

    for (let i = 0; i < 6; i++) {
      if (i == 5) {
        leftPick[i] = this.addChild(
          new PickPanel({ direction: 'left', isOpponent: true })
        );
      } else {
        leftPick[i] = this.addChild(new PickPanel({ direction: 'left' }));
      }

      leftPick[i].position.set(0, 168 + 136 * i);
    }

    const rightPick: PickPanel[] = [];

    for (let i = 0; i < 6; i++) {
      if (i == 5) {
        rightPick[i] = this.addChild(
          new PickPanel({ direction: 'right', isOpponent: true })
        );
      } else {
        rightPick[i] = this.addChild(new PickPanel({ direction: 'right' }));
      }

      rightPick[i].position.set(1524, 168 + 136 * i);
    }

    reaction(
      () => store.sequenceStore.reset,
      () => {
        for (let i = 0; i < leftPick.length; i++) {
          leftPick[i].reset();
        }
        for (let i = 0; i < rightPick.length; i++) {
          rightPick[i].reset();
        }
      }
    );

    autorun(() => {
      if (this._currentPick) {
        this._currentPick.state = 'default';
      }

      if (!store.sequenceStore.currentSequence) {
        leftPick[5].state = 'default';
        rightPick[5].state = 'default';
        return;
      } else if (store.sequenceStore.currentSequence.event == IOEvent.END) {
        leftPick[5].state = 'done';
        rightPick[5].state = 'done';
        return;
      }

      const payload = store.sequenceStore.currentSequence.payload;

      if (payload?.action == 'pick') {
        const target = payload.team == 'left' ? leftPick : rightPick;

        if (payload.index == undefined) {
          return;
        }

        this._currentPick = target[payload.index];
        this._currentPick.state = 'current';
      } else if (payload?.action == 'opponentPick') {
        leftPick[5].state = 'blind';
        rightPick[5].state = 'blind';

        if (store.jobStore.leftOpponentPick) {
          leftPick[5].state = 'done';
        }

        if (store.jobStore.rightOpponentPick) {
          rightPick[5].state = 'done';
        }
      }
    });

    autorun(() => {
      if (!store.sequenceStore.nextSequence) {
        return;
      }

      const payload = store.sequenceStore.nextSequence.payload;

      if (payload?.action == 'pick') {
        const target = payload.team == 'left' ? leftPick : rightPick;

        if (payload.index == undefined) {
          return;
        }

        target[payload.index].state = 'next';
      } else if (payload?.action == 'opponentPick') {
        if (
          store.sequenceStore.currentSequence?.payload?.action != 'opponentPick'
        ) {
          leftPick[5].state = 'next';
          rightPick[5].state = 'next';
        }
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
