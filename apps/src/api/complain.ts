import axiosInstance from './axiosInstance';

export type ComplainReasonType =
  | 'IllegalFilm'
  | 'abuse'
  | 'advertisement'
  | 'another'
  | 'obscene';
export type ComplainType = 'Board' | 'Comment' | 'Reply';
export interface ComplainProps {
  complainReason: ComplainReasonType;
  complainType: ComplainType;
  targetId: number;
  text: string;
}

export const postComplain = async ({
  complainReason,
  complainType,
  targetId,
  text,
}: ComplainProps) => {
  const res = await axiosInstance.post(`/complain`, {
    complainReason,
    complainType: complainType,
    targetId,
    text,
  });
  return res;
};
