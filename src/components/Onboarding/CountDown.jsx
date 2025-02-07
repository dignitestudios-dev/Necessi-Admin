import React, { useState, useEffect } from "react";

const CountDown = ({ isActive, setIsActive, seconds, setSeconds }) => {
  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  return (
    <div className="countdown">
      <p className="text-[13px] text-black font-bold">Resend In 00:{seconds}</p>
    </div>
  );
};

export default CountDown;
