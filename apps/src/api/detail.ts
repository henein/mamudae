import axios from "axios";

export async function detail(id: any) {
  const res = await axios.get(`http://henesysback.shop:8081/board/F/${id}`);
  return res.data;
}
