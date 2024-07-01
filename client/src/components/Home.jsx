import React, { useState } from "react";
import TextInput from "../components/TextInput";
import UrlInput from "../components/UrlInput";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  // API req
  const options = {
    method: "POST",
    url: "https://gpt-summarization.p.rapidapi.com/summarize",
    headers: {
      "x-rapidapi-key": "cfaffe4735mshc81634fb8809ebap1c847djsn0a07ca086e4c",
      "x-rapidapi-host": "gpt-summarization.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      text,
      num_sentences: 3,
    },
  };

  const getSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.request(options);
      setSummary(response.data.summary);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="pt-2 text-slate-900 flex flex-col gap-2 items-center min-h-screen">
      {loading && <p>Loading..</p>}
      <p className="font-medium">Summarize my text</p>
      <TextInput text={text} setText={setText} />
      <UrlInput />
      <button
        className="px-4 h-10 text-2xl uppercase bg-purple-500 border-2 border-purple-600 text-white font-bold rounded-sm"
        onClick={getSummary}
      >
        Summarize
      </button>
    </div>
  );
};

export default Home;
