import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Drivers from "./components/Drivers";
import Constructors from "./components/Constructors";
import SeasonList from "./components/SeasonList";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/seasons" element={<SeasonList />}></Route>
        <Route path="/seasons/:year/drivers" element={<Drivers />}></Route>
        <Route path="/seasons/:year/constructors" element={<Constructors />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
