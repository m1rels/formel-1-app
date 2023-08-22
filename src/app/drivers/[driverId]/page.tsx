"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { fetchDriverData } from "../../../../services/fomula-1-api";

export default function Driver({ params }: { params: { driverId: string } }) {
  const [driver, setDriver] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const driver = await fetchDriverData(params.driverId);
      console.log(driver);
      setDriver(driver);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Driver is loading..." />;
  }

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {driver[0].givenName +
          " " +
          driver[0].familyName}
      </Heading>
      <UnorderedList>
        <ListItem>Birth of Date: {driver[0].dateOfBirth}</ListItem>
        <ListItem>Nationality: {driver[0].nationality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={driver[0].url}
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
