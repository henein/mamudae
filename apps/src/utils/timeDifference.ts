import moment from "moment-timezone";

const timeDifference = (createTime: string) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerYear = msPerDay * 365;

  const userTimezone = moment.tz.guess(); // 유저가 현재 위치 파악
  const currentTimestamp = Date.parse(
    moment().tz(userTimezone).format() // 사용자의 현재 시간
  );
  const createTimeTimestamp = Date.parse(
    moment.utc(createTime).tz(userTimezone).format() // createTime의 UTC시간을 사용자의 현재시간 기준으로 바꾼 시간
  );
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
