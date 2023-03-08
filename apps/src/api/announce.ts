import axios from "axios";

export async function announce() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/N/?page=1`
  );

  return res.data;
}
