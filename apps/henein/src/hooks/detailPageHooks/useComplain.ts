import { useMutation, useQuery } from 'react-query';
import useReportBoxModalState from '../../../store/modal/reportBox';
import {
  ComplainReasonType,
  ComplainType,
  postComplain,
} from '../../api/complain';

interface Props {
  complainReason: ComplainReasonType;
  text: string;
}
export const usePostComplain = (type: ComplainType, targetId: number) => {
  const { close } = useReportBoxModalState();

  const { mutate } = useMutation(
    ['complain', type, targetId],
    ({ complainReason, text }: Props) =>
      postComplain({ complainReason, complainType: type, targetId, text }),
    {
      onSuccess: () => {
        alert('신고 접수되었습니다.');
        close();
      },
      onError: () => {
        alert('다시 시도해 주세요.');
      },
    }
  );

  return { mutate };
};
