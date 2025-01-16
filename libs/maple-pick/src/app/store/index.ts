import { JobStore } from './jobStore';
import { SequenceStore } from './sequenceStore';

export class RootStore {
  jobStore: JobStore;
  sequenceStore: SequenceStore;

  constructor() {
    this.jobStore = new JobStore(this);
    this.sequenceStore = new SequenceStore(this);
  }
}

export const store = new RootStore();
