import styled from "styled-components";

const RateBlock = ({ rate }) => {
  const dateObj = new Date(rate.date);
  const dayNum = dateObj.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // 날짜에 해당하는 요일 출력
  return (
    <div>
      <StyledDay
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          fontSize: "30px",
        }}
      >
        {week[dayNum]}
      </StyledDay>
    </div>
  );
};

export { RateBlock };

const StyledDay = styled.p`
  display: flex;
  justifycontent: center;
  alignitems: center;
  width: 50px;
  height: 50px;
  fontsize: 30px;
`;
