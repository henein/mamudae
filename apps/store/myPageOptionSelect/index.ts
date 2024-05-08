import { create } from 'zustand';

interface Prop {
  option: number;
  setOptionNumber: (optionNumber: number) => void;
}

const useOptionSelectStore = create<Prop>((set) => ({
  option: 1,
  setOptionNumber: (optionNumber) => {
    localStorage.setItem('userPageOptionValue', optionNumber.toString());
    set(() => ({ option: optionNumber }));
  },
}));

export default useOptionSelectStore;
