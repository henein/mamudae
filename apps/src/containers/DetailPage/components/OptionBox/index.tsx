import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useBoardWarningModalState from '../../../../../store/modal/boardWarning';
import useReportBoxModalState from '../../../../../store/modal/reportBox';
import Button from '../../../../component/Button';
import BoardWarningModal from '../../../../component/Modal/BoardWarningModal';
import ReportBox from '../../../../component/Modal/ReportBoxModal';

const OptionBox = ({ ...props }) => {
  const { data, boardId } = props;
  const { getType: getBoardWarningType, open: warningOpen } =
    useBoardWarningModalState();
  const { getType: getReportType, open: reportOpen } = useReportBoxModalState();

  const warningType = getBoardWarningType();
  const reportType = getReportType();

  return (
    <Container>
      <Button type="button" sort="secondary">
        목록
      </Button>
      {data && data.uid ? (
        <RightItems>
          <Link href={`/update/${boardId}`}>
            <Button type="button" sort="secondary">
              수정하기
            </Button>
          </Link>
          <Button
            type="button"
            sort="danger"
            onClick={() => warningOpen('delete')}
          >
            삭제하기
          </Button>
        </RightItems>
      ) : (
        <RightItems>
          <Button
            type="button"
            sort="danger"
            onClick={() => reportOpen('board')}
          >
            신고하기
          </Button>
        </RightItems>
      )}
      {warningType && (
        <BoardWarningModal type={warningType} boardId={boardId} />
      )}
      {reportType && <ReportBox type={reportType} />}
    </Container>
  );
};

export default OptionBox;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;
const RightItems = styled.div`
  display: flex;
  gap: 8px;
`;
