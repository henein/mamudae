import axios from "axios";

export async function announce() {
  const res = await axios.get(`http://henesysback.shop:8081/board/N`);
  return res.data;
}
