import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";

export default function SeasonList() {
  const [allSeasons, setAllSeasons] = React.useState([]);

  React.useEffect(() => {
    async function loadData () {
        const response = await fetch(`http://ergast.com/api/f1/seasons.json?limit=100`, {});
        const seasons = await response.json();
        setAllSeasons(seasons.MRData.SeasonTable.Seasons);
    }
    loadData();
  }, []);

  if (!allSeasons) {
    return <LoadingIndicator />;
  }


  const seasons = [];
  allSeasons.forEach((season) => {
    console.log(season)
    seasons.push(
    <React.Fragment>
      <h3>{season.season}</h3>
      <li key={season.season} className="nav-item">
        <Link to={`/seasons/${season.season}`}>Drivers</Link>
      </li>
      <li key={season.season} className="nav-item">
        <Link to={`/seasons/${season.season}`}>Constructors</Link>
      </li>
      </React.Fragment>
    );
  });

  return seasons;
}
