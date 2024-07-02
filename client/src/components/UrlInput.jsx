import React from "react";

const UrlInput = ({ url, setUrl }) => {
  return (
    <>
      <input
        className="border border-gray-900 px-2 py-1 rounded-sm text-xl placeholder:text-gray-900"
        placeholder="Or paste a URL here"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
    </>
  );
};

export default UrlInput;
