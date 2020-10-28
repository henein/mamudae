import { JobId } from './enums';
import { Sequence } from './sequenceQueue';

export enum IOEvent {
  INIT = 'init',
  SET_LEFT_LEADER = 'setLeftLeader',
  SET_RIGHT_LEADER = 'setRightLeader',
  START = 'start',
  BAN_PICK = 'ban_pick',
  END = 'end',
  RESET = 'reset',
}

export interface InitPayload {
  nextSequence?: Sequence;
  unPickedList: JobId[];
  leftBanList: JobId[];
  rightBanList: JobId[];
  leftPickList: JobId[];
  rightPickList: JobId[];
}

export interface SequencePayload {
  nextSequence?: Sequence;
  nextNextSequence?: Sequence;
  action?: 'ban' | 'pick' | 'opponentPick';
  team?: 'left' | 'right';
  index?: number;
  jobId?: JobId;
}
