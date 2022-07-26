import React from 'react';
import {Outlet, Link} from "react-router-dom";
import "./styles.css"
import './App.css';

export default function App() {
  return (
    <div>
     <header>
        <h1>F1</h1>
        <ul className="nav">
          <li className="nav-item active">
            <Link to="/seasons" className='nav'>Seasons</Link>
          </li>
        </ul>
     </header>
     <Outlet/>
    </div>
  )
}

