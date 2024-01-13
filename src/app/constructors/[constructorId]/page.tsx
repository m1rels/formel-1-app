import React from "react";
import axios from "axios";
import LoadingIndicator from "@/components/LoadingIndicator";
import ConstructorData from "@/components/Constructor";

export async function generateStaticParams() {
  const response = await axios.get(`https://ergast.com/api/f1/constructors.json?limit=211`);

  const constructors = response.data.MRData.ConstructorTable.Constructors

  return constructors.map((constructor: any) => ({
    constructorId: constructor.constructorId
  }))
}

async function getConstructor(constructorId: string) {
  const response = await axios.get(`https://ergast.com/api/f1/constructors/${constructorId}.json?limit=211`);

  const constructor = response.data.MRData.ConstructorTable.Constructors;

  return constructor;
}

export default async function Constructor({ params }: { params: { constructorId: string } }) {

  const constructor = await getConstructor(params.constructorId);

  console.log()

  if (constructor === null) {
    return <LoadingIndicator title="Constructor is loading..." />;
  }

  return (
    <ConstructorData name={constructor[0].name} nationality={constructor[0].nationality} url={constructor[0].url}  />
  );
}
