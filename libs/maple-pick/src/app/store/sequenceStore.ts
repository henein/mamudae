import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
} from 'mobx';
import { StateStore } from './state-store';
import {
  JobId,
  RoomState,
  Sequence,
  Team,
} from '@henein/mamudae-lib';

export class SequenceStore {
  rootStore: StateStore;


  constructor(rootStore: StateStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    // const key = prompt('접속키를 입력해주세요!');

    // this.init();


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
  // onTeamName(payload: TeamNamePayload) {
  //   this.leftTeamName = payload.leftTeamName;
  //   this.rightTeamName = payload.rightTeamName;
  // }



}
