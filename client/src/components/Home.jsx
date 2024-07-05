import React, { useState } from "react";
import TextInput from "../components/TextInput";
import UrlInput from "../components/UrlInput";
import axios from "axios";
import SentenceCountInput from "./SentenceCountInput";
import { Button } from "./ui/button";

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
    <div className="flex justify-center">
      <div className="w-1/3 text-slate-900 flex flex-col gap-2 items-center">
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
        <Button onClick={getScrappedText}>Extract Text</Button>
        <Button onClick={getSummary}>Summarize</Button>
      </div>
    </div>
  );
};

export default Home;
