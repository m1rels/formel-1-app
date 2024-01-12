"use client";

import React, { useEffect, useState } from "react";
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
  Container,
  Link,
  Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Races(props:
    { races: any, season: string }) {

  
      const raceDetails: JSX.Element[] = [];

      props.races.forEach((race: any): void => {
        raceDetails.push(
          <Tr key={race.round}>
            <Td>{race.round}</Td>
            <Td color="gray.400">
              <Link href={race.url} as={NextLink}>
                {race.raceName}
                <ExternalLinkIcon mx={2} />
              </Link>
            </Td>
            <Td>{race.date}</Td>
            <Td color="gray.400">
              <Link href={`/circuits/${race.Circuit.circuitId}`} as={NextLink}>
                {race.Circuit.circuitName}
              </Link>
            </Td>
          </Tr>
        );
      });
    
      return (
        <Center mt="72px" mb={20}>
          <Container maxWidth="1200px" mx={[10, 20]}>
            <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
              Race Schedule of {props.season}
            </Heading>
            <TableContainer>
              <Table size={["sm", "md"]}>
                <Thead>
                  <Tr>
                    <Th>Round</Th>
                    <Th>Race Name</Th>
                    <Th>Date</Th>
                    <Th>Circuit</Th>
                  </Tr>
                </Thead>
                <Tbody>{raceDetails}</Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Round</Th>
                    <Th>Race Name</Th>
                    <Th>Date</Th>
                    <Th>Circuit</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Container>
        </Center>
      );
}
