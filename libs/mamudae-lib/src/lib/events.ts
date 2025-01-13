// import { JobId } from './enums';
// import { Sequence } from './sequenceQueue';

// export interface InitPayload {
//   nextSequence?: Sequence;
//   nextNextSequence?: Sequence;
//   leftTeamName: string;
//   rightTeamName: string;
//   unPickedList: JobId[];
//   leftBanList: JobId[];
//   rightBanList: JobId[];
//   leftPickList: JobId[];
//   rightPickList: JobId[];
//   leftVotePick?: JobId;
//   rightVotePick?: JobId;
//   leftSelect?: JobId;
//   rightSelect?: JobId;
//   votePicks: JobId[];
//   voteBan: JobId;
// }

// export interface SequencePayload {
//   nextSequence?: Sequence;
//   nextNextSequence?: Sequence;
//   action?: 'ban' | 'pick' | 'opponentPick';
//   team?: 'left' | 'right';
//   index?: number;
//   jobId?: JobId;
//   opponentJobId?: { left: JobId; right: JobId };
// }


