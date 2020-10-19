import { JobId } from './enums';
import { Sequence } from './sequenceQueue';

export enum IOEvent {
  INIT = 'init',
  SET_LEFT_LEADER = 'setLeftLeader',
  SET_RIGHT_LEADER = 'setRightLeader',
  START = 'start',
  BAN = 'ban',
  PICK = 'pick',
  END = 'end',
}

export interface InitPayload {
  nextSequence: Sequence;
  unPickedList: JobId[];
  leftBanList: JobId[];
  rightBanList: JobId[];
  leftPickList: JobId[];
  rightPickList: JobId[];
}

export interface SequencePayload {
  team: 'Left' | 'Right';
  index: number;
  jobId?: JobId;
}
