import { create } from 'zustand';

export type ReportType = 'board' | 'comment' | 'recomment';
interface Prop {
  reportBoxOnModal: {
    board: boolean;
    comment: boolean;
    recomment: boolean;
  };
  open: (type: ReportType) => void;
  close: () => void;
  getType: () => ReportType;
}

const initState = {
  board: false,
  comment: false,
  recomment: false,
};

const useReportBoxModalState = create<Prop>((set, get) => ({
  reportBoxOnModal: initState,
  open: (type) =>
    set(() => ({ reportBoxOnModal: { ...initState, [type]: true } })),
  close: () => set(() => ({ reportBoxOnModal: { ...initState } })),
  getType: () => {
    const trueKey = Object.entries(get().reportBoxOnModal)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    return trueKey[0] as ReportType;
  },
}));

export default useReportBoxModalState;
