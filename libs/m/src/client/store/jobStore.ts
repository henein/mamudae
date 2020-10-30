import { action, computed, makeObservable, observable } from 'mobx';
import { JobId } from '../../common/enums';
import { IOEvent, SelectPayload, SequencePayload } from '../../common/events';
import { jobList } from '../../common/jobs';
import { RootStore } from './index';

export class JobStore {
  rootStore: RootStore;
  @observable unPickedList: JobId[] = [];
  @observable leftBanList: JobId[] = [];
  @observable rightBanList: JobId[] = [];
  @observable leftPickList: JobId[] = [];
  @observable rightPickList: JobId[] = [];
  @observable leftSelect?: JobId | 0;
  @observable rightSelect?: JobId | 0;
  @observable isModalEnabled = false;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  // undefined: 없음
  // 0: 선택됨 -> 애니메이션 출력
  @computed get selectJobId() {
    console.log('sel');
    const nextSequence = this.rootStore.sequenceStore.nextSequence;

    console.log(this.leftSelect + ' + ' + this.rightSelect);

    if (nextSequence?.payload?.team == 'left') {
      return this.leftSelect;
    } else {
      return this.rightSelect;
    }
  }

  @action
  initList = (
    unPickedList: JobId[],
    leftBanList: JobId[],
    rightBanList: JobId[],
    leftPickList: JobId[],
    rightPickList: JobId[],
    leftSelect?: JobId,
    rightSelect?: JobId
  ) => {
    this.unPickedList = unPickedList;
    this.leftBanList = leftBanList;
    this.rightBanList = rightBanList;
    this.leftPickList = leftPickList;
    this.rightPickList = rightPickList;
    this.leftSelect = leftSelect;
    this.rightSelect = rightSelect;
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

    if (team == 'left') {
      this.leftSelect = 0;
    } else {
      this.rightSelect = 0;
    }

    if (fromIndex != -1) {
      targetList.push(this.unPickedList.splice(fromIndex, 1)[0]);
      return true;
    } else {
      console.error('선택할 수 없는 직업'); // 리셋해야 함
      return false;
    }
  };

  @action
  onSelect(leftSelect?: JobId, rightSelect?: JobId) {
    this.leftSelect = leftSelect;
    this.rightSelect = rightSelect;
  }

  @action
  setSelectedJob(value: JobId) {
    if (this.rootStore.sequenceStore.auth == 'leftLeader') {
      const payload: SelectPayload = { leftSelect: value };
      this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    } else if (this.rootStore.sequenceStore.auth == 'rightLeader') {
      const payload: SelectPayload = { rightSelect: value };
      this.rootStore.sequenceStore.socket.emit(IOEvent.SELECT, payload);
    }
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
