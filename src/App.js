import React from 'react';
import {Link, Outlet} from "react-router-dom";
import "./styles.css"
import './App.css';

export default function App() {
  return (
    <div>
      <h1>F1</h1>

      <nav>
        <ul className="tab tab-block ">
          <li className="tab-item text-dark active">
            <Link to="/drivers" className='MenuLink'>Drivers</Link>
          </li>
           <li className="tab-item text-dark">
            <Link to="/constructors" className='MenuLink'>Constructors</Link>
           </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

