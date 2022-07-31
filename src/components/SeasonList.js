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
    seasons.push(
    <React.Fragment key={season.season}>
      <h3 className="m-1 mt-2">{season.season}</h3>
      <li>
        <Link to={`/seasons/${season.season}/drivers`}>Drivers</Link>
      </li>
      <li>
        <Link to={`/seasons/${season.season}/constructors`}>Constructors</Link>
      </li>
      <li>
        <Link to={`/seasons/${season.season}/races`}>Race Schedule</Link>
      </li>
      </React.Fragment>
    );
  });

  return seasons;
}
