import axios from "axios";

export async function createBoard(boardType: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/posturl입력`,
    boardType
  );
  return res.data;
}
