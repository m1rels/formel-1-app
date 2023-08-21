"use client";

import React from "react";
import NextLink from "next/link";
import {
  Center,
  Heading,
  ListItem,
  UnorderedList,
  Box,
  Link,
} from "@chakra-ui/react";

export default function App(): JSX.Element {
  return (
    <Center h="100vh" mx={[5]}>
      <Box flex="1">
        <Heading
          mb={10}
          fontSize={{ base: "24px", md: "30px", lg: "36px" }}
          textAlign="center"
        >
          Welcome to Formula 1 🏁
        </Heading>
        <Box>
          <Heading
            fontSize={{ base: "18px", md: "24px", lg: "30px" }}
            textAlign="center"
            fontWeight={500}
          >
            Let&apos;s experience the history of the Formula 1 World!
          </Heading>
          <Center>
            <UnorderedList fontSize={16} mt={5}>
              <ListItem>
                <Link href="/seasons" as={NextLink}>
                  Seasons
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/drivers" as={NextLink}>
                  Drivers
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/constructors" as={NextLink}>
                  Constructors
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/circuits" as={NextLink}>
                  Circuits
                </Link>
              </ListItem>
            </UnorderedList>
          </Center>
        </Box>
      </Box>
    </Center>
  );
}
