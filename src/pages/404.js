import React from "react";
import Layout from "components/Layout";
import colors from "styles/colors";
import styled from "@emotion/styled";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import Grid from "@chakra-ui/core/dist/Grid";
import Image from "@chakra-ui/core/dist/Image";
import Link from "components/_ui/Link";

const UnderlineBox = styled(Box)`
  position: relative;

  &:after {
    position: absolute;
    content: "";
    height: 2px;
    width: 25%;
    background-color: ${colors.njabDarkPink};
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

const HomeLink = styled(Link)`
  text-transform: uppercase;
  border: 1px solid ${colors.njabMidPink};
  padding: 10px 25px;
  font-size: 0.8rem;
  font-weight: 600;

  &:hover {
    text-decoration: initial;
    background-color: ${colors.njabLightPink};
  }
`;

const NotFoundPage = () => (
  <Layout>
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color={colors.njabDarkPink}
      height="calc(100vh - 410px)"
    >
      <UnderlineBox>
        <Heading as="h1" margin="0" fontSize="5rem">
          404
        </Heading>
      </UnderlineBox>
      <Text fontWeight="700" letterSpacing="3px">
        OOPS! PAGE NOT FOUND
      </Text>
      <HomeLink to="/home">Go back to home</HomeLink>
    </Flex>
  </Layout>
);

export default NotFoundPage;
