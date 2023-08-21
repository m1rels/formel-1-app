"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { getDrivers } from "../../../../services/drivers";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Driver({ params }: { params: { driverId: string } }) {
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
    return <LoadingIndicator title="Driver is loading..." />;
  }

  const filteredDriversData: any = drivers.filter(
    (item) => item.driverId === params.driverId
  );

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {filteredDriversData[0].givenName +
          " " +
          filteredDriversData[0].familyName}
      </Heading>
      <UnorderedList>
        <ListItem>Birth of Date: {filteredDriversData[0].dateOfBirth}</ListItem>
        <ListItem>Nationality: {filteredDriversData[0].nationality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={filteredDriversData[0].url}
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
