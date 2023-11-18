/** @format */
import React from "react";
import SideBar from "./Components/SideBar";
import MainContent from "./Components/MainContent";
import { data } from "./data/Data";
import { useContextProvider } from "./context/ContextApi";
import FormInput from "./Components/FormInput";

function App() {
  const { isFormActive } = useContextProvider();
  return (
    <main className="h-screen flex justify-center items-center bg-[#FEC7D7] relative">
      <section className="md:w-1/2 w-5/6 bg-white rounded-lg p-2">
        <h1 className="text-center text-[30px] font-bold text-[#5E5E5E] border-b-2 border-black py-3 mb-4">
          Expenses Tracker
        </h1>
        {!isFormActive ? (
          <div className="md:flex justify-between">
            <SideBar />
            <MainContent />
          </div>
        ) : (
          <FormInput />
        )}
      </section>
      <div className="flex sm:flex-nowrap flex-wrap absolute bottom-5">
        {data.map((items) => {
          return (
            <a key={items.name} href={items.url}>
              <img
                className="h-[35px] mx-2 hover:bg-slate-400 rounded-full py-2 px-2.5"
                src={items.icons}
                alt={items.name}
              />
            </a>
          );
        })}
        {/* <img src={Github} alt="" /> */}
      </div>
    </main>
  );
}

export default App;
