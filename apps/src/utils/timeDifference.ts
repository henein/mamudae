const timeDifference = (createTime: string) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerYear = msPerDay * 365;
  const currentTimestamp = new Date().getTime();
  const createTimeTimestamp = Date.parse(createTime);

  const elapsed = currentTimestamp - createTimeTimestamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "초 전";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "분 전";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "시간 전";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerDay) + "일 전";
  } else {
    return Math.round(elapsed / msPerYear) + "년 전";
  }
};

export default timeDifference;
