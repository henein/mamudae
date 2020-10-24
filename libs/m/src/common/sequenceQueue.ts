import { IOEvent } from './enums';
import { SequencePayload } from './events';

export type Sequence = {
  event: IOEvent;
  payload?: SequencePayload;
};

export default class SequenceQueue {
  private sequences: Sequence[] = [];

  constructor() {
    this.enqueue({ event: IOEvent.START, payload: { team: 'left', index: 0 } });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'left', index: 0 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'right', index: 0 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'left', index: 1 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'right', index: 1 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'left', index: 0 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'right', index: 0 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'right', index: 1 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'left', index: 1 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'left', index: 2 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'right', index: 2 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'right', index: 2 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'ban', team: 'left', index: 2 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'right', index: 3 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'right', index: 4 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'left', index: 3 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'pick', team: 'left', index: 4 },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'opponentPick' },
    });
    this.enqueue({
      event: IOEvent.BAN_PICK,
      payload: { action: 'opponentPick' },
    });
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
