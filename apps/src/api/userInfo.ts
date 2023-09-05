import axios from "axios";
import axiosInstance from "./axiosInstance";
// 유저 정보 조회
export const userInfo = async (accessToken: string | undefined) => {
  if (accessToken) {
    const res = await axiosInstance.get("/userinfo");
    return res.data;
  }
};

// 유저 닉네임 변경
export const setUserName = async (
  setName: string,
  accessToken: string | undefined
) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/userinfo/set-name`,
    {
      userName: setName,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// 현재 인증된 모든 캐릭터 조회
export const getAllMyChar = async () => {
  const res = await axiosInstance.get("/userinfo/character/all");
  return res.data;
};

// 유저가 작성한 게시물 조회
export const getMyBoard = async () => {
  const res = await axiosInstance.get("/userinfo/myboards");

  return res;
};

// 유저가 댓글을 작성한 게시물 조회
export const getMyCommentBoard = async () => {
  const res = await axiosInstance.get("/userinfo/mycomment-boards");
  return res;
};

// 넥슨 토큰으로 유저 캐릭터 정보 불러오기
export const getUserCharName = async (userApi: string) => {
  const res = await axiosInstance.post("/userinfo/character/auth", { userApi });
  return res;
};

// 유저 대표캐릭터 설정
export const setRepresent = async (id: number) => {
  const res = await axiosInstance.post("/userinfo/character/pick", { id });
  return res;
};
