import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import io from 'socket.io-client';
import { RootStore } from '.';
import { JobId } from '../../common/enums';
import { InitPayload, IOEvent } from '../../common/events';
import { Sequence } from '../../common/sequenceQueue';
import { SequencePayload, SelectPayload } from './../../common/events';

export class SequenceStore {
  rootStore: RootStore;
  socket: SocketIOClient.Socket;
  @observable reset = false;
  @observable nextSequence?: Sequence;
  @observable auth?:
    | 'leftMember'
    | 'rightMember'
    | 'leftLeader'
    | 'rightLeader';

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    const key = prompt('접속키를 입력해주세요!');

    this.socket = io({
      reconnectionDelayMax: 10000,
      query: {
        key: key,
      },
    });

    this.init();

    this.socket.on(IOEvent.START, (payload: SequencePayload) => {
      this.setNextSequence(payload.nextSequence);
      console.log('start');
    });

    this.socket.on(IOEvent.RESET, () => {
      this.socket.emit(IOEvent.INIT);
      console.log('reset');
    });

    this.socket.on(IOEvent.BAN_PICK, (payload: SequencePayload) => {
      if (payload.action == 'opponentPick' && payload.jobId && payload.team) {
        rootStore.jobStore.onOpponentPick(payload.jobId, payload.team);
      } else {
        rootStore.jobStore.moveJob(payload);
      }

      this.setNextSequence(payload.nextSequence);
    });

    this.socket.on(IOEvent.SELECT, (payload: SelectPayload) => {
      this.rootStore.jobStore.onSelect(payload.leftSelect, payload.rightSelect);
    });

    this.socket.on(IOEvent.END, () => {
      this.rootStore.jobStore.onEnd();
    });
  }

  @computed
  get team() {
    switch (this.auth) {
      case 'leftLeader':
      case 'leftMember':
        return 'left';
      case 'rightLeader':
      case 'rightMember':
        return 'right';
      default:
        return;
    }
  }

  @action
  init() {
    this.socket.on(IOEvent.INIT, (data: InitPayload) => {
      runInAction(() => {
        this.onReset();
        this.auth = data.auth;

        switch (this.auth) {
          case 'leftMember':
            alert('나초팀 멤버입니다!');
            break;
          case 'rightMember':
            alert('금앙팀 멤버입니다!');
            break;
          case 'leftLeader':
            alert('나초팀 팀장입니다!');
            break;
          case 'rightLeader':
            alert('금앙팀 팀장입니다!');
            break;
          default:
            alert('관전자입니다! 블라인드가 적용되지 않습니다!');
        }
        console.log(data.leftSelect + '+' + data.rightSelect);
        this.rootStore.jobStore.initList(
          data.unPickedList,
          data.leftBanList,
          data.rightBanList,
          data.leftPickList,
          data.rightPickList,
          data.leftOpponentPick,
          data.rightOpponentPick,
          data.leftSelect,
          data.rightSelect
        );
        this.setNextSequence(data.nextSequence);
      });
    });
  }

  @action
  onReset() {
    this.reset = !this.reset;
  }

  @action
  setNextSequence(sequence?: Sequence) {
    this.nextSequence = sequence;
    if (sequence?.payload?.team == 'left' && this.auth == 'leftLeader') {
      this.rootStore.jobStore.isModalEnabled = true;
    } else if (
      sequence?.payload?.team == 'right' &&
      this.auth == 'rightLeader'
    ) {
      this.rootStore.jobStore.isModalEnabled = true;
    } else if (
      sequence?.payload?.action == 'opponentPick' &&
      (this.auth == 'leftLeader' || this.auth == 'rightLeader')
    ) {
      this.rootStore.jobStore.isModalEnabled = true;
    } else {
      this.rootStore.jobStore.isModalEnabled = false;
    }
  }

  @action
  emitSelect(value: JobId) {
    if (this.rootStore.sequenceStore.auth == 'leftLeader') {
      const payload: SelectPayload = { leftSelect: value };
      this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    } else if (this.rootStore.sequenceStore.auth == 'rightLeader') {
      const payload: SelectPayload = { rightSelect: value };
      this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    }
  }

  @action
  emitBanPick() {
    const nextPayload = this.nextSequence?.payload;

    const payload: SequencePayload = {
      action: nextPayload?.action,
      team: this.team,
      index: nextPayload?.index,
      jobId: this.rootStore.jobStore.teamSelect,
    };
    this.socket.emit(IOEvent.BAN_PICK, payload);
  }
}
