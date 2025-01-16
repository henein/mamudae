import { JobId, JobList, RoomState, Sequence, Team } from '@henein/mamudae-lib';
import { action, autorun, computed, makeObservable, observable } from 'mobx';

export class StateStore {
  @observable reset = false;
  @observable team?: Team;

  @observable roomState: RoomState = {
    sequences: [],
    leftTeam: {
      name: 'A',
      pickList: [],
      banList: [],
    },
    rightTeam: {
      name: 'B',
      pickList: [],
      banList: [],
    },
    votedPicks: [JobId.NULL, JobId.NULL],
    votedBan: JobId.NULL,
  };

  onSelect?: (jobId: JobId) => void;

  onPush?: (jobId: JobId) => void;

  @computed
  get currentSequence() {
    return this.roomState.sequences[0];
  }

  @computed
  get nextSequence() {
    return this.roomState.sequences[1];
  }

  @computed
  get unPickedList() {
    if (this.currentSequence?.action === 'votePick') {
      return this.roomState.votedPicks;
    }

    return JobList.reduce<JobId[]>((previousValue, currentValue) => {
      const leftTeam = this.roomState.leftTeam;
      const rightTeam = this.roomState.rightTeam;

      if (leftTeam.banList.includes(currentValue.id))
        return previousValue;

      if (rightTeam.banList.includes(currentValue.id))
        return previousValue;

      if (leftTeam.pickList.includes(currentValue.id))
        return previousValue;

      if (rightTeam.pickList.includes(currentValue.id))
        return previousValue;

      if (this.roomState.votedPicks.includes(currentValue.id))
        return previousValue;

      if (this.roomState.votedBan === currentValue.id)
        return previousValue;

      previousValue.push(currentValue.id);
      return previousValue;
    }, []);
  }

  @computed get isMyTurn() {
    const action = this.currentSequence?.action;

    if (action == 'pick' || action == 'ban') {
      return this.currentSequence?.team === this.team;
    } else if (action == 'votePick') {
      return this.roomState.coinTossTeam === this.team;
    }

    return false;
  }

  @action
  runReset() {
    this.reset = !this.reset;
  }

  @action
  updateState(roomState: RoomState, team?: Team) {
    this.roomState = roomState;
    this.team = team ?? this.team;
  }

  @computed
  get disableList() {
    return JobList.reduce<JobId[]>((previousValue, currentValue) => {
      if (this.unPickedList.indexOf(currentValue.id) === -1) {
        previousValue.push(currentValue.id);
      }
      return previousValue;
    }, []);
  }

  private checkUnPicked(jobId?: JobId) {
    if (!jobId) return false;

    return this.unPickedList.indexOf(jobId) > -1;
  }

  constructor() {
    makeObservable(this);

    autorun(() => {
      console.log(this.currentSequence);
    });
  }
}

export const store = new StateStore();
