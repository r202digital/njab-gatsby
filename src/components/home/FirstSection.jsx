import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Section from "components/Section";
import Layout from "components/Layout";
import Mosaic from "components/Mosaic";
import dayjs from "dayjs";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";
import Loadable from "react-loadable";
import Link from "components/_ui/Link";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";

import { getPrismicImage, convertImageSharp } from "../../lib/PrismicFunctions";

const PrismicRichText = Loadable({
  loader: () => import("prismic-reactjs"),
  delay: 50,
  render(loaded, props) {
    const { RichText } = loaded;
    return <RichText {...props} />;
  },
  loading() {
    return <div />;
  },
});

const DoubleSlider = Loadable({
  loader: () => import("../DoubleSlider"),
  loading() {
    return <div />;
  },
});

const DisjointedSlider = Loadable({
  loader: () => import("../DisjointedSlider"),
  loading() {
    return <div />;
  },
});

const Hero = styled(Box)`
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.25rem;
    letter-spacing: 2px;
    font-family: Proxima Nova, -apple-system, BlinkMacSystemFont, Helvetica,
      sans-serif;
    text-align: center;

    em {
      text-decoration: line-through;
      color: ${colors.red500};

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;
        color: ${colors.red600};
        background-color: ${colors.red200};
      }
    }

    a,
    strong {
      text-decoration: none;
      transition: all 100ms ease-in-out;
      font-weight: 500;
    }
  }
`;

const StyledRichText = styled(Box)`
  * {
    margin-top: 0;
    margin-bottom: 0;
    line-height: normal;
  }

  h3 {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  p {
    line-height: 1.5;
  }
`;

const FeaturedHeading = styled(Box)`
  h1 {
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 400;
    margin: 0;
  }
`;

const FeaturedSubheading = styled(Box)`
  p {
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

const FeaturedHighlight = styled(Text)`
  font-family: Montserrat;

  p {
    margin: 0;
  }
`;

const TextContainer = styled(Text)`
  font-family: Montserrat;
  margin: 0;
`;

const DisjointedSliderContainer = styled(Flex)`
  .disjoint-slider {
    width: 100%;
  }
`;

const JournalImageSharp = styled(Img)`
  width: 100%;
  height: 100%;
  position: absolute !important;
  top: 0;
  z-index: -1;
  filter: brightness(0.6);

  @media (min-width: ${dimensions.maxwidthTablet}px) {
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
  }
`;

const FeaturedButton = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  color: ${colors.njabDarkPink};
  border: 1px solid #e9c8bc;
  border-radius: 0;
  background-color: white;
  padding: 10px 50px;
  font-weight: 500;
  &:hover {
    background-color: #e2e8f0;
    color: ${colors.njabDarkPink};
  }
  @media (min-width: 768px) {
    width: auto;
  }
`;

const HoverFlex = styled(Flex)`
  opacity: 0;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const LinkButton = styled(Link)`
  color: white;
  text-decoration: none;
  border: 1px solid white;
  padding: 10px 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
  }
`;

const SlideButton = styled(Link)`
  margin-top: 20px;
  color: white;
  text-decoration: none;
  border: 1px solid white;
  padding: 10px 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
  }
`;

const HoverBox = styled(Box)`
  opacity: 0;
  z-index: 1;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const FeaturedImg = styled(Img)`
  width: 100%;
  height: 100px;

  @media (min-width: 768px) {
    width: 30%;
  }

  img {
    object-fit: contain !important;
  }

  picture {
    img {
      object-fit: contain !important;
    }
  }
`;

const PackagesFlex = styled(BackgroundImage)`
  display: flex;
  height: 100%;
  width: 100%;
  color: white;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;
  padding: 15px;
`;

const FirstSection = ({ home, projects, meta, posts }) => {
  return (
    <Section
      outerProps={{
        backgroundColor: colors.njabDarkPink,
        color: "white",
        textAlign: "center",
      }}
    >
      <StyledRichText
        py="120px"
        fontSize="14px"
        letterSpacing="1px"
        fontFamily="Montserrat"
      >
        <PrismicRichText render={home.hero_quote} />
      </StyledRichText>
    </Section>
  );
};

export default FirstSection;
