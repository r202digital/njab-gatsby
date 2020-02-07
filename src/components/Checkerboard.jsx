import React from "react";

import {
  Box,
  Heading,
  Text,
  PseudoBox,
  Button,
  Image,
  Flex,
  List,
  ListItem,
  Grid
} from "@chakra-ui/core";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import styled from "@emotion/styled";
import Link from "components/_ui/Link";

const CheckerboardLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #dd8d83;
  color: white;
  text-align: center;
  px: 25%;
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
      gridTemplateColumns="repeat(2, 50%)"
      gridTemplateRows="repeat(5, 420px)"
      gridColumnGap="0px"
      gridRowGap="0px"
      textTransform="uppercase"
      color="#626163"
      letterSpacing="2.5px"
      fontSize="11px"
      fontWeight="500"
    >
      {items.map((item, index) =>
        (index + 1) % 2 !== 0 ? (
          <>
            <ImageContainer
              overflow="hidden"
              justifyContent="center"
              alignItems="center"
            >
              <LazyLoad height="100%" placeholder={<Skeleton />}>
                <Image
                  maxWidth="initial"
                  src={
                    item.checkerboard_image
                      ? item.checkerboard_image.url
                      : item.node.post_hero_image.url
                  }
                  objectFit="cover"
                  height="auto"
                  width="150%"
                />
              </LazyLoad>
            </ImageContainer>

            <CheckerboardLink
              to={
                item.node && item.node.post_title
                  ? `/blog/${item.node._meta.uid}`
                  : ""
              }
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
                  {item.checkerboard_heading
                    ? item.checkerboard_heading[0].text
                    : item.node.post_title[0].text}
                </Heading>
              </PseudoBox>
              <Text
                textTransform="initial"
                mb="30px"
                letterSpacing="0.2px"
                lineHeight="2em"
                fontSize="12px"
                fontFamily="Montserrat"
              >
                {item.checkerboard_text
                  ? item.checkerboard_text[0].text
                  : item.node.post_preview_description[0].text}
              </Text>
              <Text
                borderBottom="1px solid white"
                fontWeight="700"
                letterSpacing="1px"
                fontFamily="Montserrat"
              >
                {item.checkerboard_link
                  ? item.checkerboard_link[0].text
                  : "Read More"}
              </Text>
            </CheckerboardLink>
          </>
        ) : (
          <>
            <CheckerboardLink
              to={
                item.node && item.node.post_title
                  ? `/blog/${item.node._meta.uid}`
                  : ""
              }
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
                  {item.checkerboard_heading
                    ? item.checkerboard_heading[0].text
                    : item.node.post_title[0].text}
                </Heading>
              </PseudoBox>
              <Text
                textTransform="initial"
                mb="30px"
                letterSpacing="0.2px"
                lineHeight="2em"
                fontSize="12px"
                fontFamily="Montserrat"
              >
                {item.checkerboard_text
                  ? item.checkerboard_text[0].text
                  : item.node.post_preview_description[0].text}
              </Text>
              <Text
                borderBottom="1px solid white"
                fontWeight="700"
                letterSpacing="1px"
                fontFamily="Montserrat"
              >
                {item.checkerboard_link
                  ? item.checkerboard_link[0].text
                  : "Read More"}
              </Text>
            </CheckerboardLink>

            <ImageContainer
              overflow="hidden"
              justifyContent="center"
              alignItems="center"
            >
              <LazyLoad height="100%" placeholder={<Skeleton />}>
                <Image
                  maxWidth="initial"
                  src={
                    item.checkerboard_image
                      ? item.checkerboard_image.url
                      : item.node.post_hero_image.url
                  }
                  objectFit="cover"
                  height="auto"
                  width="150%"
                />
              </LazyLoad>
            </ImageContainer>
          </>
        )
      )}
    </Grid>
  );
};

export default Checkerboard;
