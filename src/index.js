import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import DriversPage from "./components/DriversPage";
import ConstructorsPage from './components/ConstructorsPage';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/drivers" element={<DriversPage />}/>
        <Route path="/constructors" element={<ConstructorsPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
