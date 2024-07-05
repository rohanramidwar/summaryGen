import React from "react";

const SentenceCountInput = ({ sentenceCount, setSentenceCount }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 2 && /^[0-9]*$/.test(val)) {
      setSentenceCount(val);
    }
  };

  return (
    <>
      <input
        className="w-9 text-center border border-gray-900 rounded-sm"
        value={sentenceCount}
        onChange={handleChange}
      />
    </>
  );
};

export default SentenceCountInput;
