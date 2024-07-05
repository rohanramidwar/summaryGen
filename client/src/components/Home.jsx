import React, { useState } from "react";
import TextInput from "../components/TextInput";
import UrlInput from "../components/UrlInput";
import axios from "axios";
import SentenceCountInput from "./SentenceCountInput";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [sentenceCount, setSentenceCount] = useState(3);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  const summaryApi = {
    method: "POST",
    url: "https://gpt-summarization.p.rapidapi.com/summarize",
    headers: {
      "x-rapidapi-key": "cfaffe4735mshc81634fb8809ebap1c847djsn0a07ca086e4c",
      "x-rapidapi-host": "gpt-summarization.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      text,
      num_sentences: sentenceCount,
    },
  };

  const webScrappingApi = {
    method: "GET",
    url: "https://article-extractor-and-summarizer.p.rapidapi.com/extract",
    params: {
      url,
    },
    headers: {
      "x-rapidapi-key": "cfaffe4735mshc81634fb8809ebap1c847djsn0a07ca086e4c",
      "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
    },
  };

  const getScrappedText = async () => {
    try {
      setLoading(true);
      const response = await axios.request(webScrappingApi);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data.content, "text/html");
      const paragraphs = doc.querySelectorAll("p");
      const texts = Array.from(paragraphs).map((p) => p.textContent);
      const combinedText = texts.join(" ");
      setText(combinedText);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.request(summaryApi);
      setSummary(response.data.summary);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="text-slate-900 flex flex-col gap-2 items-center min-h-screen">
      {loading && <p>Loading..</p>}
      <div className="flex gap-2 font-medium">
        <p>Summarize my text in</p>
        <SentenceCountInput
          sentenceCount={sentenceCount}
          setSentenceCount={setSentenceCount}
        />
        <p>sentences</p>
      </div>
      <TextInput text={text} setText={setText} />
      <UrlInput url={url} setUrl={setUrl} />
      <button
        className="px-4 h-10 text-2xl uppercase bg-purple-500 text-white font-bold rounded-sm"
        onClick={getScrappedText}
      >
        Extract Text
      </button>
      <button
        className="px-4 h-10 text-2xl uppercase bg-purple-500 text-white font-bold rounded-sm"
        onClick={getSummary}
      >
        Summarize
      </button>
    </div>
  );
};

export default Home;
