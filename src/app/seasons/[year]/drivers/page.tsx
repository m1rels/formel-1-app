"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import NextLink from "next/link";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Container,
  Link,
} from "@chakra-ui/react";
import { fetchDriverStandingsData } from "../../../../../services/fomula-1-api";

export default function Drivers({
  params,
}: {
  params: { year: string };
}): JSX.Element {
  const [driverStandings, setDriverStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const seasons = await fetchDriverStandingsData(params.year);
      setDriverStandings(seasons);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Driver Standings are loading..." />;
  }

  const drivers: JSX.Element[] = [];

  driverStandings[0].DriverStandings.forEach((driver: any): void => {
    drivers.push(
      <Tr key={driver.Driver.driverId}>
        <Td className="text-center">{driver.position}</Td>
        <Td color="gray.400">
          <Link href={`/drivers/${driver.Driver.driverId}`} as={NextLink}>
            {driver.Driver.givenName + " " + driver.Driver.familyName}
          </Link>
        </Td>
        <Td className="text-center">{driver.points}</Td>
        <Td className="text-center">{driver.wins}</Td>
      </Tr>
    );
  });

  return (
    <Center mt="72px" mb={20}>
      <Container maxWidth="1200px" mx={[10, 20]}>
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Driver Standings of {params.year}
        </Heading>
        <TableContainer>
          <Table size={["sm", "md"]}>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Drivers</Th>
                <Th>Points</Th>
                <Th>Wins</Th>
              </Tr>
            </Thead>
            <Tbody>{drivers}</Tbody>
            <Tfoot>
              <Tr>
                <Th>Rank</Th>
                <Th>Constructor</Th>
                <Th>Points</Th>
                <Th>Wins</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    </Center>
  );
}
