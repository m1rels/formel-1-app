import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function SeasonsTable(props) {
  const seasonsDetails = props.seasons.MRData.SeasonTable.Seasons;
  const seasons = [];
  /* function getSeason(id) {
        return seasons.find(
            (season) => season.id === id    );
    }
    */

  seasonsDetails.forEach((season) => {
    seasons.push(
      <li key={season.season} className="nav-item">
        <Link to={`/seasons/${season.season}/drivers`}>
          {season.season}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <ul className="nav">{seasons}</ul>
      <Outlet />
    </div>
  );
}
