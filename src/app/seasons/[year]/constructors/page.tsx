"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import Link from "next/link";
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
import { fetchConstructorStandingsData } from "../../../../../services/fomula-1-api";

export default function Constructors({ params }: { params: { year: string } }) {
  const [constructorStandings, setConstructorStandings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const constructorStandings = await fetchConstructorStandingsData(
        params.year
      );
      setConstructorStandings(constructorStandings);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Constructor Standings are loading..." />;
  }

  const constructors: JSX.Element[] = [];

  if (constructorStandings) {
    constructorStandings[0].ConstructorStandings.forEach((constructor: any) => {
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
    });
  }

  return (
    <Center mt="72px" mb={20}>
      <Container maxWidth="1200px" mx={[10, 20]}>
        <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
          Constructor Standings of {params.year}
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
