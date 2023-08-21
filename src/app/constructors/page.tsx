"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { getConstructors } from "../../../services/constructors";
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

export default function Constructor() {
  const [constructors, setConstrcutors] = useState<any[]>([]);
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
            `constrcutorsData`,
            JSON.stringify(constructorsData)
          );
        }

        setConstrcutors(constructorsData);
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
    return <LoadingIndicator title="Constructors are loading..." />;
  }

  console.log(constructors);
  const constructorList: JSX.Element[] = [];

  constructors.forEach((constructor: any): void => {
    constructorList.push(
      <Card key={constructor.id}>
        <CardBody>
          <Center>
            <Box>
              <Heading
                mb={3}
                fontSize={{ base: "24px", md: "26px", lg: "28px" }}
              >
                {constructor.name}
              </Heading>
              <UnorderedList fontSize={16} px={1}>
                <ListItem>Nationality: {constructor.nationality}</ListItem>
                <ListItem pr={2}>
                  More Information:{" "}
                  <Link
                    href={constructor.url}
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
          Constructors
        </Heading>
        <SimpleGrid spacingX={10} spacingY={[10, 20]} minChildWidth="250px">
          {constructorList}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
