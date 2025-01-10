import { create } from 'zustand';
import { ComplainType } from '../../src/api/complain';

interface Prop {
  reportBoxOnModal: {
    Board: boolean;
    Comment: boolean;
    Reply: boolean;
  };
  targetId: number;
  open: (type: ComplainType, targetId: number) => void;
  close: () => void;
  getType: () => ComplainType;
}

const initState = {
  Board: false,
  Comment: false,
  Reply: false,
};

const useReportBoxModalState = create<Prop>((set, get) => ({
  reportBoxOnModal: initState,
  targetId: 0,
  open: (type, targetId) =>
    set(() => ({ reportBoxOnModal: { ...initState, [type]: true }, targetId })),
  close: () => set(() => ({ reportBoxOnModal: { ...initState }, targetId: 0 })),
  getType: () => {
    const trueKey = Object.entries(get().reportBoxOnModal)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    return trueKey[0] as ComplainType;
  },
}));

export default useReportBoxModalState;
