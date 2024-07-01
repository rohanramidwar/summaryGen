import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";

import "@fontsource/open-sans";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </>
  );
};

export default App;
