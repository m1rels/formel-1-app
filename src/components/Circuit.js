import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function Circuit() {
    const { circuitId } = useParams();
    const [circuitStandings, setCircuitStandings] = useState(null);

  useEffect(() => {
    const loadCircuit = async () => {
        const options = {};
        const url = `http://ergast.com/api/f1/circuits/${circuitId}.json`;
        const response = await fetch(url, options);
        const circuit = await response.json();
        console.log(circuit);
        const result = circuit.MRData.CircuitTable.Circuits;
        console.log("circuit", result);

        if (result.length) {
            setCircuitStandings(result);
            return;
        }

        setCircuitStandings([])
      };
    loadCircuit();
  }, []);

  if (!circuitStandings) {
    return <LoadingIndicator />;
  }

  console.log("circuit", circuitStandings);

  return (
    <React.Fragment>
      <h2>{circuitStandings[0].circuitName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Country: {circuitStandings[0].Location.country}
          </li>
          <li className="nav-item">
            Locality: {circuitStandings[0].Location.locality}
          </li>
          <li className="nav-item">
            More Information:<a href={circuitStandings[0].url}>Wikipedia</a>
          </li>
        </ul>
    </React.Fragment>
    
  )

  

}