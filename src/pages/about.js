import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import Section from "components/Section";
import theme from "styles/theme";
import { RichText } from "prismic-reactjs";
import colors from "styles/colors";
import LazyLoad from "react-lazyload";
import HighlightText from "components/_ui/HighlightText";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import Skeleton from "react-loading-skeleton";

import {
  Image,
  Box,
  Flex,
  PseudoBox,
  Heading,
  Text,
  Button,
  Grid
} from "@chakra-ui/core";

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

const About = ({ meta, about }) => (
  <>
    <Helmet
      title={`About | Not Just a Box Events`}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: meta.description
        },
        {
          property: `og:title`,
          content: `About | Not Just a Box Events`
        },
        {
          property: `og:description`,
          content: meta.description
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: meta.author
        },
        {
          name: `twitter:title`,
          content: meta.title
        },
        {
          name: `twitter:description`,
          content: meta.description
        }
      ].concat(meta)}
    />
    <Layout>
      <Section py="50px">
        <Flex color="#dd8d83" fontFamily={theme.fonts.body}>
          <Flex
            fontFamily="inherit"
            justifyContent="center"
            flex={1}
            overflow="hidden"
          >
            <Image
              src={about.node.page_hero_image.url}
              width="auto"
              height={{ xs: "70vh", lg: "550px" }}
              objectFit="cover"
            />
          </Flex>
          <Flex
            fontFamily="inherit"
            direction="column"
            flex={1}
            px="80px"
            py="50px"
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
                  my: "20px"
                }}
              >
                <PageHeadingSuperScript>
                  {RichText.render(about.node.page_heading_superscript)}
                </PageHeadingSuperScript>
              </PseudoBox>

              <PageHeading>
                {RichText.render(about.node.page_heading)}
              </PageHeading>
              <PageSubheading>
                {RichText.render(about.node.page_subheading)}
              </PageSubheading>
            </Box>
            <HighlightText
              color="#707073"
              display="block"
              letterSpacing="1px"
              fontSize="12px"
              fontFamily="inherit"
            >
              {RichText.render(about.node.page_highlight_text)}
            </HighlightText>
            <Box marginTop="auto">
              <Button
                border="1px solid #e9c8bc"
                borderRadius="0"
                backgroundColor="white"
                width="auto"
                px="50px"
                py="10px"
                fontSize="14px"
                color="inherit"
              >
                GET IN TOUCH
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Section>

      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            backgroundColor: colors.njabDarkPink,
            py: "120px"
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
              mx: "auto"
            }}
          >
            <PhilosophyHeading as="h3">
              {RichText.render(about.node.philosophy_section_heading)}
            </PhilosophyHeading>
          </PseudoBox>
          <Flex width="100%" height="250px">
            {about.node.philosophy_section_images.map((item, index) => (
              <Flex
                flex={(index + 1) % 2 === 0 ? "1 0 25%" : "1 0 37.5%"}
                my={{ xs: "30px", md: "0" }}
                px="15px"
                overflow="hidden"
                alignItems="center"
              >
                <LazyLoad placeholder={<Skeleton />}>
                  <Image
                    src={item.philosophy_image.url}
                    maxWidth="initial"
                    objectFit="cover"
                    width="100%"
                  />
                </LazyLoad>
              </Flex>
            ))}
          </Flex>

          <Flex width="100%" py="20px">
            {about.node.philosophy_section_images.map((item, index) => (
              <Flex
                flex={(index + 1) % 2 === 0 ? "1 0 25%" : "1 0 37.5%"}
                my={{ xs: "30px", md: "0" }}
                px="15px"
                alignItems="center"
                justifyContent="center"
                fontWeight="500"
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
                  {RichText.render(item.philosophy_quote)}
                </PhilosophyText>
              </Flex>
            ))}
          </Flex>
        </Section>
      </LazyLoad>

      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            py: "120px"
          }}
        >
          <Flex>
            <Box flex="1 0 50%" mb="80px">
              <PseudoBox
                _after={{
                  content: "''",
                  display: "block",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  my: "20px"
                }}
              >
                <SectionHeading color={colors.njabDarkPink} as="h3">
                  {RichText.render(about.node.team_section_heading)}
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading color={colors.njabDarkPink} as="h3">
                {RichText.render(about.node.team_section_subheading)}
              </SectionSubheading>
            </Box>
            <Box flex="1 0 50%" mb="80px">
              <HighlightText
                letterSpacing="1px"
                as="em"
                fontSize="14px"
                fontFamily="Montserrat"
                color={colors.njabDarkPink}
              >
                {RichText.render(about.node.team_section_highlight_text)}
              </HighlightText>
            </Box>
          </Flex>

          <Grid
            width="100%"
            height="auto"
            gridTemplateColumns="repeat(4, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gridColumnGap="0px"
            gridRowGap="0px"
            textTransform="uppercase"
            color="#626163"
            letterSpacing="2.5px"
            fontSize="11px"
            fontWeight="500"
          >
            {about.node.team_checkerboard.map((item, index, checkArr) => {
              const gridAreas = [
                {
                  image: "1 / 1 / 2 / 2",
                  text: "1 / 2 / 2 / 3"
                },
                {
                  image: "1 / 3 / 2 / 4",
                  text: "1 / 4 / 2 / 5"
                },
                {
                  image: "2 / 2 / 3 / 3",
                  text: "2 / 1 / 3 / 2"
                },
                {
                  image: "2 / 4 / 3 / 5",
                  text: "2 / 3 / 3 / 4"
                }
              ];

              return (
                <>
                  {index + 1 < checkArr.length / 2 ? (
                    <>
                      <Box gridArea={gridAreas[index].image}>
                        <LazyLoad placeholder={<Skeleton />}>
                          <Image
                            maxWidth="initial"
                            src={item.employee_picture.url}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                          />
                        </LazyLoad>
                      </Box>
                      <HoverFlex
                        gridArea={gridAreas[index].text}
                        justifyContent="center"
                        alignItems="flex-end"
                        position="relative"
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
                          padding="30px"
                          opacity="0"
                          transition="all 0.3s"
                        >
                          <Box
                            overflow="scroll"
                            height="calc(100% - 80px)"
                            width="100%"
                          >
                            {RichText.render(item.employee_description)}
                          </Box>
                        </Box>
                        <StyledFlex
                          className="details-container"
                          height="80px"
                          justifyContent="flex-end"
                          pb="20px"
                          alignItems="center"
                          flexDirection="column"
                        >
                          <Box zIndex="2">
                            {RichText.render(item.employee_name)}
                          </Box>
                          <Text
                            zIndex="2"
                            className="position"
                            as="em"
                            fontFamily="Montserrat"
                            opacity="0"
                            margin="0"
                          >
                            {RichText.render(item.employee_position)}
                          </Text>
                        </StyledFlex>
                      </HoverFlex>
                    </>
                  ) : (
                    <>
                      <HoverFlex
                        gridArea={gridAreas[index].text}
                        justifyContent="center"
                        alignItems="flex-end"
                        position="relative"
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
                          padding="30px"
                          opacity="0"
                          transition="all 0.3s"
                        >
                          <Box
                            overflow="scroll"
                            height="calc(100% - 80px)"
                            width="100%"
                          >
                            {RichText.render(item.employee_description)}
                          </Box>
                        </Box>
                        <StyledFlex
                          className="details-container"
                          height="80px"
                          justifyContent="flex-end"
                          pb="20px"
                          alignItems="center"
                          flexDirection="column"
                        >
                          <Box zIndex="2">
                            {RichText.render(item.employee_name)}
                          </Box>
                          <Text
                            zIndex="2"
                            className="position"
                            as="em"
                            fontFamily="Montserrat"
                            opacity="0"
                            margin="0"
                          >
                            {RichText.render(item.employee_position)}
                          </Text>
                        </StyledFlex>
                      </HoverFlex>
                      <Box gridArea={gridAreas[index].image}>
                        <LazyLoad placeholder={<Skeleton />}>
                          <Image
                            maxWidth="initial"
                            src={item.employee_picture.url}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                          />
                        </LazyLoad>
                      </Box>
                    </>
                  )}
                </>
              );
            })}
          </Grid>
        </Section>
      </LazyLoad>
    </Layout>
  </>
);

export default ({ data }) => {
  const meta = data.site.siteMetadata;
  const doc = data.prismic.allAbout_pages.edges.slice(0, 1).pop();
  console.log(doc);

  if (!doc || !meta) return null;

  return <About about={doc} meta={meta} />;
};

About.propTypes = {
  doc: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
      allAbout_pages {
        edges {
          node {
            page_cta_button
            page_hero_image
            page_heading
            page_heading_superscript
            page_highlight_text
            page_subheading
            philosophy_section_heading
            team_section_heading
            team_section_highlight_text
            team_section_subheading
            philosophy_section_images {
              philosophy_image
              philosophy_quote
            }
            team_checkerboard {
              employee_name
              employee_picture
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
