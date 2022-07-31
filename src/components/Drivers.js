import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import {Link} from "react-router-dom";

export default function Drivers() {
    const { year } = useParams();
  const [allDrivers, setAllDrivers] = useState(null);

  useEffect(() => {
    const loadDrivers = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
        const response = await fetch(url, options);
        const drivers = await response.json();
        console.log(drivers);
        const result = drivers.MRData.StandingsTable.StandingsLists;
        console.log("driver", result);

        if (drivers.MRData.StandingsTable.StandingsLists.length) {
            setAllDrivers(result[0].DriverStandings);
            return;
        }

        setAllDrivers([])
      };
    loadDrivers();
  }, []);

  if (!allDrivers) {
    return <LoadingIndicator />;
  }

  const drivers = [];

  allDrivers.forEach((driver) => {
    drivers.push(
      <tr key={driver.Driver.driverId}>
        <td className="text-center">{driver.position}</td>
        <td><Link to={`/drivers/${driver.Driver.driverId}`}>{driver.Driver.givenName + " " + driver.Driver.familyName}</Link></td>
        <td className="text-center">{driver.points}</td>
        <td className="text-center">{driver.wins}</td>
      </tr>
    );
  });

  return (
        <React.Fragment>
          <h2>Drivers</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="text-normal column col-1 text-center">Rank</th>
                <th className="text-normal column col-5">Driver</th>
                <th className="text-normal column col-2 text-center">Points</th>
                <th className="text-normal column col-2 text-center">Wins</th>
              </tr>
            </thead>
            <tbody>{drivers}</tbody>
          </table>
        </React.Fragment>
  )
}