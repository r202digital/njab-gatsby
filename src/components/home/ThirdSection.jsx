import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Section from "components/Section";
import Loadable from "react-loadable";
import { convertImageSharp } from "../../lib/PrismicFunctions";

const Img = Loadable({
  loader: () => import("gatsby-image"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const BackgroundImage = Loadable({
  loader: () => import("gatsby-background-image"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Box = Loadable({
  loader: () => import("@chakra-ui/core/dist/Box"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Link = Loadable({
  loader: () => import("@chakra-ui/core/dist/Link"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Flex = Loadable({
  loader: () => import("@chakra-ui/core/dist/Flex"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Text = Loadable({
  loader: () => import("@chakra-ui/core/dist/Text"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const PseudoBox = Loadable({
  loader: () => import("@chakra-ui/core/dist/PseudoBox"),
  delay: 10,
  loading() {
    return <div />;
  },
});

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

const ThirdSection = ({ home, projects, meta, posts }) => {
  return (
    <Section
      outerProps={{
        backgroundColor: colors.njabLightPink,
        pt: { xs: "60px", md: "120px" },
        pb: { xs: "0", md: "120px" },
      }}
      maxWidth="initial"
      fullWidth
    >
      <Flex
        px={{
          xs: `${dimensions.paddingHorizontalMobile}em`,
          md: 0,
        }}
        color={colors.njabDarkPink}
        maxWidth={`${dimensions.maxwidthDesktop}px`}
        width="100%"
        margin="0 auto"
        mb="80px"
        flexWrap="wrap"
      >
        <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }} textTransform="uppercase">
          <PseudoBox
            _after={{
              content: "''",
              display: "block",
              height: "1px",
              width: "50px",
              backgroundColor: "#e9c8bc",
              my: "20px",
            }}
          >
            <FeaturedHeading>
              <PrismicRichText render={home.packages_heading} />
            </FeaturedHeading>
          </PseudoBox>
          <FeaturedSubheading>
            <PrismicRichText render={home.packages_subheading} />
          </FeaturedSubheading>
        </Box>
        <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }}>
          <FeaturedHighlight
            letterSpacing="1px"
            as="em"
            fontSize="14px"
            textAlign="right"
          >
            <PrismicRichText render={home.packages_highlight_text} />
          </FeaturedHighlight>
        </Box>
      </Flex>
      <DisjointedSliderContainer mb={{ md: "70px" }}>
        <DisjointedSlider pinkDots initialSlide={2}>
          {home.packages_carousel.map((item, index) => (
            <PseudoBox
              height={{ xs: "650px", md: "450px" }}
              justifyContent="center"
              px={{ md: "15px" }}
              _focus={{ outline: "none" }}
              position="relative"
            >
              <HoverBox
                position="absolute"
                paddingRight={{ md: "30px" }}
                height="100%"
                width="100%"
              >
                <Flex
                  backgroundColor={colors.njabDarkPink}
                  height="100%"
                  width="100%"
                  color="white"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="500"
                  padding="15px"
                >
                  <PseudoBox
                    _after={{
                      content: "''",
                      display: "flex",
                      height: "1px",
                      width: "50px",
                      backgroundColor: "#e9c8bc",
                      my: "20px",
                      mx: "auto",
                    }}
                  >
                    <TextContainer
                      as="h2"
                      display="block"
                      lineHeight="1.5"
                      width="min-content"
                      textTransform="uppercase"
                      textAlign="center"
                      letterSpacing="4px"
                      fontSize="13px"
                    >
                      {item.linked_package.service_title[0].text}
                    </TextContainer>
                  </PseudoBox>
                  <TextContainer
                    as="em"
                    display="table-caption"
                    width="80%"
                    textAlign="center"
                    letterSpacing="2px"
                    fontSize="12px"
                  >
                    {item.linked_package.service_preview_description[0].text}
                  </TextContainer>
                  <SlideButton
                    fontWeight="700"
                    letterSpacing="1px"
                    fontFamily="Montserrat"
                    to={`/service/${item.linked_package._meta.uid}`}
                  >
                    Read More
                  </SlideButton>
                </Flex>
              </HoverBox>
              <PackagesFlex
                fluid={convertImageSharp(
                  item.packages_slide_imageSharp.childImageSharp.fluid,
                  item.packages_slide_image.url
                )}
              >
                <TextContainer alignSelf="flex-end">{`${
                  index < 10 ? "0" : ""
                }${index + 1}`}</TextContainer>
                <TextContainer
                  display="table-caption"
                  width="min-content"
                  textTransform="uppercase"
                  letterSpacing="2px"
                  fontSize="13px"
                  pb={{ xs: "50px", md: "0" }}
                >
                  {item.packages_slide_link[0].text}
                </TextContainer>
              </PackagesFlex>
            </PseudoBox>
          ))}
        </DisjointedSlider>
      </DisjointedSliderContainer>
    </Section>
  );
};

export default ThirdSection;
