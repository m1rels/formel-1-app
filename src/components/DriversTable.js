import React from "react";

export default function DriversTable() {
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
    <tr>
      <td className="text-center"><b>1</b></td>
      <td><b>M. Verstappen</b></td>
      <td className="text-center"><b>175</b></td>
      <td className="text-center"><b>6</b></td>
      <td className="text-center"><b>7</b></td>
    </tr>
  </tbody>
</table>
  )
}