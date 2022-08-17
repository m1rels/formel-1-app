import React, { ReactElement } from "react";
import "./styles.css";
import "./App.css";
import LoadingIndicator from "./components/LoadingIndicator";
import { Link } from "react-router-dom";
import { Root, Season } from "./interfaces/Seasons";

export default function App(): JSX.Element {
  const [allSeasons, setAllSeasons] = React.useState<Season[] | undefined>(undefined);
  
  React.useEffect(() => {
    async function loadData () {

      if (localStorage.getItem("seasons") === null) {

        const response = await fetch(`http://localhost:8081/seasons`, {});
        const seasons: Root = await response.json();
        setAllSeasons(seasons.MRData.SeasonTable.Seasons);
        console.log("Season", seasons.MRData.SeasonTable.Seasons)
        localStorage.setItem("seasons", JSON.stringify(seasons.MRData.SeasonTable.Seasons));
        return;

      } else {

        const saved = localStorage.getItem("seasons")
        if (saved) {
          const initialValue = JSON.parse(saved);
          setAllSeasons(initialValue);
        }
        return;

      }
        
    }
    loadData();
  }, []);



  if (!allSeasons) {
    return <LoadingIndicator />;
  }


  const seasons: ReactElement<any, any>[] = [];

for(let i=0; i<8; i++) {
  seasons.push(
    <React.Fragment key={allSeasons[i].season}>
      <h3 className="m-1 mt-2">{allSeasons[i].season}</h3>
      <li>
        <Link to={`/seasons/${allSeasons[i].season}/drivers`}>Drivers</Link>
      </li>
      <li>
        <Link to={`/seasons/${allSeasons[i].season}/races`}>Race Schedule</Link>
      </li>
      </React.Fragment>
  )

} 

for(let i=8; i<73; i++) {
  
  seasons.push(
    <React.Fragment key={allSeasons[i].season}>
      <h3 className="m-1 mt-2">{allSeasons[i].season}</h3>
      <li>
        <Link to={`/seasons/${allSeasons[i].season}/drivers`}>Drivers</Link>
      </li>
      <li>
        <Link to={`/seasons/${allSeasons[i].season}/constructors`}>Constructors</Link>
      </li>
      <li>
        <Link to={`/seasons/${allSeasons[i].season}/races`}>Race Schedule</Link>
      </li>
      </React.Fragment>
    );
}

  
    return <React.Fragment>{seasons}</React.Fragment>;
}
