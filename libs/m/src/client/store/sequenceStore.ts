import { action, makeObservable, observable, runInAction } from 'mobx';
import io from 'socket.io-client';
import { RootStore } from '.';
import { JobId } from '../../common/enums';
import { InitPayload, IOEvent } from '../../common/events';
import { Sequence } from '../../common/sequenceQueue';
import { SequencePayload } from './../../common/events';

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
      this.setNextSequence(payload.nextSequence);
      rootStore.jobStore.moveJob(payload);
    });
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

        this.rootStore.jobStore.initList(
          data.unPickedList,
          data.leftBanList,
          data.rightBanList,
          data.leftPickList,
          data.rightPickList
        );
        this.setNextSequence(data.nextSequence);
      });
    });
  }

  @action
  banPick(jobId: JobId) {
    const nextPayload = this.nextSequence?.payload;
    const payload: SequencePayload = {
      action: nextPayload?.action,
      team: nextPayload?.team,
      index: nextPayload?.index,
      jobId,
    };
    this.socket.emit(IOEvent.BAN_PICK, payload);
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
    } else {
      this.rootStore.jobStore.isModalEnabled = false;
    }
  }
}
