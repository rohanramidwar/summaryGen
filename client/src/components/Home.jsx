import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import UrlInput from "../components/UrlInput";
import axios from "axios";
import SentenceCountInput from "./SentenceCountInput";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { getAllSmmries, saveSmmry } from "@/actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import ResultBox from "./ResultBox";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //to get user id
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [sentenceCount, setSentenceCount] = useState(3);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const uid = user?._id;

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
      setUrl("");
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
      const smmry = response.data.summary;
      dispatch(saveSmmry({ uid, smmry }));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getHistory = () => {
    dispatch(getAllSmmries({ uid }));
    navigate("/history");
  };

  return (
    <div className="flex justify-center">
      {!summary ? (
        <ResultBox
          summary={summary}
          text={text}
          setSummary={setSummary}
          setText={setText}
        />
      ) : (
        <div className="w-full px-3 sm:px-0 sm:w-1/3 text-slate-900 flex flex-col gap-2 items-center">
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
          <div className="w-full">
            <UrlInput url={url} setUrl={setUrl} />
          </div>
          <div className="flex justify-between w-full">
            <Button className="h-9" onClick={getHistory}>
              History
            </Button>
            {url ? (
              <Button
                className="bg-sky-500 hover:bg-sky-500"
                onClick={getScrappedText}
              >
                Extract Text
              </Button>
            ) : (
              <Button
                className="bg-fuchsia-500 hover:bg-fuchsia-500"
                onClick={getSummary}
              >
                Summarize
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
