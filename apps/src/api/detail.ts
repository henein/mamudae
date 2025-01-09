import axiosInstance from "./axiosInstance";

export async function detail(id: any) {
  const res = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${id}`
  );
  return res.data;
}
