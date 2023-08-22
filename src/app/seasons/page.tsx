"use client";

import React, { useEffect, useState, ReactElement } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import NextLink from "next/link";
import {
  Card,
  CardBody,
  Box,
  ListItem,
  UnorderedList,
  Link,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { fetchSeasonsData } from "../../../services/fomula-1-api";

export default function Seasons(): any {
  const [allSeasons, setAllSeasons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const seasons = await fetchSeasonsData();
      setAllSeasons(seasons);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading || !allSeasons) {
    return <LoadingIndicator title="Seasons are loading..." />;
  }

  const seasons: ReactElement<any, any>[] = [];

  for (let i = 0; i < 8; i++) {
    seasons.push(
      <Card key={allSeasons[i].id}>
        <CardBody>
          <Center>
            <Box>
              <Heading
                mb={3}
                fontSize={{ base: "24px", md: "26px", lg: "28px" }}
              >
                {allSeasons[i].season}
              </Heading>
              <UnorderedList>
                <ListItem>
                  <Link
                    href={`/seasons/${allSeasons[i].season}/drivers`}
                    as={NextLink}
                  >
                    Drivers
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={`/seasons/${allSeasons[i].season}/races`}
                    as={NextLink}
                  >
                    Race Schedule
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Center>
        </CardBody>
      </Card>
    );
  }

  for (let i = 8; i < 74; i++) {
    seasons.push(
      <Card key={allSeasons[i].id}>
        <CardBody>
          <Center>
            <Box>
              <Heading
                mb={3}
                fontSize={{ base: "24px", md: "26px", lg: "28px" }}
              >
                {allSeasons[i].season}
              </Heading>
              <UnorderedList fontSize={16}>
                <ListItem>
                  <Link
                    href={`/seasons/${allSeasons[i].season}/drivers`}
                    as={NextLink}
                  >
                    Drivers
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={`/seasons/${allSeasons[i].season}/constructors`}
                    as={NextLink}
                  >
                    Constructors
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={`/seasons/${allSeasons[i].season}/races`}
                    as={NextLink}
                  >
                    Race Schedule
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Box m={[5, 20]} mt="72px" mb={20}>
      <Box maxW={1200} m="auto">
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Seasons
        </Heading>
        <SimpleGrid spacingX={10} spacingY={[10, 20]} minChildWidth="180px">
          {seasons}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
