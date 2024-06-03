import { create } from 'zustand';

interface Prop {
  token: string;
  isSuccess: boolean;
  setCaptchaToken: (token: string) => void;
  initToken: () => void;
  setSuccess: () => void;
  setFail: () => void;
}

const useRecaptchaTokenStore = create<Prop>((set) => ({
  token: '',
  isSuccess: false,
  setCaptchaToken: (token: string) => set(() => ({ token: token })),
  initToken: () => set(() => ({ token: '' })),
  setSuccess: () => set(() => ({ isSuccess: true })),
  setFail: () => set(() => ({ isSuccess: false })),
}));

export default useRecaptchaTokenStore;
