import axios from "axios";

export const postUpdateView = async (id: number) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/updateview`,
    {
      id: id,
    }
  );

  return res.data;
};
