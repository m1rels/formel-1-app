"use client";

import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { getCircuits } from "../../../../services/circuits";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

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
    return <LoadingIndicator title="Circuit is loading..." />;
  }

  const filteredCircuitsData = circuits.find(
    (item) => item.circuitId === params.circuitId
  );

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {filteredCircuitsData.circuitName}
      </Heading>
      <UnorderedList>
        <ListItem>Country: {filteredCircuitsData.Location.country}</ListItem>
        <ListItem>Locality: {filteredCircuitsData.Location.locality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={filteredCircuitsData.url}
            as={NextLink}
            isExternal
            color="gray.300"
          >
            Wikipedia
            <ExternalLinkIcon mx={2} />
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
}
