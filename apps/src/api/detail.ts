import axios from "axios";

export async function detail(id: any, accessToken?: string) {
  const headers: any = {};

  // accessToken이 있을때만 header에 전달
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${id}`,
    {
      headers: headers,
    }
  );
  return res.data;
}
