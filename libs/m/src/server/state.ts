import socketIO from 'socket.io';

import { JobId } from '../common/enums';
import { Job, jobList } from '../common/jobs';
import { IOEvent, SequencePayload } from '../common/events';
import SequenceQueue, { Sequence } from '../common/sequenceQueue';
import { SelectPayload, TeamNamePayload } from './../common/events';

export default class State {
  private _io: socketIO.Server;
  private _sequenceQueue: SequenceQueue;

  nextSequence?: Sequence;
  nextNextSequence?: Sequence;

  leftTeamName: string;
  rightTeamName: string;

  unPickedList: JobId[];
  leftBanList: JobId[];
  rightBanList: JobId[];
  leftPickList: JobId[];
  rightPickList: JobId[];
  leftOpponentPick?: JobId;
  rightOpponentPick?: JobId;

  leftSelect?: JobId;
  rightSelect?: JobId;

  constructor(
    io: socketIO.Server,
    leftTeamName?: string,
    rightTeamName?: string
  ) {
    this._io = io;
    this._sequenceQueue = new SequenceQueue();
    this.dequeueSequence();

    this.leftTeamName = leftTeamName ?? 'A팀';
    this.rightTeamName = rightTeamName ?? 'B팀';

    this.unPickedList = jobList.reduce<JobId[]>(
      (previousValue: JobId[], currentValue: Job) => {
        if (currentValue.globalBan) {
          return previousValue;
        }

        previousValue.push(currentValue.id);
        return previousValue;
      },
      []
    );
    this.leftBanList = [];
    this.rightBanList = [];
    this.leftPickList = [];
    this.rightPickList = [];
    this.leftOpponentPick = undefined;
    this.rightOpponentPick = undefined;

    this.leftSelect = undefined;
    this.rightSelect = undefined;
  }

  private dequeueSequence() {
    this.nextSequence = this._sequenceQueue.dequeue();
    this.nextNextSequence = this._sequenceQueue.next();
    console.log('[NextEvent]' + this.nextSequence?.event);
  }

  onTeamName(payload: TeamNamePayload) {
    this.leftTeamName = payload.leftTeamName
      ? payload.leftTeamName
      : this.leftTeamName;
    this.rightTeamName = payload.rightTeamName
      ? payload.rightTeamName
      : this.rightTeamName;

    const emitPayload: TeamNamePayload = {
      leftTeamName: this.leftTeamName,
      rightTeamName: this.rightTeamName,
    };

    this._io.emit(IOEvent.TEAM_NAME, emitPayload);
  }

  onStart() {
    this.dequeueSequence();
    const payload: SequencePayload = {
      nextSequence: this.nextSequence,
      nextNextSequence: this.nextNextSequence,
    };
    this._io.emit(IOEvent.START, payload);
  }

  onBanPick(payload: SequencePayload) {
    const { action, team, index, jobId } = payload;
    const nextSequencePayload = this.nextSequence?.payload;

    if (!jobId) {
      console.error('jobId 누락');
      return;
    }

    if (action == 'opponentPick' && nextSequencePayload?.action == action) {
      this.onOpponentPick(payload);
      return;
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
      this.dequeueSequence();

      if (team == 'left') {
        this.leftSelect = undefined;
      } else {
        this.rightSelect = undefined;
      }

      const emitPayload: SequencePayload = {
        nextSequence: this.nextSequence,
        nextNextSequence: this.nextNextSequence,
        action,
        team,
        index,
        jobId,
      };
      this._io.emit(IOEvent.BAN_PICK, emitPayload);
    }
  }

  onOpponentPick(payload: SequencePayload) {
    const { action, team, jobId } = payload;

    if (this.checkUnPicked(jobId)) {
      if (team == 'left' && !this.leftOpponentPick) {
        this.leftOpponentPick = jobId;
      } else if (team == 'right' && !this.rightOpponentPick) {
        this.rightOpponentPick = jobId;
      } else {
        console.error('잘못된 순서');
        return;
      }

      this.dequeueSequence();

      const emitPayload: SequencePayload = {
        nextSequence: this.nextSequence,
        nextNextSequence: this.nextNextSequence,
        action,
        team,
        jobId,
      };
      this._io.emit(IOEvent.BAN_PICK, emitPayload);
    }
  }

  onEnd = () => {
    if (!this.leftOpponentPick || !this.rightOpponentPick) {
      return;
    }

    // 상대픽이라 반대로
    this.addJob(this.leftOpponentPick, this.rightPickList);
    this.addJob(this.rightOpponentPick, this.leftPickList);

    this.dequeueSequence();
    this._io.emit(IOEvent.END);
  };

  onSelect = (payload: SelectPayload) => {
    this.leftSelect = this.checkUnPicked(payload.leftSelect)
      ? payload.leftSelect
      : this.checkUnPicked(this.leftSelect)
      ? this.leftSelect
      : undefined;
    this.rightSelect = this.checkUnPicked(payload.rightSelect)
      ? payload.rightSelect
      : this.checkUnPicked(this.rightSelect)
      ? this.rightSelect
      : undefined;

    const emitPayload: SelectPayload = {
      leftSelect: this.leftSelect,
      rightSelect: this.rightSelect,
    };

    console.log(emitPayload);
    this._io.emit(IOEvent.SELECT, emitPayload);
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

  private addJob = (jobId: JobId, target: JobId[]) => {
    if (this.checkUnPicked(jobId)) {
      target.push(jobId);
      return true;
    } else {
      console.error('선택할 수 없는 직업');
      return false;
    }
  };

  private checkUnPicked(jobId?: JobId) {
    if (!jobId) return false;

    return this.unPickedList.indexOf(jobId) > -1;
  }
}
