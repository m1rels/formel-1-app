import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Season from "./components/Season";
import SeasonList from "./components/SeasonList";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/seasons" element={<SeasonList />}></Route>
        <Route path="/seasons/:year" element={<Season />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
