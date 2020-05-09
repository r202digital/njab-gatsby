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
import styled from "@emotion/styled";
import BackgroundImage from "gatsby-background-image";

const StyledBackground = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
  &:before {
    background-size: cover;
    background-position: center;
    background-color: black;
  }
`;

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
      {images.slice(0, 7).map((item, index) => (
        <Link
          href={
            item.link.hasOwnProperty("url")
              ? item.link.url
              : `/${item.link._meta.type}/${item.link._meta.uid}`
          }
          gridArea={{ xs: gridAreas[index].xs, md: gridAreas[index].md }}
        >
          {item.imageSharp ? (
            <StyledBackground fluid={item.imageSharp.childImageSharp.fluid} />
          ) : (
            <Box
              w="100%"
              h="100%"
              backgroundImage={`url("${item.image}")`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundColor="black"
            />
          )}
        </Link>
      ))}
    </Grid>
  );
};

export default Mosaic;
