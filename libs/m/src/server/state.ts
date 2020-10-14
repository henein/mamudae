import { Event, JobId } from '../common/enums';
import { JobList } from '../common/jobs';

export default class State {
  private _teamBanSize: number;
  private _teamPickSize: number;
  private _banIndex = 1;
  private _pickIndex = 1;
  private _nextEvent: Event = Event.START;

  unPickedList: JobId[];
  leftBanList: JobId[] = [];
  rightBanList: JobId[] = [];
  leftPickList: JobId[] = [];
  rightPickList: JobId[] = [];

  constructor(teamBanSize: number, teamPickSize: number) {
    this._teamBanSize = teamBanSize;
    this._teamPickSize = teamPickSize;

    this.unPickedList = JobList.map<JobId>((value) => {
      return value.id;
    });
  }

  removeUnPickedJob(jobId: JobId): boolean {
    const index = this.unPickedList.indexOf(jobId);

    if (index > -1) {
      this.unPickedList.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  onBan(jobId: JobId) {
    if (this._banIndex < this._teamBanSize * 2) {
      throw new Error('이미 밴이 완료되었습니다!');
    }
    if (this.removeUnPickedJob(jobId)) {
      if (this._banIndex % 2) {
        this.leftBanList.push(jobId);
      } else {
        this.rightBanList.push(jobId);
      }
      this._banIndex++;
      return;
    } else {
      throw new Error('선택 할 수 없는 직업입니다!');
    }
  }
}
