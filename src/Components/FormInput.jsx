/** @format */

import { React, useEffect, useState } from "react";
import { useContextProvider } from "../context/ContextApi";
import Back from "../assets/back.svg";

const FormInput = () => {
  const {
    nameValue,
    setIsBalance,
    setIsFormActive,
    setIsError,
    balance,
    setHistory,
    history,
    isError,
  } = useContextProvider();
  const [addBalanceValue, setAddBalanceValue] = useState("");
  const [addExpensesValue, setAddExpensesValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleInput = (e) => {
    const inputValue = e.currentTarget.value;
    if (nameValue === "expenses") {
      setAddExpensesValue(inputValue);
    } else {
      setAddBalanceValue(inputValue);
    }
  };

  const handleDescription = (e) => {
    const description = e.currentTarget.value;
    setDescriptionValue(description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = Math.random().toString(32);
    const newData = {
      name: nameValue,
      id: randomId,
      value: nameValue === "balance" ? addBalanceValue : addExpensesValue,
      info: descriptionValue,
      date: new Date(),
    };

    if (nameValue === "balance") {
      if (!addBalanceValue || addBalanceValue === "0") return;
      const value =
        balance === 0
          ? parseInt(addBalanceValue)
          : balance + parseInt(addBalanceValue);
      setIsBalance(parseInt(value));
      setHistory([...history, newData]);
      setIsFormActive(false);
    } else {
      if (addExpensesValue > balance) {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } else {
        if (!addExpensesValue || addExpensesValue === "0") return;
        const expenseValue = balance - parseInt(addExpensesValue);
        setIsBalance(parseInt(expenseValue));
        setIsFormActive(false);
        setHistory([...history, newData]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-2 justify-center gap-3 "
    >
      <button
        type="button"
        onClick={() => setIsFormActive(false)}
        className=" w-5 flex items-center justify-center"
      >
        <img src={Back} alt="back" className="h-[20px] w-[10px]" />
      </button>
      {isError && (
        <h1 className="text-center text-red-500">Not Enough Balance!</h1>
      )}
      <label className="text-[16px] font-bold" htmlFor="">
        {nameValue}
      </label>
      <input
        value={nameValue === "expenses" ? addExpensesValue : addBalanceValue}
        className="border-4 border-[#A786DF] outline-none rounded-lg p-2 text-[20px] px-3"
        placeholder={nameValue}
        min={0}
        type="number"
        onChange={handleInput}
      />
      <label className="text-[16px]  font-bold" htmlFor="">
        Description
      </label>
      <textarea
        value={descriptionValue}
        onChange={handleDescription}
        className="border-4 border-[#A786DF] outline-none rounded-lg px-2 py-3"
        placeholder="Description"
      ></textarea>
      <button className="bg-[#676767] py-2 text-white font-thin rounded-lg mt-3 hover:bg-slate-500 transition-colors">
        Add {nameValue}
      </button>
    </form>
  );
};

export default FormInput;
