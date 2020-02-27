import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import colors from "styles/colors";
import Layout from "components/Layout";
import HighlightText from "components/_ui/HighlightText";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import HeaderDoubleSlider from "../components/HeaderDoubleSlider";
import Masonry from "react-masonry-css";

import LazyLoad from "react-lazyload";

import Section from "components/Section";
import Link from "components/_ui/Link";
import Checkerboard from "components/Checkerboard";
import { RichText } from "prismic-reactjs";

import {
  Heading,
  Grid,
  Box,
  Text,
  Image,
  Flex,
  PseudoBox,
  List,
  ListItem,
  Button
} from "@chakra-ui/core";

const MapHeading = styled(Heading)`
  margin: 0;

  * {
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 400;
    text-transform: uppercase;
    font-family: Montserrat;
    margin: 0;
  }
`;

const MapSubheading = styled(Heading)`
  margin: 0;

  * {
    font-size: 16px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: Montserrat;
    margin: 0;
  }
`;

const JournalImage = styled(Image)`
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const StyledMasonry = styled(Masonry)`
  &.my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
    padding-bottom: 30px;
  }

  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;

    & > div {
      margin-bottom: 50px;
    }
  }
`;

const DisjointedSliderContainer = styled(Flex)`
  .disjoint-slider {
    display: none;
    width: 100%;
  }

  @media (min-width: 768px) {
    .disjoint-slider {
      display: initial;
    }

    .disjoint-slider-mobile {
      display: none;
    }
  }
`;

const CategoryLink = styled(Button)`
  background: transparent;
  border: none;
  color: white;
  text-decoration: initial;
  cursor: pointer;
  padding: 0;
  margin: 0;
  height: auto;
  width: auto;
  text-transform: uppercase;
  font-weight: 400;
  font-family: Montserrat;
  font-size: 13px;
  letter-spacing: 2px;

  &:hover {
    text-decoration: underline;
    background: transparent;
    color: white;
  }

  &:focus {
    box-shadow: none;
  }
`;

const PortfolioLink = styled(Link)`
  color: white;
  text-decoration: initial;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Services = ({
  services,
  meta,
  projects,
  projectCategories,
  portfolio
}) => {
  const [filter, setFilter] = useState(0);

  const newProjects = projects
    .filter(project =>
      !!filter
        ? project.node.project_category[0].text.toLowerCase() === filter
        : true
    )
    .map((project, index) => ({
      id: project.node._meta.uid,
      title: project.node.project_title[0].text,
      image: project.node.project_hero_image.url,
      category: project.node.project_category[0].text
    }));

  const featuredProjects = portfolio.featured_projects.map((item, index) => ({
    id: item.project._meta.uid,
    title: item.project.project_title[0].text,
    image: item.project.project_hero_image.url,
    description: item.project.project_description[0].text,
    date: item.project.project_post_date,
    index: index,
    total: portfolio.featured_projects.length
  }));

  return (
    <>
      <Helmet
        title={`Services | Not Just a Box Events`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description
          },
          {
            property: `og:title`,
            content: `Services | Not Just a Box Events`
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
        <Section mb="40px" maxWidth="initial">
          <HeaderDoubleSlider items={featuredProjects} />
        </Section>
        <Section py="40px">
          <Flex alignItems="center">
            <Box flex="1 0 50%">
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
                <SectionHeading
                  as="h3"
                  fontSize="18px"
                  letterSpacing="2px"
                  fontWeight="400"
                  color={colors.njabDarkPink}
                  fontFamily="Montserrat"
                  textTransform="uppercase"
                >
                  Lorem Ipsum
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading
                as="h3"
                fontSize="18px"
                letterSpacing="2px"
                marginBottom="20px"
                fontWeight="700"
                color={colors.njabDarkPink}
                fontFamily="Montserrat"
                textTransform="uppercase"
              >
                Our Portfolio
              </SectionSubheading>
            </Box>
            <Box flex="1 0 50%" textAlign="right" fontWeight="500">
              <HighlightText
                margin="0"
                letterSpacing="1px"
                fontSize="13px"
                color="#707073"
              >
                {RichText.render(services.node.weddings_highlight_text)}
              </HighlightText>
            </Box>
          </Flex>
        </Section>

        <Section
          outerProps={{
            backgroundColor: colors.njabMidPink
          }}
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="center"
          letterSpacing="2px"
          color="white"
        >
          <Grid
            width="100%"
            gridTemplateColumns="auto 100px 1fr"
            gridTemplateRows="1fr"
            gridColumnGap="0px"
            gridRowGap="0px"
            fontSize="12px"
            fontWeight="500"
            my="30px"
          >
            <Text
              as="em"
              fontSize="14px"
              py="10px"
              paddingRight="20px"
              fontFamily="Montserrat"
            >
              BROWSE BY CATEGORY
            </Text>
            <Box
              backgroundColor="white"
              transform="rotate(30deg)"
              mx="49px"
              my="5px"
            />
            <Flex width="100%" textAlign="initial" alignItems="center">
              <List display="flex" width="100%" textAlign="center">
                <ListItem flex="1">
                  <CategoryLink onClick={() => setFilter(0)} color="white">
                    ALL
                  </CategoryLink>
                </ListItem>

                {projectCategories.map(category => (
                  <ListItem flex="1" textTransform="uppercase">
                    <CategoryLink
                      onClick={() => setFilter(category)}
                      color="white"
                    >
                      {category}
                    </CategoryLink>
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Grid>
          <StyledMasonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {newProjects.map(project => (
              <Box>
                <PortfolioLink
                  to={`/work/${project.id}`}
                  color="white"
                  width="100%"
                >
                  <LazyLoad>
                    <Image display="block" src={project.image} width="100%" />
                  </LazyLoad>
                </PortfolioLink>
                <PseudoBox
                  mt="10px"
                  _after={{
                    content: "''",
                    display: "block",
                    height: "1px",
                    width: "50px",
                    backgroundColor: "#e9c8bc",
                    my: "10px",
                    mx: "auto"
                  }}
                >
                  <SectionHeading
                    as="h3"
                    fontSize="15px"
                    letterSpacing="2px"
                    fontWeight="400"
                    fontFamily="Montserrat"
                    color="white"
                  >
                    {project.category}
                  </SectionHeading>
                </PseudoBox>
                <PortfolioLink
                  to={`/work/${project.id}`}
                  textTransform="uppercase"
                  color="white"
                >
                  {project.title}
                </PortfolioLink>
              </Box>
            ))}
          </StyledMasonry>
        </Section>
      </Layout>
    </>
  );
};

export default ({ data }) => {
  const posts = data.prismic.allPosts.edges;
  const projects = data.prismic.allProjects.edges;

  const doc = data.prismic.allServices_pages.edges.slice(0, 1).pop();
  const portfolioPage = data.prismic.allPortfolio_pages.edges.slice(0, 1).pop();

  const home = data.prismic.allHomepages.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  const projectCategories = projects.reduce((total, item) => {
    const arr = total;
    if (!arr.includes(item.node.project_category[0].text.toLowerCase())) {
      arr.push(item.node.project_category[0].text.toLowerCase());
    }

    return arr;
  }, []);

  if (!doc || !portfolioPage) return null;

  return (
    <Services
      services={doc}
      projects={projects}
      home={home.node}
      posts={posts}
      portfolio={portfolioPage.node}
      meta={meta}
      projectCategories={projectCategories}
    />
  );
};

Services.propTypes = {
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
      allPosts(sortBy: post_date_DESC) {
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

      allServices_pages {
        edges {
          node {
            left_button
            left_button_subheading
            map_heading
            map_image
            map_subheading
            right_button
            right_button_subheading
            wedding_checkerboard {
              checkerboard_heading
              checkerboard_image
              checkerboard_link
              checkerboard_text
            }
            weddings_heading
            weddings_highlight_text
            weddings_subheading
          }
        }
      }

      allHomepages {
        edges {
          node {
            testimonial_carousel {
              testimonial_author
              testimonial_date
              testimonial_quote
              testimonial_slide_image
              testimonial_title
            }
          }
        }
      }

      allPortfolio_pages {
        edges {
          node {
            featured_projects {
              project {
                ... on PRISMIC_Project {
                  project_title
                  project_category
                  project_hero_image
                  project_description
                  project_post_date
                  _meta {
                    uid
                  }
                }
              }
            }
            portfolio_heading
            portfolio_highlight_text
            portfolio_subheading
          }
        }
      }

      allProjects {
        edges {
          node {
            project_category
            project_description
            project_hero_image
            project_post_date
            project_preview_description
            project_preview_thumbnail
            project_title
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
