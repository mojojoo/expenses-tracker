/** @format */

import { React, useState, useContext, createContext, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isHistoryActive, setIsHistoryActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [balance, setIsBalance] = useState(
    JSON.parse(localStorage.getItem("wow")) || 0
  );
  const [nameValue, setNameValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userItems = localStorage.getItem("history");

    setHistory(JSON.parse(userItems));
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  /* useEffect(() => {
    const thsiWhat = JSON.parse(localStorage.getItem("wow"));
    setIsBalance(thsiWhat);
    console.log(typeof thsiWhat);
  }, []); */

  return (
    <StateContext.Provider
      value={{
        isHistoryActive,
        setIsHistoryActive,
        isFormActive,
        setIsFormActive,
        balance,
        setIsBalance,
        nameValue,
        setNameValue,
        setIsError,
        setHistory,
        history,
        isError,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useContextProvider = () => useContext(StateContext);
