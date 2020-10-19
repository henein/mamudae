import { observable } from 'mobx';
import { RootStore } from '.';
import { Sequence } from '../../common/sequenceQueue';

export class SequenceStore {
  rootStore: RootStore;
  @observable nextSequence?: Sequence;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}
