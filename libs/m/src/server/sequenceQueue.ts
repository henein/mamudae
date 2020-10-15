import { Event } from '../common/enums';

export type Sequence = {
  event: Event;
  payload?: { [key: string]: any };
};

export type Option = {
  teamBanSize?: number;
  teamPickSize?: number;
};

export default class SequenceQueue {
  private sequences: Sequence[] = [];

  constructor(option: Option = {}) {
    const { teamBanSize = 5, teamPickSize = 6 } = option;

    this.enqueue({ event: Event.START });

    for (let i = 0; i < teamBanSize * 2; i++) {
      const index = Math.floor(i / 2);

      if (!(i % 2)) {
        this.enqueue({
          event: Event.BAN,
          payload: { team: 'Left', index: index },
        });
      } else {
        this.enqueue({
          event: Event.BAN,
          payload: { team: 'Right', index: index },
        });
      }
    }

    for (let i = 0; i < teamPickSize * 2; i++) {
      const index = Math.floor(i / 2);

      if (!(i % 2)) {
        this.enqueue({
          event: Event.PICK,
          payload: { team: 'Left', index: index },
        });
      } else {
        this.enqueue({
          event: Event.PICK,
          payload: { team: 'Right', index: index },
        });
      }
    }

    this.enqueue({ event: Event.END });
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
