import React from "react";
import SeasonsTable from "./SeasonsTable";
import LoadingIndicator from "./LoadingIndicator";

export default function SeasonsPage() {
  const [allSeasons, setAllSeasons] = React.useState(null);

 const loadSeasons = async () => {
    const options = {
     
  };

  const url = `http://ergast.com/api/f1/seasons.json`;

  const response = await fetch(url, options);

  const seasons = await response.json();
    setAllSeasons(seasons);
    return;
  }

  React.useEffect(() => {
    loadSeasons();
  }, []);

  if(!allSeasons) {
    return <LoadingIndicator />;
  }

  return (
    <SeasonsTable seasons={allSeasons} />
  );
}