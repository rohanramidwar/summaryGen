import React from "react";

const TextInput = () => {
  return (
    <>
      <textarea
        className="w-1/3 p-3 border border-gray-900 rounded-sm text-xl placeholder:text-gray-900"
        rows={4}
        placeholder="Paste an article, text or essay in this box and hit summarize; we'll return a shortened copy for you to read"
      />
    </>
  );
};

export default TextInput;
