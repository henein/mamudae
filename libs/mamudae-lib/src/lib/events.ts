import { Team } from "./enums";
import { RoomState } from "./room-state";

export interface ServerToClientEvents {
  update: (state: RoomState) => void;
}

export interface ClientToServerEvents {
  join: (roomId: string, team: Team, callback: (state: RoomState, error?: string) => void) => void;
  select: (jobId: string) => void;
  ban: (jobId: string) => void;
  pick: (jobId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  nickname: string;
  team: Team;
}
