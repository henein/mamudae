import { AxiosError } from 'axios';
import { createElement, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAllMyChar } from '../../api/userInfo';
import {
  getUserCharName,
  getOneCharInfo,
  getAllCharInfo,
  setRepresent,
} from '../../api/userInfo';

interface IGetCharName {
  key: string;
  LoadingController?: any;
  options?: any;
}
export const useGetCharName = ({ key, options }: IGetCharName) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ pastDay, recentDay }: any) => getUserCharName(key, recentDay, pastDay),
    {
      onSuccess: async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        await queryClient.refetchQueries('allMyChar');
        await alert('캐릭터 업데이트 완료');
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 500) {
          alert('API 키 값이 잘못되었습니다.');
        }
      },
    }
  );

  return { mutate, isLoading };
};

export const useGetAllMyChar = ({ options }: any) => {
  const { data, refetch } = useQuery('allMyChar', () => getAllMyChar(), {
    ...options,
  });
  return { data, refetch };
};

export const useRefreshOneChar = ({ charId, options }: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => getOneCharInfo(charId), {
    onSuccess: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      await queryClient.refetchQueries('allMyChar');
    },
  });

  return { mutate, isLoading };
};

export const useRefreshAllChar = ({ idList, options }: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => getAllCharInfo(idList), {
    onSuccess: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      await queryClient.refetchQueries('allMyChar');
    },
  });

  return { mutate, isLoading };
};

interface PickCharType {
  charId: number;
  options: any;
}
export const usePickChar = ({ charId, options }: PickCharType) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => setRepresent(charId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('userInfo');
      await queryClient.invalidateQueries('allMyChar');
    },
  });

  return { mutate };
};

export const useProcessSlider = () => {
  const [infoText, setInfoText] = useState<any>();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const getSlideInfoText = (index: number) => {
    switch (index) {
      case 0:
        const nexonLink = createElement(
          'a',
          {
            href: 'https://openapi.nexon.com/',
            target: '_blank',
            rel: 'noreferrer',
          },
          'NEXON Open API'
        );
        const loginAndMyappText = createElement(
          'span',
          {},
          '에 접속해서 ➊로그인 하고 ➋My 애플리케이션으로 이동해주세요.'
        );
        return createElement('div', {}, [nexonLink, loginAndMyappText]);
      case 1:
        return createElement('span', {}, '애플리케이션 등록하기를 눌러주세요.');
      case 2:
        return createElement('span', {}, '내용을 위와 같이 입력해주세요.');
      case 3:
        return createElement(
          'span',
          {},
          '➊약관 동의를 하고 ➋아래 등록 버튼을 눌러주세요.'
        );
      case 4:
        return createElement(
          'span',
          {},
          '표시된 부분을 눌러서 상세 페이지로 이동해주세요.'
        );
      case 5:
        return createElement(
          'span',
          {},
          '표시된 부분을 눌러서 API Key를 복사해주세요.'
        );
      default:
        return;
    }
  };

  useEffect(() => {
    setInfoText(getSlideInfoText(activeSlideIndex));
  }, [activeSlideIndex]);

  return { infoText, handleSlideChange };
};
