import { JobId, Team } from "./enums";

export type Sequence = {
  action: 'start' | 'ban' | 'pick' | 'coinToss' | 'votePick';
  team?: Team;
  index?: number;
};

export type TeamState = {
  name: string;
  pickList: JobId[];
  banList: JobId[];
  votePick?: JobId;
  userId?: string;
}

export type RoomState = {
  sequences: Sequence[];

  leftTeam: TeamState;
  rightTeam: TeamState;

  votedPicks: JobId[];
  votedBan: JobId;

  selected?: JobId;

  coinTossTeam?: Team;
}
