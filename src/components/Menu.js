import React from "react";
import "../styles.css"

export default function Menu() {
  return (
  <ul className="tab tab-block ">
  <li className="tab-item text-dark active">
    <a href="#" className="MenuLink">Drivers</a>
  </li>
  <li className="tab-item text-dark">
    <a href="#" className="MenuLink">Constructors</a>
  </li>
</ul>
  )
}