import { Team } from "../enums"
import { RoomState } from "../room-state";

export type WelcomeEvent = {
  team: Team;
  state: RoomState;
}

export type ServerEventMap = {
  welcome: WelcomeEvent;
}
