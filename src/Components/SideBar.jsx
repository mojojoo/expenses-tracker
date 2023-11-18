/** @format */

import React, { useState } from "react";
import { button } from "../data/Data";
import { useContextProvider } from "../context/ContextApi";

const SideBar = () => {
  const [isActive, seIsActive] = useState(1);
  const { setIsHistoryActive, history } = useContextProvider();

  const handleActiveItem = (name) => {
    seIsActive(name);
    if (name === 2) {
      setIsHistoryActive(true);
    } else {
      setIsHistoryActive(false);
    }
  };
  return (
    <div className="flex flex-col justify-between py-3 max-xl:border-b-2 md:border-r-2  md:mb-0 mb-2 border-black px-5">
      <div className="w-full flex flex-col">
        {button.map((btn) => (
          <button
            key={btn.id}
            className={`py-3 px-5 my-2 rounded-lg text-[15px] font-semibold text-[#5E5E5E] hover:bg-slate-400 hover:text-white ${
              isActive === btn.id ? "bg-[#676767] text-white" : "bg-[#D9D4E7]"
            }`}
            onClick={() => handleActiveItem(btn.id)}
          >
            {btn.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
