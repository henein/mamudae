import socketIO from 'socket.io';

import { IOEvent, JobId } from '../common/enums';
import { jobList } from '../common/jobs';
import { SequencePayload } from '../common/payloadTypes';
import SequenceQueue, { Sequence } from '../common/sequenceQueue';

export default class State {
  private _io: socketIO.Server;
  private _sequenceQueue: SequenceQueue;
  private _nextSequence?: Sequence;

  unPickedList: JobId[];
  leftBanList: JobId[] = [];
  rightBanList: JobId[] = [];
  leftPickList: JobId[] = [];
  rightPickList: JobId[] = [];

  constructor(io: socketIO.Server) {
    this._io = io;
    this._sequenceQueue = new SequenceQueue();
    this.dequeueSequence();
    this.unPickedList = jobList.map<JobId>((value) => {
      return value.id;
    });
  }

  private dequeueSequence() {
    this._nextSequence = this._sequenceQueue.dequeue();
  }

  getNextSequence() {
    return this._nextSequence;
  }

  onStart() {
    this.dequeueSequence();
    this._io.emit(IOEvent.START);
  }

  onEnd() {
    this.dequeueSequence();
    this._io.emit(IOEvent.END);
  }

  onBan(payload: SequencePayload) {
    const { team, index, jobId } = payload;
    if (!jobId) {
      console.error('jobId 누락');
      return;
    }

    const isSuccessed = this.moveJob(
      jobId,
      this.unPickedList,
      team == 'Left' ? this.leftBanList : this.rightBanList,
      index
    );

    if (isSuccessed) {
      this.dequeueSequence();
      this._io.emit(IOEvent.BAN, payload);
    }
  }

  onPick(payload: SequencePayload) {
    const { team, index, jobId } = payload;
    if (!jobId) {
      console.error('jobId 누락');
      return;
    }

    const isSuccessed = this.moveJob(
      jobId,
      this.unPickedList,
      team == 'Left' ? this.leftPickList : this.rightPickList,
      index
    );

    if (isSuccessed) {
      this.dequeueSequence();
      this._io.emit(IOEvent.PICK, payload);
    }
  }

  private moveJob(
    jobId: JobId,
    from: JobId[],
    to: JobId[],
    toIndex: number
  ): boolean {
    const fromIndex = from.indexOf(jobId);

    if (fromIndex > -1) {
      if (to.length == toIndex) {
        to.push(from.splice(fromIndex, 1)[0]);
        return true;
      } else {
        console.error('잘못된 순서');
        return false;
      }
    } else {
      console.error('선택할 수 없는 직업');
      return false;
    }
  }
}
