import { create } from 'zustand';
import { WarningType } from './boardWarning';

interface Prop {
  commentWarningOnModal: {
    modify: boolean;
    delete: boolean;
  };
  open: (type: WarningType) => void;
  close: () => void;
  getType: () => WarningType;
}

const initState = {
  modify: false,
  delete: false,
};
const useCommentWarningModalState = create<Prop>((set, get) => ({
  commentWarningOnModal: initState,
  open: (type) =>
    set(() => ({
      commentWarningOnModal: {
        ...initState,
        [type]: true,
      },
    })),
  close: () =>
    set(() => ({
      commentWarningOnModal: { ...initState },
    })),
  getType: () => {
    const trueKey = Object.entries(get().commentWarningOnModal)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    return trueKey[0] as WarningType;
  },
}));

export default useCommentWarningModalState;
