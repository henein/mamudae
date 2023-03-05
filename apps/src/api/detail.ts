import axios from "axios";

export async function detail(id: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/F/${id}`
  );
  return res.data;
}
