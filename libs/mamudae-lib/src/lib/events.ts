import { JobId } from './enums';
import { Sequence } from './sequenceQueue';

export enum IOEvent {
  LOGIN = 'login',
  INIT = 'init',
  TEAM_NAME = 'team_name',
  SELECT = 'select',
  START = 'start',
  BAN_PICK = 'ban_pick',
  END = 'end',
  RESET = 'reset',
}

export interface InitPayload {
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
  auth?: 'leftMember' | 'rightMember' | 'leftLeader' | 'rightLeader';
  leftSelect?: JobId;
  rightSelect?: JobId;
}

export interface TeamNamePayload {
  leftTeamName: string;
  rightTeamName: string;
}

export interface SelectPayload {
  leftSelect?: JobId;
  rightSelect?: JobId;
}

export interface SequencePayload {
  nextSequence?: Sequence;
  nextNextSequence?: Sequence;
  action?: 'ban' | 'pick' | 'opponentPick';
  team?: 'left' | 'right';
  index?: number;
  jobId?: JobId;
  opponentJobId?: { left: JobId; right: JobId };
}
