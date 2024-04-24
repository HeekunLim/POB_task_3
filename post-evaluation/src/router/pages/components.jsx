import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

// db 내용 출력
const NewCard = ({ rates }) => {
  let navigate = useNavigate();

  const handleClick = (checkid) => {
    navigate("/detail/" + checkid);
  };

  return (
    <div>
      {rates.map((r) => (
        <StyledRateBlockWrapper key={r.id}>
          <div>
            <div>
              <p style={{ width: "300px" }}>{r.date}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <RateBlock key={r.id} rate={r} />
              <StyledStarRating>
                {r.rate > 0 ? "★".repeat(r.rate) : "-"}
              </StyledStarRating>
            </div>
          </div>
          <div>
            <StyledButton onClick={() => handleClick(r.id)}>수정</StyledButton>
          </div>
        </StyledRateBlockWrapper>
      ))}
    </div>
  );
};

export { RateBlock, NewCard };

const StyledRateBlockWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  border: solid;
  padding: 20px;
  margin: 10px;
`;

const StyledStarRating = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
