import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRates } from "../../redux/slices/slice";
import Axios from "axios";
import { RateBlock } from "./components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const List = () => {
  const { rates } = useSelector((state) => state.rates);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // mock api에서 데이터 불러오기
  React.useEffect(() => {
    try {
      Axios.get("http://localhost:5001/rates", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        dispatch(setRates(response.data));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // 버튼 클릭시 수정 페이지로 이동
  const handleClick = (checkid) => {
    navigate("/detail/" + checkid);
  };

  return (
    <StyledContainer>
      <div>
        <h1>일주일 컨디션</h1>
      </div>
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
              <StyledButton onClick={() => handleClick(r.id)}>
                수정
              </StyledButton>
            </div>
          </StyledRateBlockWrapper>
        ))}
      </div>
    </StyledContainer>
  );
};

export default List;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

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
