"use client";

import { Box, ListItem, UnorderedList, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Driver(props:
    { givenName: string, familyName: string, dateOfBirth: string, nationality: string, url: string }) {

  return (
    <Box m={10} mt="72px">
      <Heading mb={10} fontSize={{ base: "24px", md: "30px", lg: "36px" }}>
        {props.givenName +
          " " +
          props.familyName}
      </Heading>
      <UnorderedList>
        <ListItem>Birth of Date: {props.dateOfBirth}</ListItem>
        <ListItem>Nationality: {props.nationality}</ListItem>
        <ListItem>
          More Information:{" "}
          <Link
            href={props.url}
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
