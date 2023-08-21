"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { getConstructors } from "../../../../services/constructors";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";


export default function Constructor({
  params,
}: {
  params: { constructorId: string };
}) {
  const [constructors, setConstructors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let constructorsData;

        // Versuche, die Daten aus dem Local Storage zu holen
        const storedConstructorsData = localStorage.getItem(`constructorsData`);
        if (storedConstructorsData) {
          constructorsData = JSON.parse(storedConstructorsData);
        } else {
          constructorsData = await getConstructors();
          // Speichere die Daten im Local Storage
          localStorage.setItem(
            `constructorsData`,
            JSON.stringify(constructorsData)
          );
        }

        setConstructors(constructorsData);
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
    return <LoadingIndicator title="Constructor is loading..." />;
  }

  const filteredConstructorsData = constructors.find(
    (item) => item.constructorId === params.constructorId
  );

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {filteredConstructorsData.name}
      </Heading>
      <UnorderedList>
        <ListItem>Nationality: {filteredConstructorsData.nationality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={filteredConstructorsData.url}
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
