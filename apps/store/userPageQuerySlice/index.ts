import { create } from 'zustand';

interface Prop {
  queries: Queries;
  setQueries: (newQueries: Queries) => void;
}
interface Queries {
  page: number;
  nickname: string;
}

const useUserPageQueryStore = create<Prop>((set) => ({
  queries: {
    page: 1,
    nickname: '',
  },
  setQueries: (newQueries) => set(() => ({ queries: newQueries })),
}));

export default useUserPageQueryStore;
