import React from "react";

export default function DriversTable() {
  return (
    <table className="table">
  <thead>
    <tr>
      <th className="text-normal">Rank</th>
      <th className="text-normal">Driver</th>
      <th className="text-normal">Points</th>
      <th className="text-normal">Wins</th>
      <th className="text-normal">Podiums</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>1</b></td>
      <td><b>Red Bull</b></td>
      <td><b>304</b></td>
      <td><b>7</b></td>
      <td><b>12</b></td>
    </tr>
  </tbody>
</table>
  )
}