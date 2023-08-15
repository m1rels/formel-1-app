import React, { ReactElement } from "react";
import "./styles.css";
import "./App.css";
import LoadingIndicator from "./components/LoadingIndicator";
import { Link } from "react-router-dom";
import { Root, Season } from "./interfaces/Seasons";

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <h1>Welcome to Formula 1🏎️</h1>
      <p>Let's experience the history of the Formula 1 World!</p>
      <nav>
        <ul>
          <li><Link to={`/seasons/`}>Seasons</Link></li>
        </ul>
      </nav>
    </React.Fragment>
  )
}