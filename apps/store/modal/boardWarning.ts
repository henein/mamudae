import { create } from 'zustand';

interface Prop {
  boardWarningOnModal: {
    modify: boolean;
    delete: boolean;
  };
  open: (type: WarningType) => void;
  close: () => void;
  getType: () => WarningType;
}
export type WarningType = 'modify' | 'delete';

const useBoardWarningModalState = create<Prop>((set, get) => ({
  boardWarningOnModal: {
    modify: false,
    delete: false,
  },
  open: (type) =>
    set(() => ({
      boardWarningOnModal: {
        modify: false,
        delete: false,
        [type]: true,
      },
    })),
  close: () =>
    set(() => ({
      boardWarningOnModal: { modify: false, delete: false, report: false },
    })),
  getType: () => {
    const trueKey = Object.entries(get().boardWarningOnModal)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    return trueKey[0] as WarningType;
  },
}));

export default useBoardWarningModalState;
