import { create } from 'zustand';

interface Prop {
  token: string;
  onCaptchaModal: boolean;
  setCaptchaToken: (token: string) => void;
  initToken: () => void;
  open: () => void;
  close: () => void;
}

const useRecaptchaTokenStore = create<Prop>((set) => ({
  token: '',
  onCaptchaModal: false,
  setCaptchaToken: (token: string) => set(() => ({ token: token })),
  initToken: () => set(() => ({ token: '' })),
  open: () => set(() => ({ onCaptchaModal: true })),
  close: () => set(() => ({ onCaptchaModal: false })),
}));

export default useRecaptchaTokenStore;
