import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Menu() {
  const [season, setSeason] = React.useState(null);
  const { id } = useParams();
 

  return (
    <div>
      <nav>
        <ul className="tab tab-block ">
          <li className="tab-item text-dark">
            <Link to={`/seasons/${season.season}/drivers`} className="MenuLink">
              Drivers
            </Link>
          </li>
          <li className="tab-item text-dark">
            <Link
              to={`/seasons/${season.season}/constructors`}
              className="MenuLink"
            >
              Constructors
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
