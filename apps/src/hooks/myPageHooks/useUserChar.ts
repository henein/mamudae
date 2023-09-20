import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllMyChar } from "../../api/userInfo";
import { getUserCharName, getCharInfo, setRepresent } from "../../api/userInfo";

interface IGetCharName {
  key: string;
  options?: any;
}
export const useGetCharName = ({ key, options }: IGetCharName) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => getUserCharName(key), {
    onSuccess: async () => {
      await alert(
        "사용자의 큐브 내역을 통해 캐릭터 닉네임을 조회합니다. (30초 정도 소요)"
      );
      await setTimeout(() => alert("캐릭터 닉네임 업데이트 완료"), 30000); // onSuccess 시에 allMyChar 갱신
      await queryClient.invalidateQueries("allMyChar");
    },
  });

  return { mutate };
};

export const useGetAllMyChar = ({ options }: any) => {
  return useQuery("allMyChar", () => getAllMyChar(), {
    ...options,
  });
};

export const useRefreshChar = ({ name, options }: any) => {
  return useQuery("charRefresh", () => getCharInfo(name), {
    ...options,
  });
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
