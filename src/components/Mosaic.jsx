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
    { xs: "1 / 1 / 3 / 3", md: "1 / 1 / 3 / 2" },
    { xs: "1 / 3 / 2 / 4", md: "1 / 2 / 2 / 3" },
    { xs: "2 / 3 / 3 / 4", md: "2 / 2 / 3 / 3" },
    { xs: "3 / 1 / 4 / 2", md: "1 / 3 / 3 / 4" },
    { xs: "4 / 1 / 5 / 2", md: "1 / 4 / 2 / 5" },
    { xs: "3 / 2 / 5 / 4", md: "2 / 4 / 3 / 5" },
    { xs: "5 / 1 / 7 / 4", md: "1 / 5 / 3 / 6" }
  ];
  return (
    <Grid
      height={height}
      templateColumns={{ xs: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
      templateRows={{ xs: "repeat(4, 1fr) 2fr", md: "repeat(2, 1fr)" }}
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
          gridArea={{ xs: gridAreas[index].xs, md: gridAreas[index].md }}
        />
      ))}
    </Grid>
  );
};

export default Mosaic;
