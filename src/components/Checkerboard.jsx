import React from "react";
import Box from "@chakra-ui/core/dist/Box";
import Heading from "@chakra-ui/core/dist/Heading";
import Text from "@chakra-ui/core/dist/Text";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import Button from "@chakra-ui/core/dist/Button";
import Image from "@chakra-ui/core/dist/Image";
import Flex from "@chakra-ui/core/dist/Flex";
import List, { ListItem } from "@chakra-ui/core/dist/List";
import Grid from "@chakra-ui/core/dist/Grid";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import styled from "@emotion/styled";
import Link from "components/_ui/Link";

const CheckerboardLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #dd8d83;
  color: white;
  text-align: center;
  padding: 30px;
  display: flex;
  &:hover {
    text-decoration: initial;
    filter: brightness(0.95);
    color: white;
  }
`;

const ImageContainer = styled(Flex)`
  position: relative;

  & > span {
    width: 100%;
    display: block;

    & > span {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
  }
`;

const Checkerboard = ({ items = [] }) => {
  return (
    <Grid
      width="100%"
      height="auto"
      gridTemplateColumns={{ xs: "1fr", md: "1fr" }}
      gridTemplateRows={{
        xs: `1fr`,
        md: `repeat(${items.length}, 420px)`
      }}
      gridColumnGap="0px"
      gridRowGap="0px"
      textTransform="uppercase"
      color="#626163"
      letterSpacing="2.5px"
      fontSize="11px"
      fontWeight="500"
    >
      {items.map((item, index) => {
        return (
          <Flex
            flexWrap={{ xs: "wrap", md: "nowrap" }}
            flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
          >
            <ImageContainer
              flex={{ xs: "1 0 100%", md: "0 0 50%" }}
              // gridArea={{ md: gridAreas[index].image }}
              overflow="hidden"
              justifyContent="center"
              alignItems="center"
              maxHeight={{ xs: "250px", md: "initial" }}
            >
              <LazyLoad height="100%" placeholder={<Skeleton />}>
                <Image
                  maxWidth="initial"
                  src={item.image}
                  objectFit="cover"
                  height="auto"
                  width="150%"
                />
              </LazyLoad>
            </ImageContainer>

            <CheckerboardLink
              flex={{ xs: "1 0 100%", md: "0 0 50%" }}
              // gridArea={{ md: gridAreas[index].text }}
              to={item.link}
            >
              <PseudoBox
                _after={{
                  content: "''",
                  display: "block",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  my: "20px",
                  mx: "auto"
                }}
                width="75%"
              >
                <Heading
                  as="h3"
                  fontSize="18px"
                  letterSpacing="4px"
                  fontWeight="500"
                  lineHeight="1.5em"
                  fontFamily="Montserrat"
                >
                  {item.title}
                </Heading>
              </PseudoBox>
              <Text
                textTransform="initial"
                mb="30px"
                letterSpacing="0.2px"
                lineHeight="2em"
                fontSize="12px"
                fontFamily="Montserrat"
                px="40px"
              >
                {item.description}
              </Text>
              <Text
                borderBottom="1px solid white"
                fontWeight="700"
                letterSpacing="1px"
                fontFamily="Montserrat"
              >
                {item.link_text}
              </Text>
            </CheckerboardLink>
          </Flex>
        );
      })}
    </Grid>
  );
};

export default Checkerboard;
