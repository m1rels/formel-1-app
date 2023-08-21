"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import Link from "next/link";
import { getConstructorStandings } from "../../../../../services/constructorsStandings";
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
} from "@chakra-ui/react";
import Navbar from "@/components/NavBar";

export default function Constructors({ params }: { params: { year: string } }) {
  const [constructorStandings, setConstructorStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let constructorStandingsData;

        // Versuche, die Daten aus dem Local Storage zu holen
        const storedConstructorStandingsData = localStorage.getItem(
          `constructorStandingsData`
        );
        if (storedConstructorStandingsData) {
          constructorStandingsData = JSON.parse(storedConstructorStandingsData);
        } else {
          constructorStandingsData = await getConstructorStandings();
          // Speichere die Daten im Local Storage
          localStorage.setItem(
            `constructorStandingsData`,
            JSON.stringify(constructorStandingsData)
          );
        }

        setConstructorStandings(constructorStandingsData);
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
    return <LoadingIndicator title="Constructor Standings are loading..." />;
  }

  const filteredConstructorStandings = constructorStandings.find(
    (item) => item.season === params.year
  );

  const constructors: JSX.Element[] = [];

  if (filteredConstructorStandings) {
    filteredConstructorStandings.ConstructorStandings.forEach(
      (constructor: any) => {
        constructors.push(
          <Tr key={constructor.Constructor.constructorId}>
            <Td>{constructor.position}</Td>
            <Td color="gray.400">
              <Link
                href={`/constructors/${constructor.Constructor.constructorId}`}
              >
                {constructor.Constructor.name}
              </Link>
            </Td>
            <Td className="text-center">{constructor.points}</Td>
            <Td className="text-center">{constructor.wins}</Td>
          </Tr>
        );
      }
    );
  }

  return (
    <Center mt="72px" mb={10}>
      <Container maxWidth="1200px" mx={[10, 20]}>
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Constructor Standings
        </Heading>
        <TableContainer>
          <Table size={["sm", "md"]}>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Constructor</Th>
                <Th>Points</Th>
                <Th>Wins</Th>
              </Tr>
            </Thead>
            <Tbody>{constructors}</Tbody>
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
