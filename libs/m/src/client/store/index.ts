import { JobStore } from './jobStore';

export class RootStore {
  jobStore: JobStore;

  constructor() {
    this.jobStore = new JobStore(this);
  }
}

export const store = new RootStore();
