import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRates, changeRate } from "../../redux/slices/slice";
import Axios from "axios";
import { RateBlock } from "./components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
  const { idNum } = useParams();
  const { rates } = useSelector((state) => state.rates);
  const dispatch = useDispatch();
  const [score, setScore] = React.useState(0);
  let navigate = useNavigate();

  // 키보드 입력 이벤트에 사용할 함수
  // 0점 부터 5점 까지 가능
  // 숫자키 0, 1, 2, 3, 4, 5에 대응
  const handleKeyDown = (e) => {
    if (e.key === "0") {
      setScore(0);
    } else if (e.key === "1") {
      setScore(1);
    } else if (e.key === "2") {
      setScore(2);
    } else if (e.key === "3") {
      setScore(3);
    } else if (e.key === "4") {
      setScore(4);
    } else if (e.key === "5") {
      setScore(5);
    }
  };

  React.useEffect(() => {
    // mock api에서 데이터 불러오기
    // 메인 페이지에서도 불러왔지만 새로고침이 잘 못 눌렸을 때를 대비해서 한번 더 불러왔습니다
    try {
      Axios.get("http://localhost:5001/rates", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        dispatch(setRates(response.data));

        for (let rate of rates) {
          if (rate.id === idNum) {
            setScore(rate.rate);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    // 위에서 작성한 키보드 이벤트 내용을 추가
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  // 별점 버튼 클릭시 점수 변경
  const scoreClick = (s) => {
    setScore(s);
  };

  // 수정하기 버튼 클릭시 변경된 점수 저장
  const changeClick = (checkid, newScore) => {
    // 리덕스에 점수 변경
    dispatch(changeRate({ checkid, newScore }));

    // mock api 데이터 변경
    try {
      Axios.patch(
        `http://localhost:5001/rates/${checkid}`,
        { rate: newScore },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        alert("값이 수정되었습니다");
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  for (let rate of rates) {
    if (rate.id === idNum) {
      const dateObj = new Date(rate.date);
      const dayNum = dateObj.getDay();
      const week = ["일", "월", "화", "수", "목", "금", "토"];

      return (
        <StyledContainer>
          <div>
            <h1>{week[dayNum]}요일 평점 매기기</h1>
          </div>
          <StyledButtonContainer>
            <RateBlock key={rate.id} rate={rate} />
            <StyledButton key={0} onClick={() => scoreClick(0)}>
              -
            </StyledButton>
            {[1, 2, 3, 4, 5].map((num) => (
              <StyledButton key={num} onClick={() => scoreClick(num)}>
                {score >= num ? "★" : "☆"}
              </StyledButton>
            ))}
          </StyledButtonContainer>
          <div style={{ padding: "10px" }}>
            <StyledSaveButton onClick={() => changeClick(rate.id, score)}>
              저장하기
            </StyledSaveButton>
          </div>
        </StyledContainer>
      );
    }
  }
};

export default Detail;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 30px;
  background-color: transparent;
`;

const StyledSaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
