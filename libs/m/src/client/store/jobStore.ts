import { action, observable } from 'mobx';
import { JobId } from '../../common/enums';
import { RootStore } from './index';

enum Job {
  '초보자',
  '히어로',
}

export class JobStore {
  rootStore: RootStore;
  @observable unPickedList: JobId[] = [];
  @observable leftBanList: JobId[] = [];
  @observable rightBanList: JobId[] = [];
  @observable leftPickList: JobId[] = [];
  @observable rightPickList: JobId[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  initList(
    unPickedList: JobId[],
    leftBanList: JobId[],
    rightBanList: JobId[],
    leftPickList: JobId[],
    rightPickList: JobId[]
  ) {
    this.unPickedList = unPickedList;
    this.leftBanList = leftBanList;
    this.rightBanList = rightBanList;
    this.leftPickList = leftPickList;
    this.rightPickList = rightPickList;
  }
}
