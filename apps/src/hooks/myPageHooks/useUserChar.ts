import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllMyChar } from "../../api/userInfo";
import {
  getUserCharName,
  getOneCharInfo,
  getAllCharInfo,
  setRepresent,
} from "../../api/userInfo";

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
        await queryClient.refetchQueries("allMyChar");
        await alert("캐릭터 업데이트 완료");
      },
    }
  );

  return { mutate, isLoading };
};

export const useGetAllMyChar = ({ options }: any) => {
  const { data, refetch } = useQuery("allMyChar", () => getAllMyChar(), {
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
      await queryClient.refetchQueries("allMyChar");
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
      await queryClient.refetchQueries("allMyChar");
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
      await queryClient.invalidateQueries("userInfo");
      await queryClient.invalidateQueries("allMyChar");
    },
  });

  return { mutate };
};
