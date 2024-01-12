import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import axios from "axios";
import CircuitsData from "@/components/Circuits";

async function getCircuits() {
  const response = await axios.get("https://ergast.com/api/f1/circuits.json?limit=77");

  const circuits =  response.data.MRData.CircuitTable.Circuits;

  return circuits;
}

export default async function Circuits() {

  const circuits = await getCircuits();
  

  if (circuits === null) {
    return <LoadingIndicator title="Circuits are loading..." />;
  }

  return (
    <CircuitsData circuits={circuits} />
  )

}
