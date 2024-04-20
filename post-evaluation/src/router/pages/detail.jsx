import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRates, changeRate } from "../../redux/slices/slice";
import Axios from "axios";
import { RateBlock } from "./components";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const { idNum } = useParams();
  const { rates } = useSelector((state) => state.rates);
  const dispatch = useDispatch();
  const [score, setScore] = React.useState(0);
  let navigate = useNavigate();

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

    window.addEventListener("keydown", handleKeyDown);
  }, []);

  const scoreClick = (s) => {
    setScore(s);
  };

  const changeClick = (checkid, newScore) => {
    dispatch(changeRate({ checkid, newScore }));

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
      return (
        <div>
          <h1>detail</h1>
          <RateBlock key={rate.id} rate={rate} />
          <button onClick={() => scoreClick(0)}>
            <p>-</p>
          </button>
          <button onClick={() => scoreClick(1)}>
            {score >= 1 ? <p>{"★"}</p> : <p>{"☆"}</p>}
          </button>
          <button onClick={() => scoreClick(2)}>
            {score >= 2 ? <p>{"★"}</p> : <p>{"☆"}</p>}
          </button>
          <button onClick={() => scoreClick(3)}>
            {score >= 3 ? <p>{"★"}</p> : <p>{"☆"}</p>}
          </button>
          <button onClick={() => scoreClick(4)}>
            {score >= 4 ? <p>{"★"}</p> : <p>{"☆"}</p>}
          </button>
          <button onClick={() => scoreClick(5)}>
            {score >= 5 ? <p>{"★"}</p> : <p>{"☆"}</p>}
          </button>
          <button onClick={() => changeClick(rate.id, score)}>저장하기</button>
        </div>
      );
    }
  }
};

export default Detail;
