import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRates } from "../../redux/slices/slice";
import Axios from "axios";
import { NewCard } from "./components";
import styled from "styled-components";

const List = () => {
  const { rates } = useSelector((state) => state.rates);
  const dispatch = useDispatch();

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

  return (
    <StyledContainer>
      <div>
        <h1>일주일 컨디션</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <NewCard rates={rates.slice(0, 7)} />
        <NewCard rates={rates.slice(7, 14)} />
        <NewCard rates={rates.slice(14, 21)} />
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
