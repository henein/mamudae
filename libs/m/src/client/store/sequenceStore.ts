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

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.socket = io({
      reconnectionDelayMax: 10000,
      query: {
        auth: '123',
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
        this.setNextSequence(data.nextSequence);
        this.rootStore.jobStore.initList(
          data.unPickedList,
          data.leftBanList,
          data.rightBanList,
          data.leftPickList,
          data.rightPickList
        );
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
    console.log(payload);
    this.socket.emit(IOEvent.BAN_PICK, payload);
  }

  @action
  onReset() {
    this.reset = !this.reset;
  }

  @action
  setNextSequence(sequence?: Sequence) {
    this.nextSequence = sequence;
  }
}
