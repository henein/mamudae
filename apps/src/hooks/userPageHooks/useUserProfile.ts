import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useProfileModifyModalState from '../../../store/modal/profileModify';
import { getProfile, setUserProfile } from '../../api/userInfo';

export const useGetMyProfile = () => {
  const { data } = useQuery('myProfile', () => getProfile(), {
    refetchOnWindowFocus: false,
  });
  return { ...data };
};

interface ISetUserInfo {
  forms: {
    image: File | null;
    userName: string | null;
  };
  options?: any;
}

export const useProfileModifyMutation = ({ forms, options }: ISetUserInfo) => {
  const router = useRouter();
  const quertClient = useQueryClient();
  const { close } = useProfileModifyModalState();

  const { mutate } = useMutation(() => setUserProfile({ forms }), {
    ...options,
    onSuccess: () => {
      alert('프로필 변경이 완료되었습니다.');
      quertClient.refetchQueries('myProfile');
      quertClient.refetchQueries('userInfo');
      close();
      router.push(`/user/${forms.userName}`);
    },
    onError: (err: any) => {
      alert(err.response.data.errorMessage);
    },
  });

  return { mutate };
};

export const useSetProfileModifyData = () => {
  const [userForm, setUserForm] = useState<{
    image: File | null;
    userName: string | null;
  }>({ image: null, userName: '' });
  const [src, setSrc] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (src || nickname) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setUserForm({ ...userForm, userName: nickname });
  }, [src, nickname]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setUserForm({ ...userForm, image: selectedImage });
      setSrc(URL.createObjectURL(selectedImage));
    }
  };

  return { userForm, src, isDisabled, setNickname, handleImageUpload };
};
