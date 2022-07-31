import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";
import "./App.css";

export default function App() {
  return (
    <React.Fragment>
      <header>
        <h1>F1</h1>
        <ul className="nav">
          <li className="nav-item active">
            <Link to="/seasons">
              Seasons
            </Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </React.Fragment>
  );
}
