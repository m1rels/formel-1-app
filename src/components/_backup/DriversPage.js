import React from "react";
import DriversTable from "./DriversTable";
import LoadingIndicator from "./LoadingIndicator";

export default function DriversPage() {
  const [allDrivers, setAllDrivers] = React.useState(null);
 const loadDrivers = async () => {
    const options = {
     
  };

  const url = `http://ergast.com/api/f1/driverStandings.json`;

  const response = await fetch(url, options);

  const drivers = await response.json();
    setAllDrivers(drivers);
    return;
  }

  React.useEffect(() => {
    loadDrivers();
  }, []);

  console.log(allDrivers);
  if(!allDrivers) {
    return <LoadingIndicator />;
  }

  return (
    <DriversTable drivers={allDrivers} />
  );
}