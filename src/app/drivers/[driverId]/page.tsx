import React from "react";
import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import DriverData from "@/components/Driver";

export async function generateStaticParams() {
  const response = await axios.get(`https://ergast.com/api/f1/drivers.json?limit=857`);

  const drivers = response.data.MRData.DriverTable.Drivers;

  return drivers.map((driver: any) => ({
    driverId: driver.id
  }))
}

async function getDriver(driverId: string) {
  const response = await axios.get(`https://ergast.com/api/f1/drivers/${driverId}.json?limit=857`);

  const driver = response.data.MRData.DriverTable.Drivers;

  return driver;
}

export default async function Driver({ params }: { params: { driverId: string } }) {

  const driver = await getDriver(params.driverId);

  if (driver === null) {
    return <LoadingIndicator title="Driver is loading..." />;
  }

  return (
    <DriverData givenName={driver[0].givenName} familyName={driver[0].familyName} dateOfBirth={driver[0].dateOfBirth} nationality={driver[0].nationality} url={driver[0].url}  />
  );
}
