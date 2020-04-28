import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import colors from "styles/colors";
import Layout from "components/Layout";
import Mosaic from "components/Mosaic";
import HighlightText from "components/_ui/HighlightText";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import Section from "components/Section";
import Checkerboard from "components/Checkerboard";
import { RichText } from "prismic-reactjs";

import {
  Heading,
  Grid,
  Link,
  Box,
  Text,
  Image,
  Flex,
  PseudoBox,
  List,
  ListItem
} from "@chakra-ui/core";
import leftFlower from "../images/njab/flower.png";
import rightFlower from "../images/njab/flower2.png";
import Container from "../components/Container";
import { getPrismicText } from "../lib/PrismicFunctions";

const BlogTitle = styled("h1")`
  margin-bottom: 1em;
`;

const BlogGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5em;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 2.5em;
  }
`;

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

const CategoryLink = styled(Link)`
  &:hover {
    color: white;
  }
`;

const Blog = ({ meta, blog, posts }) => (
  <>
    <Helmet
      title={`Our Journal | Not Just a Box Events`}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: meta.description
        },
        {
          property: `og:title`,
          content: `Our Journal | Not Just a Box Events`
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
    <Layout
      headerVariant="dark"
      headerBackground={{
        url: blog.page_hero_image.url,
        sharp: blog.page_hero_imageSharp.childImageSharp.fluid,
        size: "cover",
        position: { md: "0 calc(50% + 35px)" },
        highlight:
          "linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%)"
      }}
      headerChildren={
        <Container
          height="calc(70vh - 71px)"
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="center"
          letterSpacing="2px"
          color="white"
        >
          <PseudoBox
            _after={{
              content: "''",
              display: "block",
              height: "1px",
              width: "50px",
              backgroundColor: "white",
              my: "20px"
            }}
          >
            <Heading
              as="h3"
              fontSize="12px"
              letterSpacing="2px"
              fontWeight="400"
              fontFamily="Montserrat"
              mt={{ xs: "30px", md: "0" }}
            >
              OUR STORY
            </Heading>
          </PseudoBox>
          <Heading
            as="h1"
            letterSpacing="5px"
            fontFamily="Montserrat"
            fontSize="24px"
          >
            OUR JOURNAL
          </Heading>
          <Grid
            width="100%"
            gridTemplateColumns={{ xs: "100%", md: "auto 100px 1fr" }}
            gridTemplateRows="1fr"
            gridColumnGap="0px"
            gridRowGap="0px"
            fontSize="12px"
            fontWeight="500"
            mt={{ xs: "auto", md: "30px" }}
            mb={{ xs: "30px" }}
          >
            <Text as="em" py="10px" paddingRight="20px" fontFamily="Montserrat">
              BROWSE BY CATEGORY
            </Text>
            <Box
              backgroundColor="white"
              transform="rotate(30deg)"
              mx="49px"
              my="5px"
              display={{ xs: "none", md: "initial" }}
            />
            <Flex width="100%" textAlign="initial" alignItems="center">
              <List
                display="flex"
                width="100%"
                textAlign="center"
                flexWrap="wrap"
                padding="0"
              >
                <ListItem py="5px" flex={{ xs: "1 0 100%", md: "1" }}>
                  <CategoryLink href="/" color="white">
                    ALL
                  </CategoryLink>
                </ListItem>

                {blog.categories.map(item => (
                  <ListItem
                    flex={{ xs: "1 0 100%", md: "1" }}
                    textTransform="uppercase"
                    py="5px"
                  >
                    <CategoryLink href="/" color="white">
                      {item.category[0].text}
                    </CategoryLink>
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Grid>
        </Container>
      }
    >
      <Section maxWidth="initial" fullWidth>
        <Checkerboard items={posts} />
      </Section>

      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            py: "80px"
          }}
        >
          <Flex color={colors.njabDarkPink} mb="80px">
            <Box flex="1 0 50%" textTransform="uppercase">
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
                <SectionHeading>
                  {RichText.render(blog.follow_us_heading)}
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading>
                {RichText.render(blog.follow_us_subheading)}
              </SectionSubheading>
            </Box>
          </Flex>
          <Mosaic
            height="400px"
            images={blog.mosaic.map(item => item.mosaic_image.url)}
          />
        </Section>
      </LazyLoad>
    </Layout>
  </>
);

export default ({ data }) => {
  const posts = data.prismic.allPosts.edges.map(({ node }) => {
    return {
      title: getPrismicText(node.post_title),
      description: getPrismicText(node.post_preview_description),
      link_text: "Read more",
      image: node.post_hero_image.url,
      link: `/blog/${node._meta.uid}`
    };
  });
  const blog = data.prismic.allBlog_pages.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  if (!blog) return null;

  return <Blog blog={blog.node} posts={posts} meta={meta} />;
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
      allPosts(sortBy: meta_firstPublicationDate_ASC) {
        edges {
          node {
            post_title
            post_date
            post_category
            post_preview_description
            post_author
            post_date
            post_hero_image
            post_author
            post_category
            _meta {
              uid
            }
          }
        }
      }

      allBlog_pages {
        edges {
          node {
            categories {
              category
            }
            follow_us_heading
            follow_us_subheading
            mosaic {
              mosaic_image
            }
            page_heading
            page_hero_image
            page_hero_imageSharp {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            page_subheading
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
