"use client";

import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { fetchCircuitData } from "../../../../services/fomula-1-api";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Circuit({ params }: { params: { circuitId: string } }) {
  const [circuit, setCircuit] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const circuit = await fetchCircuitData(params.circuitId);
      setCircuit(circuit);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Circuit is loading..." />;
  }

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {circuit[0].circuitName}
      </Heading>
      <UnorderedList>
        <ListItem>Country: {circuit[0].Location.country}</ListItem>
        <ListItem>Locality: {circuit[0].Location.locality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={circuit[0].url}
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
