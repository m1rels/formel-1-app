import LoadingIndicator from "@/components/LoadingIndicator";
import axios from "axios";
import DriversData from "@/components/Drivers";

async function getDrivers() {
  const response = await axios.get(`https://ergast.com/api/f1/drivers.json?limit=857`);

  const drivers = response.data.MRData.DriverTable.Drivers;

  return drivers;
}


export default async function Drivers() {
  const drivers = await getDrivers();
  
  if (drivers === null)
    return <LoadingIndicator title="Drivers are loading..." />;

return(
  <DriversData drivers={drivers} />
)
    
}
