import { action, computed, makeObservable, observable } from 'mobx';
import { JobId } from '../../common/enums';
import { SequencePayload } from '../../common/events';
import { Job, jobList } from '../../common/jobs';
import { RootStore } from './index';

export class JobStore {
  rootStore: RootStore;
  @observable unPickedList: JobId[] = [];
  @observable leftBanList: JobId[] = [];
  @observable rightBanList: JobId[] = [];
  @observable leftPickList: JobId[] = [];
  @observable rightPickList: JobId[] = [];
  @observable selectedJob?: JobId | 0;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action
  initList = (
    unPickedList: JobId[],
    leftBanList: JobId[],
    rightBanList: JobId[],
    leftPickList: JobId[],
    rightPickList: JobId[]
  ) => {
    this.unPickedList = unPickedList;
    this.leftBanList = leftBanList;
    this.rightBanList = rightBanList;
    this.leftPickList = leftPickList;
    this.rightPickList = rightPickList;
    console.log(unPickedList);
  };

  @action // index 추가 검사
  moveJob = (payload: SequencePayload): boolean => {
    const { action, team, jobId } = payload;
    const fromIndex = this.unPickedList.indexOf(jobId ?? -1);
    const targetList =
      action == 'ban'
        ? team == 'left'
          ? this.leftBanList
          : this.rightBanList
        : team == 'left'
        ? this.leftPickList
        : this.rightPickList;

    if (fromIndex != -1) {
      targetList.push(this.unPickedList.splice(fromIndex, 1)[0]);
      return true;
    } else {
      console.error('선택할 수 없는 직업'); // 리셋해야 함
      return false;
    }
  };

  // undefined: 없음
  // 0: 선택됨 -> 애니메이션 출력
  @action
  setSelectedJob(value?: JobId | 0) {
    this.selectedJob = value;
  }

  @computed
  get disableList() {
    return jobList.reduce<JobId[]>((previousValue, currentValue) => {
      if (this.unPickedList.indexOf(currentValue.id) == -1) {
        previousValue.push(currentValue.id);
      }
      return previousValue;
    }, []);
  }
}
