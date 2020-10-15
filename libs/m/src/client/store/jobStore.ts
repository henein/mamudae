import { observable } from 'mobx';
import { RootStore } from './index';

enum Job {
  '초보자',
  '히어로',
}

export class JobStore {
  rootStore: RootStore;
  @observable left: Job[];
  @observable right: Job[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.left = [];
    this.right = [];
  }
}
