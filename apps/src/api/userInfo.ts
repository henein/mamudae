import axios from "axios";

export const userInfo = async (accessToken: string | undefined) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

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
