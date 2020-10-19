import { IOEvent } from './enums';
import { SequencePayload } from './payloadTypes';

export type Sequence = {
  event: IOEvent;
  payload?: SequencePayload;
};

export type Option = {
  teamBanSize?: number;
  teamPickSize?: number;
};

export default class SequenceQueue {
  private sequences: Sequence[] = [];

  constructor(option: Option = {}) {
    const { teamBanSize = 5, teamPickSize = 6 } = option;

    this.enqueue({ event: IOEvent.START, payload: { team: 'Left', index: 0 } });

    for (let i = 0; i < teamBanSize * 2; i++) {
      const index = Math.floor(i / 2);

      if (!(i % 2)) {
        this.enqueue({
          event: IOEvent.BAN,
          payload: { team: 'Left', index: index },
        });
      } else {
        this.enqueue({
          event: IOEvent.BAN,
          payload: { team: 'Right', index: index },
        });
      }
    }

    for (let i = 0; i < teamPickSize * 2; i++) {
      const index = Math.floor(i / 2);

      if (!(i % 2)) {
        this.enqueue({
          event: IOEvent.PICK,
          payload: { team: 'Left', index: index },
        });
      } else {
        this.enqueue({
          event: IOEvent.PICK,
          payload: { team: 'Right', index: index },
        });
      }
    }

    this.enqueue({ event: IOEvent.END });
  }

  enqueue(item: Sequence) {
    this.sequences.push(item);
  }

  dequeue() {
    return this.sequences.shift();
  }

  size() {
    return this.sequences.length;
  }
}
