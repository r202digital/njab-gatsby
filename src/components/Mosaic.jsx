import React from "react";
import {
  Flex,
  List,
  ListItem,
  Stack,
  Link,
  Text,
  Grid,
  Box
} from "@chakra-ui/core";

const Mosaic = ({ children, height = "200px", images, ...props }) => {
  const gridAreas = [
    "1 / 1 / 3 / 2",
    "1 / 2 / 2 / 3",
    "2 / 2 / 3 / 3",
    "1 / 3 / 3 / 4",
    "1 / 4 / 2 / 5",
    "2 / 4 / 3 / 5",
    "1 / 5 / 3 / 6"
  ];
  return (
    <Grid
      height={height}
      templateColumns="repeat(5, 1fr)"
      templateRows="repeat(2, 1fr)"
      gap={5}
    >
      {images.map((item, index) => (
        <Box
          w="100%"
          h="100%"
          backgroundImage={`url("${item}")`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundColor="black"
          gridArea={gridAreas[index]}
        />
      ))}
      {/* <Box w="100%" h="100%" bg="blue.500" gridArea="1 / 1 / 3 / 2" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="1 / 2 / 2 / 3" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="2 / 2 / 3 / 3" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="1 / 3 / 3 / 4" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="1 / 4 / 2 / 5" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="2 / 4 / 3 / 5" />
      <Box w="100%" h="100%" bg="blue.500" gridArea="1 / 5 / 3 / 6" /> */}
    </Grid>
  );
};

export default Mosaic;
