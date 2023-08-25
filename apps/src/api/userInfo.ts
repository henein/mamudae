import axios from "axios";

// 유저 정보 조회
export const userInfo = async (accessToken: string | undefined) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
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
export const getAllMyChar = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/userinfo/character/all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// 유저가 작성한 게시물 조회
export const getMyBoard = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/userinfo/myboards`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// 유저가 댓글을 작성한 게시물 조회
export const getMyCommentBoard = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/userinfo/mycomment-boards`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
