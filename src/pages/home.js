import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Button from "components/_ui/Button";
import Section from "components/Section";
import Layout from "components/Layout";
import DisjointedSlider from "components/DisjointedSlider";
import Mosaic from "components/Mosaic";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";

import Link from "components/_ui/Link";
import {
  Box,
  IconButton,
  PseudoBox,
  Heading,
  Text,
  Flex,
  Image
} from "@chakra-ui/core";
import DoubleSlider from "../components/DoubleSlider";

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

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.teal600};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
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

  // @media (min-width: 768px) {
  //   .disjoint-slider {
  //     display: initial;
  //   }

  //   .disjoint-slider-mobile {
  //     display: none;
  //   }
  // }
`;

const JournalImage = styled(Image)`
  position: absolute;
  top: 0;
  z-index: -1;
`;

const StyledImage = styled(Image)``;

const RenderBody = ({ home, projects, meta, posts }) => {
  const newTestimonials = home.testimonial_carousel.map(item => ({
    title: item.testimonial_title[0].text,
    image: item.testimonial_slide_image.url,
    date: item.testimonial_date[0].text,
    author: item.testimonial_author[0].text,
    quote: item.testimonial_quote[0].text
  }));
  return (
    <>
      <Helmet
        title={meta.title}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description
          },
          {
            property: `og:title`,
            content: meta.title
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
      <Section
        outerProps={{
          backgroundColor: colors.njabDarkPink,
          color: "white",
          textAlign: "center"
        }}
      >
        <StyledRichText
          py="120px"
          fontSize="14px"
          letterSpacing="1px"
          fontFamily="Montserrat"
        >
          {RichText.render(home.hero_quote)}
        </StyledRichText>
      </Section>

      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            py: { xs: "60px", md: "120px" }
          }}
        >
          <Flex color={colors.njabDarkPink} flexWrap="wrap" mb="30px">
            <Box
              flex={{ default: "1 0 100%", md: "1 0 50%" }}
              textTransform="uppercase"
            >
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
                <FeaturedHeading>
                  {RichText.render(home.featured_heading)}
                </FeaturedHeading>
              </PseudoBox>
              <FeaturedSubheading>
                {RichText.render(home.featured_subheading)}
              </FeaturedSubheading>
            </Box>
            <Box flex={{ default: "1 0 100%", md: "1 0 50%" }}>
              <FeaturedHighlight letterSpacing="1px" as="em" fontSize="14px">
                {RichText.render(home.featured_highlight_text)}
              </FeaturedHighlight>
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb={{ xs: "30px", md: "70px" }}
            flexWrap="wrap"
            px={{ xs: "15%", md: "0" }}
          >
            {home.featured_images.map((item, index) => (
              <Image
                py={{ xs: "15px", md: "0" }}
                // style={{
                //   width: item.featured_image.dimensions.width,
                //   height: item.featured_image.dimensions.height
                // }}
                width={{ xs: "100%", md: "auto" }}
                className="lazyload"
                data-src={item.featured_image.url}
                src={item.featured_image.url}
                alt={`Featured Image ${index}`}
              />
            ))}
          </Flex>
          <Flex justifyContent="center" px={{ xs: "10%", md: "0" }}>
            <Button
              width={{ xs: "100%", md: "auto" }}
              color={colors.njabDarkPink}
              border="1px solid #e9c8bc"
              borderRadius="0"
              backgroundColor="white"
              _hover={{
                backgroundColor: "#E2E8F0",
                color: colors.njabDarkPink
              }}
              as="a"
            >
              READ OUR STORY
            </Button>
          </Flex>
        </Section>
      </LazyLoad>
      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            backgroundColor: colors.njabLightPink,
            pt: { xs: "60px", md: "120px" },
            pb: { xs: "0", md: "120px" }
          }}
          maxWidth="initial"
          fullWidth
        >
          <Flex
            px={{
              xs: `${dimensions.paddingHorizontalMobile}em`,
              md: 0
            }}
            color={colors.njabDarkPink}
            maxWidth={`${dimensions.maxwidthDesktop}px`}
            width="100%"
            margin="0 auto"
            mb="80px"
            flexWrap="wrap"
          >
            <Box
              flex={{ xs: "1 0 100%", md: "1 0 50%" }}
              textTransform="uppercase"
            >
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
                <FeaturedHeading>
                  {RichText.render(home.packages_heading)}
                </FeaturedHeading>
              </PseudoBox>
              <FeaturedSubheading>
                {RichText.render(home.packages_subheading)}
              </FeaturedSubheading>
            </Box>
            <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }}>
              <FeaturedHighlight letterSpacing="1px" as="em" fontSize="14px">
                {RichText.render(home.packages_highlight_text)}
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
                >
                  <Flex
                    height="100%"
                    width="100%"
                    color="white"
                    flexDirection="column"
                    justifyContent="space-between"
                    background={`url('${item.packages_slide_image.url}')`}
                    backgroundSize="cover"
                    fontWeight="500"
                    padding="15px"
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
                  </Flex>
                </PseudoBox>
              ))}
            </DisjointedSlider>
          </DisjointedSliderContainer>
        </Section>
      </LazyLoad>
      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            pt: { xs: "60px", md: "120px" },
            pb: { xs: "0", md: "120px" }
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
              md: 0
            }}
          >
            <Box
              flex={{ xs: "1 0 100%", md: "1 0 50%" }}
              textTransform="uppercase"
            >
              <PseudoBox
                _after={{
                  content: "''",
                  display: "flex",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  my: "20px"
                }}
              >
                <FeaturedHeading>
                  {RichText.render(home.journal_heading)}
                </FeaturedHeading>
              </PseudoBox>
              <FeaturedSubheading>
                {RichText.render(home.journal_subheading)}
              </FeaturedSubheading>
            </Box>
            <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }}>
              <FeaturedHighlight letterSpacing="1px" as="em" fontSize="14px">
                {RichText.render(home.journal_highlight_text)}
              </FeaturedHighlight>
            </Box>
          </Flex>
          <DisjointedSliderContainer mb={{ md: "70px" }}>
            <DisjointedSlider pinkDots slidesToShow={1}>
              {home.journal_carousel.map((item, index) => (
                <PseudoBox
                  height="500px"
                  justifyContent="center"
                  px={{ md: "15px" }}
                  _focus={{ outline: "none" }}
                  position="relative"
                >
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
                      {item.journal_date[0].text}
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
                      fontSize="32px"
                      my="20px"
                      fontFamily="Montserrat"
                    >
                      {item.journal_slide_link[0].text}
                    </Heading>
                    <Heading
                      as="h2"
                      textTransform="uppercase"
                      letterSpacing="4px"
                      fontSize="18px"
                      fontWeight="500"
                      my="30px"
                      fontFamily="Montserrat"
                    >
                      Written By: {item.journal_author[0].text}
                    </Heading>
                  </Flex>
                  <JournalImage
                    px={{ md: "15px" }}
                    data-src={item.journal_slide_image.url}
                    src={item.journal_slide_image.url}
                    alt={"Journal Slide Image"}
                    width={{ xs: "auto", md: "100%" }}
                    style={{
                      filter: "brightness(0.6)"
                    }}
                  />
                </PseudoBox>
              ))}
            </DisjointedSlider>
          </DisjointedSliderContainer>
        </Section>
      </LazyLoad>
      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            backgroundColor: colors.njabMidPink,
            pt: { xs: "60px", md: "120px" },
            pb: { xs: "0", md: "120px" }
          }}
          maxWidth="initial"
          fullWidth
        >
          <DoubleSlider
            items={newTestimonials}
            title="Lorem ipsum"
            subtitle="What our clients say"
          />
        </Section>
      </LazyLoad>

      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            py: { xs: "60px", md: "120px" }
          }}
        >
          <Flex color={colors.njabDarkPink} mb="80px">
            <Box
              flex={{ xs: "1 0 100%", md: "1 0 50%" }}
              textTransform="uppercase"
            >
              <PseudoBox
                _after={{
                  content: "''",
                  display: "flex",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  my: "20px"
                }}
              >
                <FeaturedHeading>
                  {RichText.render(home.mosaic_heading)}
                </FeaturedHeading>
              </PseudoBox>
              <FeaturedSubheading>
                {RichText.render(home.mosaic_subheading)}
              </FeaturedSubheading>
            </Box>
          </Flex>
          <Mosaic
            height="400px"
            images={home.mosaic.map(item => item.mosaic_image.url)}
          />
        </Section>
      </LazyLoad>
    </>
  );
};

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  const projects = data.prismic.allProjects.edges;
  const meta = data.site.siteMetadata;
  const posts = data.prismic.allPosts.edges;

  if (!doc || !projects) return null;

  return (
    <Layout
      headerVariant="dark"
      headerChildren={
        <Hero>
          <>{RichText.render(doc.node.hero_title)}</>
        </Hero>
      }
      headerBackground={{
        url: doc.node.hero_background.url,
        size: "cover",
        position: "0 calc(50% + 35px)",
        highlight:
          "linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%)"
      }}
    >
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
      />
    </Layout>
  );
};

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_background
            hero_quote
            featured_heading
            featured_subheading
            featured_highlight_text
            featured_images {
              featured_image
              featured_imageSharp {
                childImageSharp {
                  fixed {
                    base64
                    tracedSVG
                    aspectRatio
                    srcWebp
                    srcSetWebp
                    originalName
                  }
                }
              }
            }

            packages_heading
            packages_subheading
            packages_highlight_text
            packages_carousel {
              packages_slide_image
              packages_slide_link
            }

            journal_heading
            journal_subheading
            journal_highlight_text
            journal_carousel {
              journal_slide_image
              journal_slide_imageSharp {
                childImageSharp {
                  fixed {
                    base64
                    tracedSVG
                    aspectRatio
                    srcWebp
                    srcSetWebp
                    originalName
                  }
                }
              }
              journal_slide_link
              journal_author
              journal_date
            }

            testimonial_carousel {
              testimonial_author
              testimonial_date
              testimonial_quote
              testimonial_slide_image
              testimonial_title
            }

            mosaic {
              mosaic_image
            }
            mosaic_heading
            mosaic_subheading
            mosaic_highlight_text

            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allPosts(sortBy: post_date_DESC, first: 1) {
        edges {
          node {
            post_title
            post_date
            post_category
            post_preview_description
            post_author
            _meta {
              uid
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
