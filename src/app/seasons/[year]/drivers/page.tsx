"use client";

import React, { useState, useEffect } from "react";

import LoadingIndicator from "../../../../components/LoadingIndicator";
import NextLink from "next/link";
import { getDriverStandings } from "../../../../../services/driverStandings";
import { DriverStanding } from "../../../../interfaces/Drivers";
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
import Navbar from "@/components/NavBar";

export default function Drivers({
  params,
}: {
  params: { year: string };
}): JSX.Element {
  const [driverStandings, setDriverStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let driverStandingsData;

        // Versuche, die Daten aus dem Local Storage zu holen
        const storedDriverStandingsData =
          localStorage.getItem(`driverStandingsData`);
        if (storedDriverStandingsData) {
          driverStandingsData = JSON.parse(storedDriverStandingsData);
        } else {
          driverStandingsData = await getDriverStandings();
          // Speichere die Daten im Local Storage
          localStorage.setItem(
            `driverStandingsData`,
            JSON.stringify(driverStandingsData)
          );
        }

        setDriverStandings(driverStandingsData);
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
    return <LoadingIndicator title="Driver Standings are loading..." />;
  }

  const filteredDriverStandings = driverStandings.find(
    (item) => item.season === params.year
  );

  const drivers: JSX.Element[] = [];

  filteredDriverStandings.DriverStandings.forEach((driver: any): void => {
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
    <Center mt="72px" mb={10}>
      <Container maxWidth="1200px" mx={[10, 20]}>
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Driver Standings
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
