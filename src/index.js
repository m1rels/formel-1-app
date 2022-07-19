import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import DriversTable from './components/DriversTable';
import ConstructorsTable from "./components/ConstructorsTable";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/drivers" element={<DriversTable />}/>
        <Route path="/constructors" element={<ConstructorsTable />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
