/** @format */

import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";

const HistoryList = ({ name, value, info, date }) => {
  const signValue = name === "balance" ? "+" : "-";

  const [elapsedTime, setElapsedTime] = useState(() =>
    calculateElapsedTime(date)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(calculateElapsedTime(date));
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [date]);

  function calculateElapsedTime(date) {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
  }

  return (
    <li className="list-none flex flex-col w-full rounded-lg px-2 py-2 border-2">
      <div className="flex m-2 md:gap-10 justify-between">
        <p
          className={`font-bold ${
            name === "balance" ? "text-green-500" : "text-red-500"
          }`}
        >
          {signValue + value}
        </p>
        <p className="text-[14px] font-thin">{info}</p>
      </div>
      <p className="text-end text-[10px]">{elapsedTime}</p>
    </li>
  );
};

export default HistoryList;
