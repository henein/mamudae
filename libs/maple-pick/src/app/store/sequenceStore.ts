import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
} from 'mobx';
import { RootStore } from './index';
import {
  JobId,
  RoomState,
  Sequence,
  Team,
} from '@henein/mamudae-lib';

export class SequenceStore {
  rootStore: RootStore;
  @observable reset = false;
  @observable leftTeamName = '';
  @observable rightTeamName = '';
  @observable sequences = observable.array<Sequence>([]);
  @observable team?: Team;
  @observable auth?:
    | 'leftMember'
    | 'rightMember'
    | 'leftLeader'
    | 'rightLeader';

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    // const key = prompt('접속키를 입력해주세요!');

    // this.init();

  //   this.socket.on(IOEvent.START, (payload: SequencePayload) => {
  //     runInAction(() => {
  //       this.setCurrentSequence(payload.nextSequence);
  //       this.setNextSequence(payload.nextNextSequence);
  //     });
  //     console.log('start');
  //   });

    this.socket.on(IOEvent.BAN_PICK, (payload: SequencePayload) => {
      if (payload.action === 'opponentPick' && payload.jobId && payload.team) {
        rootStore.jobStore.onOpponentPick(payload.jobId, payload.team);
      } else {
        rootStore.jobStore.moveJob(payload, //jobId);
      }

      runInAction(() => {
        this.setCurrentSequence(payload.nextSequence);
        this.setNextSequence(payload.nextNextSequence);
      });
    });

    this.socket.on(IOEvent.SELECT, (payload: SelectPayload) => {
      this.rootStore.jobStore.onSelect(payload.leftSelect, payload.rightSelect);
    });

    this.socket.on(IOEvent.END, () => {
      this.rootStore.jobStore.onEnd();
      runInAction(() => {
        this.setCurrentSequence(undefined);
        this.setNextSequence(undefined);
      });
    });
  }

  @computed
  get currentSequence() {
    return this.sequences?.[0];
  }

  @computed
  get nextSequence() {
    return this.sequences?.[1];
  }

  // @action
  // init() {
  //   this.socket.on(IOEvent.INIT, (data: InitPayload) => {
  //     runInAction(() => {
  //       this.leftTeamName = data.leftTeamName;
  //       this.rightTeamName = data.rightTeamName;

  //       this.auth = data.auth;
  //       switch (this.auth) {
  //         case 'leftMember':
  //           alert(`${this.leftTeamName} 멤버입니다!`);
  //           break;
  //         case 'rightMember':
  //           alert(`${this.rightTeamName} 멤버입니다!`);
  //           break;
  //         case 'leftLeader':
  //           alert(`${this.leftTeamName} 팀장입니다!`);
  //           break;
  //         case 'rightLeader':
  //           alert(`${this.rightTeamName} 팀장입니다!`);
  //           break;
  //         default:
  //           alert('관전자입니다! 블라인드가 적용되지 않습니다!');
  //       }

  //       this.rootStore.jobStore.initList(
  //         data.unPickedList,
  //         data.leftBanList,
  //         data.rightBanList,
  //         data.leftPickList,
  //         data.rightPickList,
  //         data.leftOpponentPick,
  //         data.rightOpponentPick,
  //         data.leftSelect,
  //         data.rightSelect
  //       );
  //       this.setCurrentSequence(data.nextSequence);
  //       this.setNextSequence(data.nextNextSequence);
  //       this.onReset();
  //     });
  //   });
  // }

  // @action
  // onReset() {
  //   this.reset = !this.reset;
  // }

  // @action
  // onTeamName(payload: TeamNamePayload) {
  //   this.leftTeamName = payload.leftTeamName;
  //   this.rightTeamName = payload.rightTeamName;
  // }

  @action
  updateRoomState(roomState: RoomState, team?: Team) {
    this.leftTeamName = roomState.leftTeam.name;
    this.rightTeamName = roomState.rightTeam.name;
    this.sequences.replace(roomState.sequences);
    this.team = team ?? this.team;
  }

  @action
  emitSelect(value: JobId) {
    // if (this.rootStore.sequenceStore.auth === 'leftLeader') {
    //   const payload: SelectPayload = { leftSelect: value };
    //   this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    // } else if (this.rootStore.sequenceStore.auth === 'rightLeader') {
    //   const payload: SelectPayload = { rightSelect: value };
    //   this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    // }
  }

  @action
  emitBanPick() {
    // const nextPayload = this.currentSequence?.payload;

    // const payload: SequencePayload = {
    //   action: nextPayload?.action,
    //   team: this.team,
    //   index: nextPayload?.index,
    //   jobId: this.rootStore.jobStore.teamSelect,
    // };
    // this.socket.emit(IOEvent.BAN_PICK, payload);
  }
}
