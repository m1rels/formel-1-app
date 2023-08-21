"use client";

import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { getCircuits } from "../../../services/circuits";
import {
  Card,
  CardBody,
  Box,
  ListItem,
  UnorderedList,
  Heading,
  SimpleGrid,
  Link,
  Center,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Navbar from "@/components/NavBar";

export default function Circuit({ params }: { params: { circuitId: string } }) {
  const [circuits, setCircuits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let circuitsData;

        // Versuche, die Daten aus dem Local Storage zu holen
        const storedConstructorStandingsData =
          localStorage.getItem(`circuitsData`);
        if (storedConstructorStandingsData) {
          circuitsData = JSON.parse(storedConstructorStandingsData);
        } else {
          circuitsData = await getCircuits();
          // Speichere die Daten im Local Storage
          localStorage.setItem(`circuitsData`, JSON.stringify(circuitsData));
        }

        setCircuits(circuitsData);
        setIsLoading(false);
        // Weitere Verarbeitung der Daten...
      } catch (error) {
        console.error("Error loading seasons:", error);
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Circuits are loading" />;
  }

  const circuitList: JSX.Element[] = [];

  circuits.forEach((circuit: any): void => {
    circuitList.push(
      <Card key={circuit.id}>
        <CardBody>
          <Center>
            <Box>
              <Heading
                mb={3}
                fontSize={{ base: "24px", md: "26px", lg: "28px" }}
              >
                {circuit.circuitName}
              </Heading>
              <UnorderedList fontSize={16} px={1}>
                <ListItem>Country: {circuit.Location.country}</ListItem>
                <ListItem>Locality: {circuit.Location.locality}</ListItem>
                <ListItem pr={2}>
                  More Information:{" "}
                  <Link
                    href={circuit.url}
                    as={NextLink}
                    isExternal
                    color={"gray.300"}
                  >
                    Wikipedia
                    <ExternalLinkIcon ml={2} />
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Center>
        </CardBody>
      </Card>
    );
  });

  return (
    <Box mx={[5, 20]} mb={10} mt="72px">
      <Box maxW={1200} m="auto">
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Circuits
        </Heading>
        <SimpleGrid spacingX={10} spacingY={[10, 20]} minChildWidth="300px">
          {circuitList}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
