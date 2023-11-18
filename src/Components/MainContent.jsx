/** @format */

import React, { useState, useEffect } from "react";
import { useContextProvider } from "../context/ContextApi";
import HistoryList from "./HistoryList";

const MainContent = () => {
  const {
    isHistoryActive,
    setIsFormActive,
    balance,
    setIsBalance,
    setNameValue,
    history,
    setHistory,
  } = useContextProvider();

  const reverseList = history.slice().reverse();

  const handleFormActive = (name) => {
    setIsFormActive(true);
    setNameValue(name);
  };

  useEffect(() => {
    localStorage.setItem("wow", JSON.stringify(balance));
  }, [balance]);

  return (
    <>
      {!isHistoryActive ? (
        <div className="bg-[#D9D4E7] md:w-full mx-6 mb-4 flex flex-col rounded-lg p-3">
          <div className="py-5 border-b-2 border-black">
            <p className="text-[13px] px-4 py-3">Balance</p>
            <h1 className="bg-white rounded-lg px-5 text-[40px]">{balance}</h1>
          </div>
          <div className="w-full flex flex-col gap-2 p-2.5">
            <button
              onClick={() => handleFormActive("balance")}
              className="bg-[#FEC7D7] rounded-lg py-3 border-4 border-[#A786DF] text-[#FFFFFE] font-medium text-[20px]"
            >
              Add Balance
            </button>
            <button
              onClick={() => handleFormActive("expenses")}
              className="bg-[#FEC7D7] rounded-lg py-3 border-4 border-[#A786DF] text-[#FFFFFE] font-medium text-[20px]"
            >
              Add Expenses
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[337px] w-full px-5 py-7 relative">
          <button
            onClick={() => setHistory([])}
            className="absolute text-[10px] top-0 right-0 text-red-600 bg-slate-400 px-2 py-1 rounded-lg font-bold"
          >
            Delete History
          </button>
          <div className="h-full p-3 flex flex-col gap-3 relative overflow-y-auto">
            {reverseList.length === 0 ? (
              <h1>No histories</h1>
            ) : (
              reverseList.map((item) => {
                return <HistoryList key={item.id} {...item} />;
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainContent;
