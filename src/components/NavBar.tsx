"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={4}
      bg={bgColor[colorMode]}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1}
    >
      <Box>
        <Link
          href="/formula-1"
          fontSize="50px"
          fontWeight="bold"
          position="relative"
          top={-2}
          m={0}
          _hover={{ textDecoration: "none" }}
          _focus={{ textDecoration: "none" }}
        >
          🏎️
        </Link>
      </Box>
      <Box>
        <Flex align="center" fontSize={16}>
          <IconButton
            aria-label="Toggle Dark/Light Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr="4"
          />
          <Box display={{ base: "none", md: "block" }}>
            <Link href="/seasons" mr="4" as={NextLink}>
              Seasons
            </Link>
            <Link href="/drivers" mr="4" as={NextLink}>
              Drivers
            </Link>
            <Link href="/constructors" mr="4" as={NextLink}>
              Constructors
            </Link>
            <Link href="/circuits" mr="4" as={NextLink}>
              Circuits
            </Link>
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              display={{ base: "block", md: "none" }}
            />
            <MenuList>
              <MenuItem as={NextLink} mr={4} href="/seasons">
                Seasons
              </MenuItem>
              <MenuItem as={NextLink} mr={4} href="/drivers">
                Drivers
              </MenuItem>
              <MenuItem as={NextLink} mr={4} href="/constructors">
                Constructors
              </MenuItem>
              <MenuItem as={NextLink} mr={4} href="/circuits">
                Circuits
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
}
