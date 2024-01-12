"use client";

import React, { useState, useEffect } from "react";
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

export default function Drivers( props: { driver: any, season: string }): JSX.Element {

  const drivers: JSX.Element[] = [];

  props.driver.DriverStandings.forEach((driver: any): void => {
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
          Driver Standings of {props.season}
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
  )
}
