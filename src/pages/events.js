import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
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
import Heading from "@chakra-ui/core/dist/Heading";
import Grid from "@chakra-ui/core/dist/Grid";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Image from "@chakra-ui/core/dist/Image";
import Flex from "@chakra-ui/core/dist/Flex";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import List, { ListItem } from "@chakra-ui/core/dist/List";
import Button from "@chakra-ui/core/dist/Button";
import { getPrismicImage } from "../lib/PrismicFunctions";
import Loadable from "react-loadable";
import preview from "../images/njab/fbimage.png";

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
  portfolio,
}) => {
  const [filter, setFilter] = useState(0);

  const newProjects = projects
    .filter((project) =>
      !!filter
        ? project.node.project_category[0].text.toLowerCase() === filter
        : true
    )
    .map((project, index) => ({
      id: project.node._meta.uid,
      title: project.node.project_title[0].text,
      image: getPrismicImage(project.node.project_hero_image),
      category: project.node.project_category[0].text,
    }));

  const featuredProjects = portfolio.featured_projects.map((item, index) => ({
    id: item.project._meta.uid,
    title: item.project.project_title[0].text,
    subtitle: item.project.project_subtitle[0].text,
    image: getPrismicImage(item.project.project_hero_image),
    description: item.project.project_description[0].text,
    date: item.project.project_post_date,
    index: index,
    total: portfolio.featured_projects.length,
  }));

  return (
    <>
      <Layout
        meta={{
          title: `Portfolio | Not Just a Box Events`,
          description: meta.description,
          image: preview,
        }}
      >
        <Section fullWidth mb="40px" maxWidth="initial">
          <HeaderDoubleSlider items={featuredProjects} />
        </Section>
        <Section py="40px">
          <Flex alignItems="center" flexWrap="wrap">
            <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }} mb=" 30px">
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
                <SectionHeading
                  as="h3"
                  fontSize="18px"
                  letterSpacing="2px"
                  fontWeight="400"
                  color={colors.njabDarkPink}
                  fontFamily="Montserrat"
                  textTransform="uppercase"
                >
                  <PrismicRichText render={portfolio.portfolio_heading} />
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
                <PrismicRichText render={portfolio.portfolio_subheading} />
              </SectionSubheading>
            </Box>
            <Box
              flex={{ xs: "1 0 100%", md: "1 0 50%" }}
              textAlign={{ md: "right" }}
              fontWeight="500"
            >
              <HighlightText
                margin="0"
                letterSpacing="1px"
                fontSize="13px"
                color="#707073"
              >
                <PrismicRichText render={portfolio.portfolio_highlight_text} />
              </HighlightText>
            </Box>
          </Flex>
        </Section>

        <Section
          outerProps={{
            backgroundColor: colors.njabMidPink,
          }}
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="center"
          letterSpacing="2px"
          color="white"
        >
          <Grid
            width="100%"
            gridTemplateColumns={{ md: "auto 100px 1fr" }}
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
              <List
                display="flex"
                width="100%"
                textAlign="center"
                padding="0"
                flexWrap="wrap"
              >
                <ListItem
                  flex={{ xs: "1 0 100%", md: "1" }}
                  py={{ xs: "10px", md: "0" }}
                >
                  <CategoryLink onClick={() => setFilter(0)} color="white">
                    ALL
                  </CategoryLink>
                </ListItem>

                {projectCategories.map((category) => (
                  <ListItem
                    flex={{ xs: "1 0 100%", md: "1" }}
                    py={{ xs: "10px", md: "0" }}
                    textTransform="uppercase"
                  >
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
            breakpointCols={{ default: 3, 768: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {newProjects.map((project) => (
              <Box>
                <PortfolioLink
                  to={`/events/${project.id}`}
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
                    mx: "auto",
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
                  to={`/events/${project.id}`}
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
  meta: PropTypes.object.isRequired,
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
                  project_subtitle
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
