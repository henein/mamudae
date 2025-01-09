import { create } from 'zustand';

interface Prop {
  nexonProcessOnModal: boolean;
  open: () => void;
  close: () => void;
}

const useNexonProccessModalState = create<Prop>((set) => ({
  nexonProcessOnModal: false,
  open: () => set(() => ({ nexonProcessOnModal: true })),
  close: () => set(() => ({ nexonProcessOnModal: false })),
}));

export default useNexonProccessModalState;
