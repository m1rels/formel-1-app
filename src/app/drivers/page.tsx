"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { getDrivers } from "../../../services/drivers";
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
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let driversData;

        // Versuche, die Daten aus dem Local Storage zu holen
        const storedDriversData = localStorage.getItem(`driversData`);
        if (storedDriversData) {
          driversData = JSON.parse(storedDriversData);
        } else {
          driversData = await getDrivers();
          // Speichere die Daten im Local Storage
          localStorage.setItem(`driversData`, JSON.stringify(driversData));
        }

        setDrivers(driversData);
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
    return <LoadingIndicator title="Drivers are loading..." />;
  }

  const driverList: JSX.Element[] = [];

  drivers.forEach((driver: any): void => {
    driverList.push(
      <Card key={driver.id}>
        <CardBody>
          <Center>
            <Box>
              <Heading
                mb={3}
                fontSize={{ base: "24px", md: "26px", lg: "28px" }}
              >
                {driver.familyName + ", " + driver.givenName}
              </Heading>
              <UnorderedList fontSize={16} px={1}>
                <ListItem>Birth of Date: {driver.dateOfBirth}</ListItem>
                <ListItem>Nationality: {driver.nationality}</ListItem>
                <ListItem pr={2}>
                  More Information:{" "}
                  <Link
                    href={driver.url}
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
    <Box m={[5, 20]} mb={10} mt="72px">
      <Box maxW={1200} m="auto">
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Drivers
        </Heading>
        <SimpleGrid spacingX={10} spacingY={[10, 20]} minChildWidth="250px">
          {driverList}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
