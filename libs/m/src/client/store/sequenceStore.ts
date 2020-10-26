import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';
import { InitPayload, IOEvent } from '../../common/events';
import { Sequence } from '../../common/sequenceQueue';

export class SequenceStore {
  rootStore: RootStore;
  @observable reset = false;
  @observable nextSequence?: Sequence;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action
  init(socket: SocketIOClient.Socket) {
    socket.on(IOEvent.INIT, (data: InitPayload) => {
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
  onReset() {
    this.reset = !this.reset;
  }

  @action
  setNextSequence(sequence?: Sequence) {
    this.nextSequence = sequence;
  }
}
