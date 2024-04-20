import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { date } = useParams();

  return (
    <div>
      <p>detail</p>
      <p>{date}</p>
    </div>
  );
};

export default Detail;
