import React from "react";

export default function ConstructorsTable(props) {
  const constructorsDetails = props.constructors.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  console.log("Details", constructorsDetails);
  const constructors = [];

  constructorsDetails.forEach((constructor) => {
  constructors.push(<tr><td className="text-center">{constructor.position}</td>
  <td>{constructor.Constructor.name}</td>
  <td className="text-center">{constructor.points}</td>
  <td className="text-center">{constructor.wins}</td>
  <td className="text-center"></td></tr>)
})
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
  <tbody>
    {constructors}
  </tbody>
</table>
  )
}