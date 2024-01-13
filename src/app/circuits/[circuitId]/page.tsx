import React from "react";
import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import CircuitData from "@/components/Circuit";

export async function generateStaticParams() {
  const response = await axios.get("https://ergast.com/api/f1/circuits.json?limit=77");

  const circuits = response.data.MRData.CircuitTable.Circuits;

  return circuits.map((circuit: any) => ({
    circuitId: circuit.circuitId
  }))
}

async function getCircuit(circuitId: string) {
  const response = await axios.get(`https://ergast.com/api/f1/circuits/${circuitId}.json?limit=77`);

  const circuit = response.data.MRData.CircuitTable.Circuits;

  return circuit;
}

export default async function Circuit({ params }: { params: { circuitId: string } }) {

  const circuit = await getCircuit(params.circuitId);

  if (circuit === null) {
    return <LoadingIndicator title="Circuit is loading..." />;
  }

  return (
    <CircuitData name={circuit[0].circuitName} country={circuit[0].Location.country} locality={circuit[0].Location.locality} url={circuit[0].url}  />
  );
}
