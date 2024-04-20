import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setRate } from "../../redux/slices/slice";

import Axios from "axios";

const List = () => {
  const dispatch = useDispatch();
  const { rate } = useSelector((state) => state.rate);

  React.useEffect(() => {
    try {
      Axios.get("http://localhost:5001/rates", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        dispatch(setRate(response.data));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <p>list</p>
      <p>{JSON.stringify(rate)}</p>
    </div>
  );
};

export default List;
