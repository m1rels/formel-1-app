"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { fetchConstructorData } from "../../../../services/fomula-1-api";


export default function Constructor({ params }: { params: { constructorId: string } }) {
  const [constructor, setConstructor] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const constructor = await fetchConstructorData(params.constructorId);
      setConstructor(constructor);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator title="Constructor is loading..." />;
  }

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {constructor[0].name}
      </Heading>
      <UnorderedList>
        <ListItem>Nationality: {constructor[0].nationality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={constructor[0].url}
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
