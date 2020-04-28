import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Moment from "react-moment";
import { graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

import Layout from "components/Layout";
import Section from "components/Section";
import DisjointedSlider from "components/DisjointedSlider";
import Logo from "components/_ui/Logo";
import Link from "components/_ui/Link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";

import { MdPersonOutline } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { animateScroll as scroll } from "react-scroll";

import {
  Image,
  List,
  ListItem,
  Flex,
  Grid,
  Heading,
  PseudoBox,
  Box,
  Text,
  Icon
} from "@chakra-ui/core";
import Container from "../components/Container";

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`;

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  h6 {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`;

const PostCategory = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: ${colors.grey600};

  h5 {
    margin-top: 0;
    margin-bottom: 1em;
  }
`;

const PostTitle = styled("div")`
  color: 707070;
  h1 {
    margin: 0;
    margin-top: 20px;
    font-size: 25px;
  }
`;

const PostBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`;

const PostMetas = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 2em;
  font-size: 0.85em;
  color: ${colors.grey600};
`;

const PostAuthor = styled("div")`
  color: ${colors.njabGray};
  margin: 0;
`;

const PostDate = styled("div")`
  margin: 0;
`;

const BackLink = styled(Link)`
  font-weight: 700;
  color: ${colors.njabDarkPink};
`;

const SliderLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: white;
    opacity: 0.75;
    text-decoration: none;
  }
`;

const journal = [
  {
    title: "LOREM IPSUM DOLOR SIT AMET",
    image: "/home-assets/Bottom1.png",
    date: "December 2, 2019",
    author: "Alahna Sam Sy"
  },
  {
    title: "LOREM IPSUM DOLOR SIT AMET",
    image: "/home-assets/Bottom2.png",
    date: "December 2, 2019",
    author: "Alahna Sam Sy"
  },
  {
    title: "LOREM IPSUM DOLOR SIT AMET",
    image: "/home-assets/Bottom3.png",
    date: "December 2, 2019",
    author: "Alahna Sam Sy"
  }
];

const RelatedSlider = styled(DisjointedSlider)`
  padding-top: 20px;

  .slick-slide {
    margin-left: -120px;
    padding-right: 150px;
  }

  .slick-slide:first-of-type {
    margin-left: 30px;
  }
`;

const StyledPseudoBox = styled(PseudoBox)`
  .details-container {
    transition: all 0.3s;
    opacity: 0;
  }

  &:hover {
    .details-container {
      opacity: 1;
    }
  }
`;

const Post = ({ post, meta, blog, allPosts }) => {
  return (
    <>
      <Helmet
        title={`${post.post_title[0].text} | Not Just a Box Eecnts`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description
          },
          {
            property: `og:title`,
            content: `${post.post_title[0].text} | Not Just a Box Eecnts`
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
              >
                OUR STORY
              </Heading>
            </PseudoBox>
            <Heading
              as="h1"
              letterSpacing="5px"
              fontFamily="Montserrat"
              fontSize="24px"
              margin="0"
            >
              OUR JOURNAL
            </Heading>
            <Grid
              width="100%"
              gridTemplateColumns="1fr"
              gridTemplateRows="1fr"
              gridColumnGap="0px"
              gridRowGap="0px"
              fontSize="12px"
              fontWeight="500"
              my="30px"
              mt="15px"
            >
              <Text
                py="10px"
                paddingRight="20px"
                fontFamily="Montserrat"
                textTransform="uppercase"
                mr="auto"
              >
                {`OUR JOURNAL > ${post.post_category.map(
                  category => `${category.text} `
                )} > `}
                <Moment format="MMDDYY">{post.post_date}</Moment>
              </Text>
            </Grid>
          </Container>
        }
      >
        <Section>
          <PostTitle>{RichText.render(post.post_title)}</PostTitle>
          <PostMetas>
            <Box
              as={MdPersonOutline}
              size="20px"
              mr="5px"
              color={colors.njabGray}
            />
            <PostAuthor>
              {post.post_author},{" "}
              <Moment format="MMMM D, YYYY">{post.post_date}</Moment>
            </PostAuthor>
          </PostMetas>
          <Flex alignItems="center" marginBottom="2em">
            <Text
              textTransform="uppercase"
              margin="0"
              fontSize="12px"
              color="#666"
            >
              Share On:
            </Text>
            <Box
              as={FaFacebookF}
              size="20px"
              color={colors.njabDarkPink}
              mx="10px"
            />
            <Box
              as={FaTwitter}
              size="20px"
              color={colors.njabDarkPink}
              mx="10px"
            />
            <Box
              as={FaLinkedinIn}
              size="20px"
              color={colors.njabDarkPink}
              mx="10px"
            />
            <Box
              as={GoMail}
              size="20px"
              color={colors.njabDarkPink}
              mx="10px"
            />
          </Flex>
        </Section>
        {post.post_hero_image && (
          <Section>
            <Image
              src={post.post_hero_image.url}
              alt={post.post_hero_image.alt}
              width="100%"
              height="auto"
            />
            <PostHeroAnnotation>
              {RichText.render(post.post_hero_annotation)}
            </PostHeroAnnotation>
          </Section>
        )}
        <Section color="#413f42">
          <Box>
            {RichText.render(post.post_body)}
            <BackLink width="auto" to="/blog">
              {`< `}Back to our Journal
            </BackLink>
          </Box>
        </Section>
        <Section
          outerProps={{
            backgroundColor: colors.njabDarkPink,
            py: "80px",
            marginTop: "80px"
          }}
          maxWidth="initial"
          fullWidth
        >
          <Box margin="0 auto" width="100%" px="30px">
            <Heading
              as="h1"
              textTransform="uppercase"
              letterSpacing="8px"
              fontSize="20px"
              my="20px"
              fontFamily="Montserrat"
              color="white"
            >
              Similar Stories
            </Heading>
          </Box>
          <RelatedSlider
            slidesToShow={2}
            centerMode={false}
            infinite={false}
            dots={false}
          >
            {allPosts.map((item, index) => (
              <StyledPseudoBox
                height="400px"
                justifyContent="center"
                // px="15px"
                _focus={{ outline: "none" }}
                position="relative"
                overflow="hidden"
              >
                <Flex
                  className="details-container"
                  height="100%"
                  width="100%"
                  color="white"
                  flexDirection="column"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  fontWeight="500"
                  padding="25px"
                  background="linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%)"
                >
                  <SliderLink to={`/blog/${item.node._meta.uid}`}>
                    <Heading
                      as="h1"
                      textTransform="uppercase"
                      fontSize="20px"
                      margin="0"
                      marginBottom="5px"
                      fontFamily="Montserrat"
                    >
                      {item.node.post_title.map(i => i.text)}
                    </Heading>
                    <Text
                      fontFamily="Montserrat"
                      margin="0"
                      marginRight="5px"
                      marginBottom="10px"
                      fontSize="12px"
                    >
                      {item.node.post_preview_description[0].text}
                    </Text>
                    <Flex
                      fontSize="12px"
                      fontWeight="500"
                      margin="0"
                      alignItems="center"
                    >
                      <Box
                        as={MdPersonOutline}
                        size="20px"
                        mr="5px"
                        color="white"
                      />
                      <Text
                        fontFamily="Montserrat"
                        as="em"
                        margin="0"
                        marginRight="5px"
                      >
                        {item.node.post_author},{" "}
                      </Text>
                      <Text fontFamily="Montserrat" margin="0">
                        <Moment format="MMM DD, YYYY">
                          {item.node.post_date}
                        </Moment>
                      </Text>
                    </Flex>
                  </SliderLink>
                </Flex>
                <Image
                  // px="15px"
                  height="100%"
                  src={item.node.post_hero_image.url}
                  position="absolute"
                  top="0"
                  zIndex="-1"
                  style={{
                    filter: "brightness(0.7)"
                  }}
                />
              </StyledPseudoBox>
            ))}
          </RelatedSlider>
        </Section>
        <Section
          alignItems="flex-end"
          outerProps={{
            py: "50px"
          }}
        >
          <a onClick={() => scroll.scrollToTop()}>
            <Flex alignItems="center">
              <Text
                fontFamily="Montserrat"
                color={colors.njabDarkPink}
                fontSize="8px"
                letterSpacing="2px"
                margin="0"
              >
                BACK TO TOP
              </Text>
              <Box
                as={FiArrowUp}
                size="20px"
                color={colors.njabDarkPink}
                ml="10px"
              />
            </Flex>
          </a>
        </Section>
      </Layout>
    </>
  );
};

export default ({ data, path }) => {
  const id = path.replace("/blog/", "");

  const postContent = data.prismic.allPosts.edges.filter(
    edge => edge.node._meta.uid === id
  )[0];

  const allPosts = data.prismic.allPosts.edges
    .filter(edge => edge.node._meta.uid !== id)
    .slice(0, 5);

  const blog = data.prismic.allBlog_pages.edges.slice(0, 1).pop();

  if (!postContent) return null;

  const meta = data.site.siteMetadata;
  return (
    <Post
      post={postContent.node}
      blog={blog.node}
      allPosts={allPosts}
      meta={meta}
    />
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  query PostQuery {
    prismic {
      allPosts {
        edges {
          node {
            post_title
            post_hero_image
            post_hero_annotation
            post_date
            post_category
            post_body
            post_author
            post_preview_description
            _meta {
              uid
            }
          }
        }
      }

      allBlog_pages {
        edges {
          node {
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
