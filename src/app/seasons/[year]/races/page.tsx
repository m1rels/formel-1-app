import React from "react";
import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import RacesData from "@/components/Races";

export async function generateStaticParams() {
  const season: any = await axios.get("https://ergast.com/api/f1/seasons.json?limit=74");
  const seasons = season.data.MRData.SeasonTable.Seasons;

  return seasons.map((season: any) => ({
    year: season.season
  }))
}

async function getRaces(year: string) {
  const response = await axios.get(`https://ergast.com/api/f1/${year}.json`);

  const racesData = response.data.MRData.RaceTable.Races;

  return racesData;
}

export default async function Races({ params }: { params: { year: string } }) {

  const races = await getRaces(params.year);

  if (races === null) { 
    return <LoadingIndicator title="Race Schedule is loading..." />;
  }

  return ( 
    <RacesData races={races} season={params.year}  />
  );

  
}
   