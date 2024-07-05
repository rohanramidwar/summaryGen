import React from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const ResultBox = ({ text, summary, setSummary, setText }) => {
  const newSummary = () => {
    setSummary("");
    setText("");
  };

  return (
    <div className="px-3 sm:px-0 w-full sm:w-2/3 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="sm:w-1/2 p-3 border border-gray-900 rounded-sm">
          <p className="font-medium">Text</p>
          <p>{text}</p>
        </div>
        <div className="flex flex-col justify-between sm:w-1/2 p-3 bg-fuchsia-100 border border-gray-900 rounded-sm">
          <div>
            <p className="font-medium">Summary</p>
            <p>{summary}</p>
          </div>
          <div className="flex justify-end">
            <button>
              <Copy />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={newSummary}
          className="bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          New Summary
        </Button>
      </div>
    </div>
  );
};

export default ResultBox;
