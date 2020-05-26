import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Section from "components/Section";
import dayjs from "dayjs";
import Img from "gatsby-image";
import Loadable from "react-loadable";
import Link from "components/_ui/Link";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";

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
const DisjointedSlider = Loadable({
  loader: () => import("../DisjointedSlider"),
  loading() {
    return <div />;
  },
});

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

const SixthSection = ({ home }) => {
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

export default SixthSection;
