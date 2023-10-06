import axiosInstance from "./axiosInstance";
// 유저 정보 조회
export const userInfo = async (accessToken: string | undefined) => {
  if (accessToken) {
    const res = await axiosInstance.get("/userinfo");
    return res.data;
  }
};

// 유저(본인) Profile 조회
export const getProfile = async () => {
  const res = await axiosInstance.get("/userinfo/profile");
  return res;
};

// 유저 Profile 정보 변경(프로필사진, 닉네임)
interface UserProfileType {
  forms: {
    image: File | null;
    userName: string | null;
  };
}
export const setUserProfile = async ({ forms }: UserProfileType) => {
  const formData = new FormData();
  await formData.append("image", forms.image || "");
  await formData.append("userName", forms.userName || "");
  try {
    const res = await axiosInstance.post(`/userinfo`, formData);
    // window.location.reload();
    return res;
  } catch (error) {
    console.error("setUserProfile 오류:", error);
    throw error; // 오류를 다시 던져서 상위 호출자에게 전달합니다.
  }
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
export const getUserCharName = async (
  userApi: string,
  recentDay: string,
  pastDay: string
) => {
  const res = await axiosInstance.post("/userinfo/character/auth", {
    userApi,
    recentDay,
    pastDay,
  });
  return res;
};

// 유저 대표캐릭터 설정
export const setRepresent = async (id: number) => {
  const res = await axiosInstance.post(`/userinfo/character/pick?id=${id}`);
  return res;
};

// 닉네임으로 캐릭터 정보 불러오기
export const getCharInfo = async (name: string) => {
  try {
    const res = await axiosInstance.post(
      `/userinfo/character/renew?name=${name}`
    );
    return res;
  } catch (err: any) {
    return alert(err.response.data.errorMessage);
  }
};

// 캐릭터 아바타 getColor 사용하기위한 주소 받기
export const getImgUrl = async (nexonImg: string) => {
  const res = await axiosInstance.get(`/proxy/${nexonImg}`);
  return res;
};
