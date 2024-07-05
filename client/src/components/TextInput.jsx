import React from "react";

const TextInput = ({ text, setText }) => {
  return (
    <>
      <textarea
        className="w-full p-3 border border-gray-900 rounded-sm text-xl placeholder:text-gray-900"
        rows={8}
        placeholder="Paste an article, text or essay in this box and hit summarize; we'll return a shortened copy for you to read"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </>
  );
};

export default TextInput;
