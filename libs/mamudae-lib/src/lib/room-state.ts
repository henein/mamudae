import { JobId, Team } from "./enums";

export type Sequence = {
  action: 'start' | 'ban' | 'pick' | 'votePick' | 'end';
  team?: Team;
  index?: number;
};

export type TeamState = {
  name: string;
  pickList: JobId[];
  banList: JobId[];
  votePick?: JobId;
  select?: JobId;
}

export type RoomState = {
  sequences: Sequence[];

  leftTeam: TeamState;
  rightTeam: TeamState;

  votedPicks: JobId[];
  votedBan: JobId;
}
