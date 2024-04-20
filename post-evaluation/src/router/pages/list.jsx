import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRates } from "../../redux/slices/slice";
import Axios from "axios";
import { RateBlock } from "./components";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { rates } = useSelector((state) => state.rates);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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

  function handleClick(checkid) {
    navigate("/detail/" + checkid);
  }

  return (
    <div>
      <h1>list</h1>
      {rates.map((r) => (
        <div>
          <RateBlock key={r.id} rate={r} />
          <button onClick={() => handleClick(r.id)}>수정</button>
        </div>
      ))}
    </div>
  );
};

export default List;
