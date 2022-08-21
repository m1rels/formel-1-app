import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import {Link} from "react-router-dom";
import { DriverStanding } from "../interfaces/Drivers";

export default function Drivers(): JSX.Element {
  const { year } = useParams();
  const [allDrivers, setAllDrivers] = useState<DriverStanding[] | undefined>(undefined);
  
  useEffect(() => {
    const loadDrivers = async (): Promise<void> => {
        const options = {};

        if (localStorage.getItem("drivers/" + year) === null) {

          const url = `http://localhost:8081/seasons/${year}/drivers`;
          const response = await fetch(url, options);
          const drivers = await response.json();
          setAllDrivers(drivers);
          console.log("Hallo", drivers);
          localStorage.setItem("drivers/" + year, JSON.stringify(drivers));
          return;

        } else {

          const saved = localStorage.getItem("drivers/" + year);
          if (saved) {
            const initialValue = JSON.parse(saved);
            setAllDrivers(initialValue);
          }

        }
        

      };

    loadDrivers();

  }, []);

  if (!allDrivers) {
    return <LoadingIndicator />;
  }

  const drivers: JSX.Element[] = [];

  allDrivers.forEach((driver): void => {
    drivers.push(
      <tr key={driver.driverId}>
        <td className="text-center">{driver.position}</td>
        <td><Link to={`/drivers/${driver.driverId}`}>{driver.givenName + " " + driver.familyName}</Link></td>
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