import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Drivers from "./components/Drivers";
import Constructors from "./components/Constructors";
import SeasonList from "./components/SeasonList";
import Driver from "./components/Driver";
import Constructor from "./components/Constructor";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/seasons" element={<SeasonList />} />
        <Route path="/seasons/:year/drivers" element={<Drivers />} />
        <Route path="/seasons/:year/constructors" element={<Constructors />} />
        <Route path="/drivers/:driverId" element={<Driver />} />
        <Route path="/constructors/:constructorId" element={<Constructor />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
