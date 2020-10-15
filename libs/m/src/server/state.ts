import { Event, JobId } from '../common/enums';
import { JobList } from '../common/jobs';
import SequenceQueue, { Sequence } from './sequenceQueue';

export default class State {
  sequenceQueue: SequenceQueue;
  nextSequence?: Sequence;

  unPickedList: JobId[];
  leftBanList: JobId[] = [];
  rightBanList: JobId[] = [];
  leftPickList: JobId[] = [];
  rightPickList: JobId[] = [];

  constructor() {
    this.sequenceQueue = new SequenceQueue();
    this.nextSequence = this.sequenceQueue.dequeue();
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
}
