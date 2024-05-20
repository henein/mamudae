import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import styled from "styled-components";
import ArrowDownIcon from "/public/myPageImages/arrowDown.svg";

const DateSelector = ({ ...props }: any) => {
  const formattingDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // 초기값 설정
  const [yesterdayDate, setYesterdayDate] = useState<Date | null>(null);
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    setYesterdayDate(yesterday);
  }, []);
  const [pastSelectedDate, setPastSelectedDate] = useState<Date | null>(
    yesterdayDate ?? null
  );
  const [recentSelectedDate, setRecentSelectedDate] = useState<Date | null>(
    yesterdayDate ?? null
  );

  // 최소 시간 설정
  const [prevMinDate, setPrevMinDate] = useState<Date | null>(null);
  useEffect(() => {
    if (recentSelectedDate) {
      const minDate = new Date(
        recentSelectedDate.getFullYear(),
        recentSelectedDate.getMonth(),
        recentSelectedDate.getDate() - 60
      );
      setPrevMinDate(minDate);
    }
  }, [recentSelectedDate]);

  // pastSelectedDate 컨트롤 로직
  useEffect(() => {
    // prevMinDate가 pastSelectedDate 보다 크다면 prevMinDate 적용
    if (prevMinDate && pastSelectedDate) {
      prevMinDate > pastSelectedDate && setPastSelectedDate(prevMinDate);
    }
    // pastSelectedDate가 recentSelectedDate보다 크다면 recentSelectedDate사용
    if (pastSelectedDate && recentSelectedDate) {
      pastSelectedDate > recentSelectedDate &&
        setPastSelectedDate(recentSelectedDate);
    }
  }, [pastSelectedDate, prevMinDate, recentSelectedDate]);

  // 상위 컴포넌트로 값 할당
  useEffect(() => {
    if (pastSelectedDate && recentSelectedDate) {
      props.setPastDay(formattingDate(pastSelectedDate));
      props.setRecentDay(formattingDate(recentSelectedDate));
    }
  }, [pastSelectedDate, props, recentSelectedDate]);

  return (
    <Container>
      <DatePicker
        className="datePicker"
        id="datePickerPast"
        locale={ko}
        dateFormat="yyyy-MM-dd" // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={prevMinDate} // minDate 이전 날짜 선택 불가
        maxDate={recentSelectedDate ? recentSelectedDate : yesterdayDate} // maxDate 이후 날짜 선택 불가
        selected={pastSelectedDate} // 선택된값 설정
        onChange={(date) => setPastSelectedDate(date)} // 날짜 선택시 state변경
        value={
          // 초기값 설정
          pastSelectedDate ? formattingDate(pastSelectedDate) : "날짜 선택"
        }
      />
      <ImagePositionL htmlFor="datePickerPast">
        <ArrowDownIcon width="16px" height="10px" />
      </ImagePositionL>
      <span>~</span>
      <DatePicker
        className="datePicker"
        id="datePickerRecent"
        locale={ko}
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect
        minDate={new Date("2015-01-01")}
        maxDate={yesterdayDate}
        selected={recentSelectedDate}
        onChange={(date) => setRecentSelectedDate(date)}
        value={
          recentSelectedDate ? formattingDate(recentSelectedDate) : "날짜 선택"
        }
      />
      <ImagePositionR htmlFor="datePickerRecent">
        <ArrowDownIcon width="16px" height="10px" />
      </ImagePositionR>
    </Container>
  );
};

export default DateSelector;

const Container = styled.div`
  width: 332px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  .datePicker {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.input};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 12px 12px 12px 16px;
    border-radius: 8px;
    width: 146px;
    outline: none;
  }
  .react-datepicker-popper {
    position: absolute;
  }
  span {
    margin: 0px 16px;
  }
`;
const ImagePositionR = styled.label`
  position: absolute;
  right: 33px;
  color: ${({ theme }) => theme.text};
  &:hover {
    cursor: pointer;
  }
`;
const ImagePositionL = styled.label`
  position: absolute;
  left: 140px;
  color: ${({ theme }) => theme.text};
  &:hover {
    cursor: pointer;
  }
`;
