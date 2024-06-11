import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Prop {
  userInfo: userInfoType;
  setUserInfo: (newUserInfo: userInfoType) => void;
  init: () => void;
}

interface userInfoType {
  userName: string;
  userRole: string;
}
const initState = {
  userName: '',
  userRole: '',
};

const useUserInfoStore = create(
  persist<Prop>(
    (set) => ({
      userInfo: initState,
      setUserInfo: (newUserInfo) => set(() => ({ userInfo: newUserInfo })),
      init: () => set(() => ({ userInfo: initState })),
    }),
    {
      name: 'userInfoStore',
    }
  )
);

export default useUserInfoStore;
