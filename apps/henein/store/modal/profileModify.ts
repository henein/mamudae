import { create } from 'zustand';

interface Prop {
  profileModifyOnModal: boolean;
  open: () => void;
  close: () => void;
}

const useProfileModifyModalState = create<Prop>((set) => ({
  profileModifyOnModal: false,
  open: () => set(() => ({ profileModifyOnModal: true })),
  close: () => set(() => ({ profileModifyOnModal: false })),
}));

export default useProfileModifyModalState;
