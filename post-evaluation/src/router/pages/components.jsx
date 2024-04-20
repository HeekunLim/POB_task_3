import React from "react";

const RateBlock = ({ rate }) => {
  const dateObj = new Date(rate.date);
  const dayNum = dateObj.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      <p>{week[dayNum]}</p>
      <p>{rate.date}</p>
      {rate.rate > 0 ? <p>{"★".repeat(rate.rate)}</p> : <p>-</p>}
    </div>
  );
};

export { RateBlock };
