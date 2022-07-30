import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function Season() {
  const { year } = useParams();
  const [allDrivers, setAllDrivers] = useState(null);
  const [allConstructors, setAllConstructors] = useState(null);

  useEffect(() => {
    const loadDrivers = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
        const response = await fetch(url, options);
        const drivers = await response.json();
        const result = drivers.MRData.StandingsTable.StandingsLists;

        if (drivers.MRData.StandingsTable.StandingsLists.length) {
            setAllDrivers(result[0].DriverStandings);
            return;
        }

        setAllDrivers([])
      };
    loadDrivers();
  }, []);

  useEffect(() => {
    const loadConstructors = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/${year}/constructorStandings.json`;
        const response = await fetch(url, options);
        const constructors = await response.json();
        const result = constructors.MRData.StandingsTable.StandingsLists;

        if (constructors.MRData.StandingsTable.StandingsLists.length) {
            setAllConstructors(result[0].ConstructorStandings);
            return;
        }
        setAllConstructors([])
        return;
      };
    loadConstructors();
  }, []);

  if (!allDrivers || !allConstructors) {
    return <LoadingIndicator />;
  }

  const drivers = [];

  allDrivers.forEach((driver) => {
    drivers.push(
      <tr key={driver.Driver.driverId}>
        <td className="text-center">{driver.position}</td>
        <td>{driver.Driver.givenName + " " + driver.Driver.familyName}</td>
        <td className="text-center">{driver.points}</td>
        <td className="text-center">{driver.wins}</td>
      </tr>
    );
  });

  const constructors = [];

  allConstructors.forEach((constructor) => {
    constructors.push(
      <tr key={constructor.Constructor.constructorId}>
        <td className="text-center">{constructor.position}</td>
        <td>{constructor.Constructor.name}</td>
        <td className="text-center">{constructor.points}</td>
        <td className="text-center">{constructor.wins}</td>
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
      {
        allConstructors.length ?
        <React.Fragment>
        <h2>Constructors</h2><table className="table">
        <thead>
          <tr>
            <th className="text-normal column col-1 text-center">Rank</th>
            <th className="text-normal column col-5">Driver</th>
            <th className="text-normal column col-2 text-center">Points</th>
            <th className="text-normal column col-2 text-center">Wins</th>
          </tr>
        </thead>
        <tbody>{constructors}</tbody>
      </table></React.Fragment> : ''
      }
      
    </React.Fragment>
  );
}
