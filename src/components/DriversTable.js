import React from "react";

export default function DriversTable(props) {
  const driversDetails =
    props.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  const drivers = [];

  driversDetails.forEach((driver) => {
    drivers.push(
      <tr key={driver.Driver.driverId}>
        <td className="text-center">{driver.position}</td>
        <td>{driver.Driver.givenName + " " + driver.Driver.familyName}</td>
        <td className="text-center">{driver.points}</td>
        <td className="text-center">{driver.wins}</td>
        <td className="text-center">{driver.podiums}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="text-normal column col-1 text-center">Rank</th>
          <th className="text-normal column col-5">Driver</th>
          <th className="text-normal column col-2 text-center">Points</th>
          <th className="text-normal column col-2 text-center">Wins</th>
          <th className="text-normal column col-2 text-center">Podiums</th>
        </tr>
      </thead>
      <tbody>{drivers}</tbody>
    </table>
  );
}
