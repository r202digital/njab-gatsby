import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import Section from "components/Section";
import theme from "styles/theme";
import colors from "styles/colors";
import LazyLoad from "react-lazyload";
import HighlightText from "components/_ui/HighlightText";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import Skeleton from "react-loading-skeleton";
import { getPrismicImage } from "../lib/PrismicFunctions";
import Image from "@chakra-ui/core/dist/Image";
import Box from "@chakra-ui/core/dist/Box";
import Flex from "@chakra-ui/core/dist/Flex";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import Text from "@chakra-ui/core/dist/Text";
import Grid from "@chakra-ui/core/dist/Grid";
import Loadable from "react-loadable";
import GatsbyImage from "gatsby-image";
import preview from "../images/njab/fbimage.png";
import AboutSlider from "components/AboutSlider";

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

const PageHeading = styled(Box)`
  * {
    font-family: inherit;
    font-size: 24px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const PageSubheading = styled(Box)`
  * {
    font-family: inherit;
    font-size: 18px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const PageHeadingSuperScript = styled(Box)`
  * {
    font-family: inherit;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

const PhilosophyHeading = styled(SectionHeading)`
  margin: 0;

  * {
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
`;

const FirstSectionHeading = styled(SectionHeading)`
  h3 {
    font-weight: 700;
  }
`;

const PhilosophyText = styled(Text)`
  * {
    text-transform: uppercase;
    font-family: Montserrat;
    color: white;
    margin: 0;
  }
`;

const StyledFlex = styled(Flex)`
  p {
    margin: 0;
  }
`;

const HoverFlex = styled(Flex)`
  z-index: 1;
  transition: all 0.3s;

  &:hover {
    .details-container {
      color: white;

      .position {
        opacity: 1;
      }
    }

    .description {
      opacity: 1;
    }
  }
`;

const StyledImage = styled(GatsbyImage)`
  width: 100%;
  height: 70vh;

  @media (min-width: ${dimensions.maxwidthTablet}px) {
    height: 550px;

    img {
      width: auto !important;
      right: 0;
      margin: 0 auto;
    }
  }
`;

const EmployeePicture = styled(GatsbyImage)`
  width: 100%;
`;

const PhilosophyPicture = styled(GatsbyImage)`
  width: 100%;

  @media (min-width: ${dimensions.maxwidthTablet}px) {
    height: 250px;
  }
`;

const TeamSection = ({ items }) => {
  return (
    <Grid
      width="100%"
      height="auto"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      gridTemplateRows={{
        xs: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      gridColumnGap="0px"
      gridRowGap="0px"
      textTransform="uppercase"
      color="#626163"
      letterSpacing="2.5px"
      fontSize={{ xs: "10px", md: "11px" }}
      fontWeight="500"
    >
      {items.map((item, index, checkArr) => {
        const smallerLength = Math.ceil(checkArr.length / 2);
        const firstArr = [...Array(smallerLength).keys()]
          .map((x) => ++x)
          .filter((a) => !(a % 2))
          .reduce((total, fItem) => {
            const totalArr = total;
            totalArr.push(fItem * 2 - 1);
            totalArr.push(fItem * 2);
            return totalArr;
          }, [])
          .map((x) => --x);

        return (
          <Flex
            flexDirection={{
              xs: !(index % 2) ? "row" : "row-reverse",
              md: firstArr.includes(index) ? "row-reverse" : "row",
            }}
          >
            <Box flex="0 0 50%">
              <LazyLoad placeholder={<Skeleton />}>
                <EmployeePicture
                  fluid={item.employee_pictureSharp.childImageSharp.fluid}
                />
              </LazyLoad>
            </Box>
            <HoverFlex
              justifyContent="center"
              alignItems="flex-end"
              position="relative"
              flex="0 0 50%"
            >
              <Box
                className="description"
                position="absolute"
                height="100%"
                width="100%"
                backgroundColor={colors.njabDarkPink}
                textTransform="initial"
                color="white"
                top="0"
                padding={{ xs: "10px", md: "30px" }}
                opacity="0"
                transition="all 0.3s"
              >
                <Box overflow="scroll" height="calc(100% - 80px)" width="100%">
                  <PrismicRichText render={item.employee_description} />
                </Box>
              </Box>
              <StyledFlex
                className="details-container"
                height="80px"
                justifyContent="flex-end"
                p={{ xs: "10px", md: "30px" }}
                pb={{ xs: "10px", md: "20px" }}
                alignItems="center"
                flexDirection="column"
              >
                <Box zIndex="2" textAlign="center" fontWeight="bold">
                  <PrismicRichText render={item.employee_name} />
                </Box>
                <Text
                  zIndex="2"
                  className="position"
                  as="em"
                  fontFamily="Montserrat"
                  opacity="0"
                  margin="0"
                  textAlign="center"
                  lineHeight="1.5"
                >
                  <PrismicRichText render={item.employee_position} />
                </Text>
              </StyledFlex>
            </HoverFlex>
          </Flex>
        );
      })}
    </Grid>
  );
};

const About = ({ meta, about }) => {
  return (
    <>
      <Helmet>
        <title>Our Story | Not Just a Box Events</title>
        <meta name="title" content={`Our Story | Not Just a Box Events`} />
        <meta name="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notjustaboxevents.com/" />
        <meta
          property="og:title"
          content={`Our Story | Not Just a Box Events`}
        />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={preview} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://notjustaboxevents.com/" />
        <meta
          property="twitter:title"
          content={`Our Story | Not Just a Box Events`}
        />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:image" content={preview} />
      </Helmet>
      <Layout>
        <Section
          outerProps={{
            pt: { xs: "0", md: "50px" },
            pb: { xs: "0", md: "50px" },
          }}
          fullWidth
        >
          <Flex
            color="#dd8d83"
            fontFamily={theme.fonts.body}
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Flex
              fontFamily="inherit"
              justifyContent="center"
              flex={{ xs: "1 0 100%", md: "1" }}
              overflow="hidden"
            >
              <StyledImage
                fluid={about.node.page_hero_imageSharp.childImageSharp.fluid}
              />
            </Flex>
            <Flex
              fontFamily="inherit"
              direction="column"
              flex={{ xs: "1 0 100%", md: "1" }}
              px={{ xs: "2rem", md: "80px" }}
              py={{ xs: "40px", md: "50px" }}
            >
              <Box fontFamily="inherit" marginBottom="auto">
                <PseudoBox
                  fontFamily="inherit"
                  _after={{
                    content: "''",
                    display: "block",
                    height: "1px",
                    width: "50px",
                    backgroundColor: "#e9c8bc",
                    my: "20px",
                  }}
                >
                  <PageHeadingSuperScript>
                    <PrismicRichText
                      render={about.node.page_heading_superscript}
                    />
                  </PageHeadingSuperScript>
                </PseudoBox>

                <PageHeading>
                  <PrismicRichText render={about.node.page_heading} />
                </PageHeading>
                <PageSubheading>
                  <PrismicRichText render={about.node.page_subheading} />
                </PageSubheading>
              </Box>
              <HighlightText
                color="#707073"
                display="block"
                letterSpacing="1px"
                fontSize="12px"
                fontFamily="inherit"
              >
                <PrismicRichText render={about.node.page_highlight_text} />
              </HighlightText>
            </Flex>
          </Flex>
        </Section>

        <Section
          outerProps={{
            backgroundColor: colors.njabLightPink,
            textAlign: "center",
          }}
        >
          <Box
            py="120px"
            fontSize="14px"
            letterSpacing="1px"
            fontFamily="Montserrat"
            maxWidth={{ md: "70%" }}
            mx="auto"
          >
            <FirstSectionHeading as="h3" color={colors.njabDarkPink}>
              <PrismicRichText render={about.node.first_section_heading} />
            </FirstSectionHeading>
            <Text color="#707073">
              <PrismicRichText render={about.node.first_section_content} />
            </Text>
          </Box>
        </Section>

        <LazyLoad placeholder={<Skeleton />}>
          <Section
            outerProps={{
              backgroundColor: colors.njabDarkPink,
              py: "120px",
            }}
          >
            <PseudoBox
              maxWidth={{ lg: dimensions.maxwidthDesktop }}
              margin="0 auto"
              _after={{
                content: "''",
                display: "block",
                height: "1px",
                width: "50px",
                backgroundColor: "white",
                my: "20px",
                mx: "auto",
              }}
            >
              <PhilosophyHeading as="h3">
                <PrismicRichText
                  render={about.node.philosophy_section_heading}
                />
              </PhilosophyHeading>
            </PseudoBox>
            <Flex width="100%" flexWrap={{ xs: "wrap", md: "nowrap" }}>
              {about.node.philosophy_section_images.map((item, index) => (
                <Flex
                  flex={{
                    xs: "1 0 100%",
                    md: (index + 1) % 2 === 0 ? "1 0 25%" : "1 0 37.5%",
                  }}
                  my={{ xs: "30px", md: "0" }}
                  px="15px"
                  overflow="hidden"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <LazyLoad placeholder={<Skeleton />}>
                    <PhilosophyPicture
                      fluid={item.philosophy_imageSharp.childImageSharp.fluid}
                    />
                  </LazyLoad>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Text
                      letterSpacing="5px"
                      marginRight="10px"
                      fontSize="20px"
                      color="white"
                      fontFamily="Montserrat"
                    >
                      {`${index < 10 ? "0" : ""}${index + 1}`}
                    </Text>
                    <PhilosophyText
                      textTransform="uppercase"
                      fontSize="13px"
                      letterSpacing="1.5px"
                    >
                      <PrismicRichText render={item.philosophy_quote} />
                    </PhilosophyText>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Section>
        </LazyLoad>
        <LazyLoad placeholder={<Skeleton />}>
          <Section
            outerProps={{
              py: "120px",
            }}
          >
            <Flex>
              <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }} mb="80px">
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
                  <SectionHeading color={colors.njabDarkPink} as="h3">
                    <PrismicRichText render={about.node.team_section_heading} />
                  </SectionHeading>
                </PseudoBox>
                <SectionSubheading color={colors.njabDarkPink} as="h3">
                  <PrismicRichText
                    render={about.node.team_section_subheading}
                  />
                </SectionSubheading>
              </Box>
            </Flex>
            <AboutSlider>
              {/* TODO: SPLIT THIS, EVERY 4 TEAM MEMBERS */}
              <div>
                <TeamSection items={about.node.team_checkerboard} />
              </div>
              {/* <div>
                <TeamSection items={about.node.team_checkerboard} />
              </div> */}
            </AboutSlider>
          </Section>
        </LazyLoad>
      </Layout>
    </>
  );
};

export default ({ data }) => {
  const meta = data.site.siteMetadata;
  const doc = data.prismic.allAbout_pages.edges.slice(0, 1).pop();

  if (!doc || !meta) return null;

  return <About about={doc} meta={meta} />;
};

About.propTypes = {
  about: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export const query = graphql`
  {
    prismic {
      allAbout_pages {
        edges {
          node {
            page_cta_button
            page_hero_image
            page_hero_imageSharp {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            page_heading
            page_heading_superscript
            page_highlight_text
            page_subheading
            first_section_content
            first_section_heading
            philosophy_section_heading
            team_section_heading
            team_section_highlight_text
            team_section_subheading
            philosophy_section_images {
              philosophy_image
              philosophy_imageSharp {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              philosophy_quote
            }
            team_checkerboard {
              employee_name
              employee_picture
              employee_pictureSharp {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              employee_description
              employee_position
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
