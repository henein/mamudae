import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllMyChar } from "../../api/userInfo";
import { getUserCharName, getCharInfo, setRepresent } from "../../api/userInfo";

interface IGetCharName {
  key: string;
  LoadingController?: any;
  options?: any;
}
export const useGetCharName = ({
  key,
  LoadingController,
  options,
}: IGetCharName) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => getUserCharName(key), {
    onSuccess: async () => {
      await LoadingController(true);
      await alert(
        "사용자의 큐브 내역을 통해 캐릭터 닉네임을 조회합니다. (30초 정도 소요)"
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 30000);
      });
      await alert("캐릭터 닉네임 업데이트 완료");
      await queryClient.invalidateQueries("allMyChar");
      await LoadingController(false);
    },
  });

  return { mutate };
};

export const useGetAllMyChar = ({ options }: any) => {
  const { data, refetch } = useQuery("allMyChar", () => getAllMyChar(), {
    ...options,
  });
  return { data, refetch };
};

export const useRefreshChar = ({ name, LoadingController, options }: any) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => getCharInfo(name), {
    onSuccess: async () => {
      await LoadingController(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      await alert(`${name} 업데이트 완료`);
      await queryClient.invalidateQueries("allMyChar");
      await LoadingController(false);
    },
  });

  return { mutate };
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
