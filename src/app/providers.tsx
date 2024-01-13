"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/theme";
import { ColorModeScript } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}><ColorModeScript initialColorMode={theme.config.initialColorMode} />{children}</ChakraProvider>
    </CacheProvider>
  );
}
