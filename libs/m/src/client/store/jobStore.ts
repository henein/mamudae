import { action, computed, makeObservable, observable } from 'mobx';
import { JobId } from '../../common/enums';
import { SequencePayload } from '../../common/events';
import { jobList } from '../../common/jobs';
import { RootStore } from './index';

export class JobStore {
  rootStore: RootStore;
  @observable unPickedList: JobId[] = [];
  @observable leftBanList: JobId[] = [];
  @observable rightBanList: JobId[] = [];
  @observable leftPickList: JobId[] = [];
  @observable rightPickList: JobId[] = [];
  @observable leftOpponentPick?: JobId;
  @observable rightOpponentPick?: JobId;
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
    const nextSequence = this.rootStore.sequenceStore.currentSequence;

    if (nextSequence?.payload?.team == 'left') {
      return this.leftSelect;
    } else if (nextSequence?.payload?.team == 'right') {
      return this.rightSelect;
    }
  }

  @computed
  get teamSelect() {
    if (this.rootStore.sequenceStore.team == 'left') {
      return this.leftSelect;
    } else if (this.rootStore.sequenceStore.team == 'right') {
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
    leftOpponentPick?: JobId,
    rightOpponentPick?: JobId,
    leftSelect?: JobId,
    rightSelect?: JobId
  ) => {
    this.unPickedList = unPickedList;
    this.leftBanList = leftBanList;
    this.rightBanList = rightBanList;
    this.leftPickList = leftPickList;
    this.rightPickList = rightPickList;
    this.leftOpponentPick = leftOpponentPick;
    this.rightOpponentPick = rightOpponentPick;
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
    } else if (team == 'right') {
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
  addJob = (jobId: JobId, target: JobId[]) => {
    if (this.checkUnPicked(jobId)) {
      target.push(jobId);
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
  onOpponentPick = (jobId: JobId, team: 'left' | 'right') => {
    if (team == 'left') {
      this.leftOpponentPick = jobId;
    } else if (team == 'right') {
      this.rightOpponentPick = jobId;
    }
  };

  @action
  onEnd = () => {
    if (!this.leftOpponentPick || !this.rightOpponentPick) {
      return;
    }

    this.leftPickList.push(this.rightOpponentPick);
    this.rightPickList.push(this.leftOpponentPick);
  };

  @computed
  get disableList() {
    return jobList.reduce<JobId[]>((previousValue, currentValue) => {
      if (this.unPickedList.indexOf(currentValue.id) == -1) {
        previousValue.push(currentValue.id);
      }
      return previousValue;
    }, []);
  }

  private checkUnPicked(jobId?: JobId) {
    if (!jobId) return false;

    return this.unPickedList.indexOf(jobId) > -1;
  }
}
