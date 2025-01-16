import { JobId, Team } from './enums';
import { RoomState } from "./room-state";

export interface ServerToClientEvents {
  welcome: (state?: RoomState, error?: string) => void;
  update: (state: RoomState) => void;
}

export interface ClientToServerEvents {
  select: (jobId: JobId) => void;
  push: (jobId: JobId) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  nickname: string;
  roomId: string;
  team: Team;
}
