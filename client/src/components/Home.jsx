import React from "react";
import TextInput from "../components/TextInput";
import UrlInput from "../components/UrlInput";

const Home = () => {
  return (
    <div className="text-slate-9w00 flex flex-col gap-2 items-center min-h-screen">
      <p>Summarize my text</p>
      <TextInput />
      <UrlInput />
      <button className="px-4 h-10 text-2xl uppercase bg-violet-500 text-white font-bold rounded-sm">
        Summarize
      </button>
    </div>
  );
};

export default Home;
