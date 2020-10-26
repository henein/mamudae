import socketIO from 'socket.io';

import { JobId } from '../common/enums';
import { jobList } from '../common/jobs';
import { IOEvent, SequencePayload } from '../common/events';
import SequenceQueue, { Sequence } from '../common/sequenceQueue';

export default class State {
  private _io: socketIO.Server;
  private _sequenceQueue: SequenceQueue;
  private _nextSequence?: Sequence;

  unPickedList: JobId[];
  leftBanList: JobId[];
  rightBanList: JobId[];
  leftPickList: JobId[];
  rightPickList: JobId[];

  constructor(io: socketIO.Server) {
    this._io = io;
    this._sequenceQueue = new SequenceQueue();
    this.dequeueSequence();
    this.unPickedList = jobList.map<JobId>((value) => {
      return value.id;
    });
    this.leftBanList = [];
    this.rightBanList = [];
    this.leftPickList = [];
    this.rightPickList = [];
  }

  private dequeueSequence() {
    this._nextSequence = this._sequenceQueue.dequeue();
  }

  getNextSequence() {
    return this._nextSequence;
  }

  onStart() {
    const payload: SequencePayload = { nextSequence: this._nextSequence };
    this.dequeueSequence();
    this._io.emit(IOEvent.START, payload);
  }

  onEnd() {
    this.dequeueSequence();
    this._io.emit(IOEvent.END);
  }

  onBanPick(payload: SequencePayload) {
    const { action, team, index, jobId } = payload;
    const nextSequencePayload = this._nextSequence?.payload;

    if (!jobId) {
      console.error('jobId 누락');
      return;
    }

    if (action == 'opponentPick') {
      // 두개 받는 처리
    }

    if (
      nextSequencePayload?.action != action &&
      nextSequencePayload?.team != team &&
      nextSequencePayload?.index != index
    ) {
      console.error('잘못된 순서');
      return;
    }

    const targetList =
      action == 'ban'
        ? team == 'left'
          ? this.leftBanList
          : this.rightBanList
        : team == 'left'
        ? this.leftPickList
        : this.rightPickList;

    const isSuccessed = this.moveJob(jobId, targetList, index ?? -1);

    if (isSuccessed) {
      const emitPayload: SequencePayload = {
        nextSequence: this._nextSequence,
        action,
        team,
        index,
        jobId,
      };
      this._io.emit(IOEvent.BAN_PICK, emitPayload);
      this.dequeueSequence();
    }
  }

  onReset = () => {
    this._sequenceQueue = new SequenceQueue();
    this.dequeueSequence();
    this.unPickedList = jobList.map<JobId>((value) => {
      return value.id;
    });
    this.leftBanList = [];
    this.rightBanList = [];
    this.leftPickList = [];
    this.rightPickList = [];
    this._io.emit(IOEvent.RESET);
  };

  private moveJob = (
    jobId: JobId,
    target: JobId[],
    toIndex: number
  ): boolean => {
    const fromIndex = this.unPickedList.indexOf(jobId);

    if (fromIndex > -1) {
      if (target.length == toIndex) {
        target.push(this.unPickedList.splice(fromIndex, 1)[0]);
        return true;
      } else {
        console.error('잘못된 순서');
        return false;
      }
    } else {
      console.error('선택할 수 없는 직업');
      return false;
    }
  };
}
