import axios from "axios";

export async function detail(id: any) {
  const res = await axios.get(`https://henesysback.shop/board/F/${id}`);
  return res.data;
}
