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

const FourthSection = ({ home, projects, meta, posts }) => {
  const newTestimonials = home.testimonial_carousel.map((item) => ({
    title: item.testimonial_title[0].text,
    image: getPrismicImage(item.testimonial_slide_image),
    date: item.testimonial_date[0].text,
    author: item.testimonial_author[0].text,
    quote: item.testimonial_quote[0].text,
  }));
  return (
    <Section
      outerProps={{
        pt: { xs: "60px", md: "120px" },
        pb: { xs: "0", md: "120px" },
      }}
      maxWidth="initial"
      fullWidth
    >
      <Flex
        color={colors.njabDarkPink}
        maxWidth={`${dimensions.maxwidthDesktop}px`}
        width="100%"
        margin="0 auto"
        mb="80px"
        flexWrap="wrap"
        px={{
          xs: `${dimensions.paddingHorizontalMobile}em`,
          md: 0,
        }}
      >
        <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }} textTransform="uppercase">
          <PseudoBox
            _after={{
              content: "''",
              display: "flex",
              height: "1px",
              width: "50px",
              backgroundColor: "#e9c8bc",
              my: "20px",
            }}
          >
            <FeaturedHeading>
              <PrismicRichText render={home.journal_heading} />
            </FeaturedHeading>
          </PseudoBox>
          <FeaturedSubheading>
            <PrismicRichText render={home.journal_subheading} />
          </FeaturedSubheading>
        </Box>
        <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }}>
          <FeaturedHighlight
            letterSpacing="1px"
            as="em"
            fontSize="14px"
            textAlign="right"
          >
            <PrismicRichText render={home.journal_highlight_text} />
          </FeaturedHighlight>
        </Box>
      </Flex>
      <DisjointedSliderContainer mb={{ md: "70px" }}>
        <DisjointedSlider pinkDots slidesToShow={1}>
          {home.journal_carousel.map((item, index) => {
            return (
              item.journal_post_link && (
                <PseudoBox
                  height="600px"
                  justifyContent="center"
                  px={{ md: "15px" }}
                  _focus={{ outline: "none" }}
                  position="relative"
                  overflow="hidden"
                >
                  <HoverFlex
                    backgroundColor={colors.njabDarkPink}
                    position="absolute"
                    height="100%"
                    width="100%"
                    color="white"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="500"
                    paddingRight={{ md: "15px" }}
                  >
                    <Text
                      textTransform="uppercase"
                      letterSpacing="3px"
                      fontSize="14px"
                      fontFamily="Montserrat"
                      margin="0"
                    >
                      {dayjs(item.journal_post_link.post_date).format(
                        "MMMM D, YYYY"
                      )}
                    </Text>
                    <Heading
                      as="h1"
                      textTransform="uppercase"
                      letterSpacing="8px"
                      fontSize={{ xs: "25px", md: "32px" }}
                      my="20px"
                      fontFamily="Montserrat"
                      px="20px"
                      textAlign="center"
                    >
                      {item.journal_post_link.post_title.reduce(
                        (total, item) => item.text,
                        ""
                      )}
                    </Heading>
                    <Text
                      as="em"
                      width={{ md: "50%" }}
                      px="15px"
                      fontSize={{ xs: "16px", md: "18px" }}
                      fontWeight="500"
                      my={{ md: "30px" }}
                      textAlign="center"
                      fontFamily="Montserrat"
                    >
                      <PrismicRichText
                        render={item.journal_post_link.post_preview_description}
                      />
                    </Text>
                    <LinkButton
                      fontWeight="700"
                      letterSpacing="1px"
                      fontFamily="Montserrat"
                      to={`/blog/${item.journal_post_link._meta.uid}`}
                    >
                      Read More
                    </LinkButton>
                  </HoverFlex>
                  <Flex
                    height="100%"
                    width="100%"
                    color="white"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="500"
                    padding="15px"
                  >
                    <Text
                      textTransform="uppercase"
                      letterSpacing="3px"
                      fontSize="14px"
                      fontFamily="Montserrat"
                    >
                      {dayjs(item.journal_post_link.post_date).format(
                        "MMMM D, YYYY"
                      )}
                    </Text>
                    <Box
                      width="75px"
                      height="2px"
                      backgroundColor="white"
                      my="20px"
                    />
                    <Heading
                      as="h1"
                      textTransform="uppercase"
                      letterSpacing="8px"
                      fontSize={{ xs: "25px", md: "32px" }}
                      my="20px"
                      fontFamily="Montserrat"
                      px="20px"
                      textAlign="center"
                    >
                      {item.journal_post_link.post_title.reduce(
                        (total, item) => item.text,
                        ""
                      )}
                    </Heading>
                    <Heading
                      as="h2"
                      textTransform="uppercase"
                      letterSpacing="4px"
                      fontSize="18px"
                      fontWeight="500"
                      my="30px"
                      fontFamily="Montserrat"
                      textAlign="center"
                    >
                      Written By: {item.journal_post_link.post_author}
                    </Heading>
                  </Flex>
                  <JournalImageSharp
                    fluid={
                      item.journal_post_link.post_hero_imageSharp
                        .childImageSharp.fluid
                    }
                  />
                </PseudoBox>
              )
            );
          })}
        </DisjointedSlider>
      </DisjointedSliderContainer>
    </Section>
  );
};

export default FourthSection;
