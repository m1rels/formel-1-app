import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function Circuit() {
    const { circuitId } = useParams();
    const [circuitStandings, setCircuitStandings] = useState([]);

  useEffect(() => {
    const loadCircuit = async () => {
        const options = {};

        if (localStorage.getItem("circuitStandings") === null) {

          const url = `http://ergast.com/api/f1/circuits/${circuitId}.json`;
          const response = await fetch(url, options);
          const circuit: any = await response.json();
          const result = circuit.MRData.CircuitTable.Circuits;
          setCircuitStandings(result);
          localStorage.setItem("circuits/" + circuitId, JSON.stringify(result));
          return;

        } else {

            const saved = localStorage.getItem("circuits/" + circuitId);
            if (saved) {
              const initialValue = JSON.parse(saved);
              setCircuitStandings(initialValue);
            }
        
            return;

        }
        
      };

    loadCircuit();

  }, []);

  if (!circuitStandings) {
    return <LoadingIndicator />;
  }


  return (
    <React.Fragment>
      <h2>{(circuitStandings[0] as any).circuitName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Country: {(circuitStandings[0] as any).Location.country}
          </li>
          <li className="nav-item">
            Locality: {(circuitStandings[0] as any).Location.locality}
          </li>
          <li className="nav-item">
            More Information:<a href={(circuitStandings[0] as any).url}>Wikipedia</a>
          </li>
        </ul>
    </React.Fragment>
  )

  

}