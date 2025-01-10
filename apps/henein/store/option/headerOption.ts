import { create } from 'zustand';

interface Prop {
  option: number;
  setOptionNumber: (optionNumber: number) => void;
}

const useHeaderOption = create<Prop>((set) => ({
  option: 0,
  setOptionNumber: (optionNumber) => {
    localStorage.setItem('userPageOptionValue', optionNumber.toString());
    set(() => ({ option: optionNumber }));
  },
}));

export default useHeaderOption;
