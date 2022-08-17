import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Drivers from "./components/Drivers";
import Constructors from "./components/Constructors";
import Driver from "./components/Driver";
import Constructor from "./components/Constructor";
import RacesList from "./components/RacesList";
import Circuit from "./components/Circuit";

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
    );

  root.render(
    <BrowserRouter>
      <Routes>
          <Route path="/seasons" element={<App />}/>
          <Route path="/seasons/:year/drivers" element={<Drivers />} />
          <Route path="/seasons/:year/constructors" element={<Constructors />} />
          <Route path="/drivers/:driverId" element={<Driver />} />
          <Route path="/constructors/:constructorId" element={<Constructor />} />
          <Route path="/seasons/:year/races" element={<RacesList />} />
          <Route path="/circuits/:circuitId" element={<Circuit />} />
      </Routes>
    </BrowserRouter>
  );



