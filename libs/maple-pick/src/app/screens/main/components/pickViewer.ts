import { autorun, reaction } from 'mobx';
import { store } from '../../../store/state-store';
import { PickPanel } from './pickPanel';
import { Container } from 'pixi.js';

export class PickViewer extends Container {
  private _currentPick?: PickPanel;

  constructor() {
    super();

    const leftPick: PickPanel[] = [];

    for (let i = 0; i < 6; i++) {
      if (i === 5) {
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
      if (i === 5) {
        rightPick[i] = this.addChild(
          new PickPanel({ direction: 'right', isOpponent: true })
        );
      } else {
        rightPick[i] = this.addChild(new PickPanel({ direction: 'right' }));
      }

      rightPick[i].position.set(1524, 168 + 136 * i);
    }

    reaction(
      () => store.reset,
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

      const currentSequence = store.currentSequence;

      if (!currentSequence) {
        leftPick[5].state = 'default';
        rightPick[5].state = 'default';
        return;
      } else if (currentSequence.action === 'end') {
        leftPick[5].state = 'done';
        rightPick[5].state = 'done';
        return;
      }

      if (currentSequence?.action === 'pick') {
        const target = currentSequence.team === 'left' ? leftPick : rightPick;

        if (currentSequence.index === undefined) {
          return;
        }

        this._currentPick = target[currentSequence.index];
        this._currentPick.state = 'current';
      } /* else if (currentSequence?.action === 'opponentPick') {
        leftPick[5].state = 'blind';
        rightPick[5].state = 'blind';

        if (store.jobStore.leftOpponentPick) {
          leftPick[5].state = 'done';
        }

        if (store.jobStore.rightOpponentPick) {
          rightPick[5].state = 'done';
        }
      } */
    });

    autorun(() => {
      const nextSequence = store.nextSequence;

      if (!nextSequence) {
        return;
      }


      if (nextSequence?.action === 'pick') {
        const target = nextSequence.team === 'left' ? leftPick : rightPick;

        if (nextSequence.index === undefined) {
          return;
        }

        target[nextSequence.index].state = 'next';
      } /* else if (nextSequence?.action === 'opponentPick') {
        if (
          store.sequenceStore.currentSequence?.action != 'opponentPick'
        ) {
          leftPick[5].state = 'next';
          rightPick[5].state = 'next';
        }
      } */
    });

    autorun(() => {
      for (let i = 0; i < leftPick.length; i++) {
        if (store.roomState.leftTeam.pickList.length <= i) break;
        leftPick[i].jobId = store.roomState.leftTeam.pickList[i];
      }
      for (let i = 0; i < rightPick.length; i++) {
        if (store.roomState.rightTeam.pickList.length <= i) break;
        rightPick[i].jobId = store.roomState.rightTeam.pickList[i];
      }
    });
  }
}
