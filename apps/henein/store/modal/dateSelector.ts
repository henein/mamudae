import { create } from 'zustand';

interface Prop {
  dateSelectorOnModal: boolean;
  open: () => void;
  close: () => void;
}

const useDateSelectorModalState = create<Prop>((set) => ({
  dateSelectorOnModal: false,
  open: () => set(() => ({ dateSelectorOnModal: true })),
  close: () => set(() => ({ dateSelectorOnModal: false })),
}));

export default useDateSelectorModalState;
