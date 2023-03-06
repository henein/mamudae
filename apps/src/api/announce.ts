import axios from "axios";

export async function announce() {
  const res = await axios.get(`https://henesysback.shop/board/N`);

  return res.data;
}
