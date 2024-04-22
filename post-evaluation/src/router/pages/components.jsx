import styled from "styled-components";

const RateBlock = ({ rate }) => {
  const dateObj = new Date(rate.date);
  const dayNum = dateObj.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // 날짜에 해당하는 요일 출력
  return (
    <div>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "50px",
          height: "50px",
          fontSize: "30px",
        }}
      >
        {week[dayNum]}
      </p>
    </div>
  );
};

export { RateBlock };
