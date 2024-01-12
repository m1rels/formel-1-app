"use client"

import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface TitleProps {
  title: string;
}

const LoadingIndicator: React.FC<TitleProps> = (props) => {
  return (
    <Box m={[5, 20]} mt="72px">
      <Text>{props.title}</Text>
    </Box>
  );
};

export default LoadingIndicator;
