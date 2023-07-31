import axios from 'axios';

export interface ICreateBoard {
  accessToken?: string | undefined;
  boardType: string;
  text: string;
  title: string;
}

export interface IUploadImage {
  accessToken?: string | undefined;
  image: File;
}

export async function createBoard({ accessToken, ...props }: ICreateBoard) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board`,
    {
      ...props,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
}

export async function uploadImage({ accessToken, image }: IUploadImage) {
  const formData = new FormData();

  formData.append("image", image)

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return res.data as string;
}
