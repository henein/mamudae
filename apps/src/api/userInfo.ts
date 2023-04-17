import axios from "axios";

export const userInfo = async (accessToken: string | undefined) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
    },
  });
  return res.data;
};
