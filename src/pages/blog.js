import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";
import Mosaic from "components/Mosaic";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import Section from "components/Section";
import Checkerboard from "components/Checkerboard";
import Heading from "@chakra-ui/core/dist/Heading";
import Grid from "@chakra-ui/core/dist/Grid";
import Link from "@chakra-ui/core/dist/Link";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Flex from "@chakra-ui/core/dist/Flex";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import List, { ListItem } from "@chakra-ui/core/dist/List";
import Container from "../components/Container";
import { getPrismicText, getPrismicImage } from "../lib/PrismicFunctions";
import Loadable from "react-loadable";

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

const CategoryLink = styled(Link)`
  &:hover {
    color: white;
  }
`;

const Blog = ({ meta, blog, posts, categories }) => {
  const [filter, setFilter] = useState("");
  const newPosts = posts.filter((post) => {
    return !!filter ? post.category === filter : true;
  });
  return (
    <>
      <Helmet
        title={`Our Journal | Not Just a Box Events`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `Our Journal | Not Just a Box Events`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout
        headerVariant="dark"
        headerBackground={{
          url: getPrismicImage(blog.page_hero_image),
          sharp: blog.page_hero_imageSharp.childImageSharp.fluid,
          size: "cover",
          position: { md: "0 calc(50% + 35px)" },
          highlight:
            "linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%)",
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
                my: "20px",
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
              <Text
                as="em"
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
                    <CategoryLink
                      onClick={(e) => {
                        e.preventDefault();
                        setFilter("");
                      }}
                      color="white"
                    >
                      ALL
                    </CategoryLink>
                  </ListItem>

                  {categories.map((item) => (
                    <ListItem
                      flex={{ xs: "1 0 100%", md: "1" }}
                      textTransform="uppercase"
                      py="5px"
                    >
                      <CategoryLink
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter(item);
                        }}
                        color="white"
                      >
                        {item.toUpperCase()}
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
          <Checkerboard items={newPosts} />
        </Section>

        <LazyLoad placeholder={<Skeleton />}>
          <Section
            outerProps={{
              py: "80px",
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
                    my: "20px",
                  }}
                >
                  <SectionHeading>
                    <PrismicRichText render={blog.follow_us_heading} />
                  </SectionHeading>
                </PseudoBox>
                <SectionSubheading>
                  <PrismicRichText render={blog.follow_us_subheading} />
                </SectionSubheading>
              </Box>
            </Flex>
            <Mosaic
              height="400px"
              images={blog.mosaic.map((item) => ({
                link: item.mosaic_link,
                image: getPrismicImage(item.mosaic_image),
                imageSharp: item.mosaic_imageSharp,
              }))}
            />
          </Section>
        </LazyLoad>
      </Layout>
    </>
  );
};

export default ({ data }) => {
  const posts = data.prismic.allPosts.edges.map(({ node }) => {
    return {
      title: getPrismicText(node.post_title),
      category: getPrismicText(node.post_category)
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      description: getPrismicText(node.post_preview_description),
      link_text: "Read more",
      image: getPrismicImage(node.post_hero_image),
      link: `/blog/${node._meta.uid}`,
    };
  });

  const categories = data.prismic.allPosts.edges.reduce((total, item) => {
    const { node } = item;
    const arr = total;
    const category = getPrismicText(node.post_category)
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
    if (!arr.includes(category)) {
      arr.push(category);
    }
    return arr;
  }, []);
  const blog = data.prismic.allBlog_pages.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  if (!blog) return null;

  return (
    <Blog blog={blog.node} posts={posts} meta={meta} categories={categories} />
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
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
              mosaic_imageSharp {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              mosaic_link {
                ... on PRISMIC__ExternalLink {
                  url
                }
                ... on PRISMIC_Service {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Portfolio_page {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Post {
                  _meta {
                    type
                    uid
                  }
                }
                ... on PRISMIC_Project {
                  _meta {
                    uid
                    type
                  }
                }
                ... on PRISMIC_Contact_page {
                  _meta {
                    type
                    uid
                  }
                }
                ... on PRISMIC_Blog_page {
                  _meta {
                    type
                    uid
                  }
                }
                ... on PRISMIC_About_page {
                  _meta {
                    type
                    uid
                  }
                }
                ... on PRISMIC_Services_page {
                  _meta {
                    type
                    uid
                  }
                }
              }
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
