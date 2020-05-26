import React, { useRef } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Link from "components/_ui/Link";
import { graphql } from "gatsby";
import Button from "components/_ui/Button";
import Layout from "components/Layout";
import DisjointedSlider from "components/DisjointedSlider";
import Section from "components/Section";
import { FaFacebookF, FaPinterest, FaInstagram } from "react-icons/fa";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Mosaic from "components/Mosaic";

import Image from "@chakra-ui/core/dist/Image";
import List, { ListItem } from "@chakra-ui/core/dist/List";
import Flex from "@chakra-ui/core/dist/Flex";
import Grid from "@chakra-ui/core/dist/Grid";
import Heading from "@chakra-ui/core/dist/Heading";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Icon from "@chakra-ui/core/dist/Icon";
import ExternalLink from "@chakra-ui/core/dist/Link";

import { getPrismicImage } from "../lib/PrismicFunctions";
import dayjs from "dayjs";

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

const ProjectHeroContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  img {
    max-width: 600px;
    margin-bottom: 10px;
  }
`;

const ProjectTitle = styled("div")`
  margin: 0;
  text-transform: uppercase;
  font-size: 15px;

  h1 {
    color: ${colors.njabDarkPink};
    font-size: 30px;
    letter-spacing: 4px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const ProjectSubtitle = styled("div")`
  margin: 0;
  text-transform: uppercase;
  font-size: 15px;

  h1 {
    color: ${colors.njabDarkPink};
    font-size: 18px;
    letter-spacing: 4px;
    margin-top: 0;
    margin-bottom: 15px;
    font-weight: 300;
  }
`;

const ProjectBody = styled("div")`
  margin: 0;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`;

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
  text-decoration: none;
`;

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

const SliderLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: white;
    opacity: 0.75;
    text-decoration: none;
  }
`;

const StyledDate = styled.p`
  color: ${colors.njabDarkPink};
  font-size: 14px;
`;

const StyledText = styled(Text)`
  font-family: Montserrat;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const FeaturedHeading = styled(Box)`
  h1 {
    font-size: 14px;
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

const Project = ({ project, meta, allProjects, fullPath, home }) => {
  const bottomRef = useRef(null);
  return (
    <>
      <Helmet
        title={`${project.project_title[0].text} | Not Just a Box Events`}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${project.project_title[0].text} | Not Just a Box Events`,
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
      <Layout>
        <Section flexDirection="row" flexWrap={{ xs: "wrap", md: "nowrap" }}>
          <Box flex={{ xs: "1 0 100%", md: "1 1 50%" }} paddingRight="5%">
            <ProjectTitle>
              <PrismicRichText render={project.project_title} />
            </ProjectTitle>
            <ProjectSubtitle>
              <PrismicRichText render={project.project_subtitle} />
            </ProjectSubtitle>
            <Text as="em" mb="50px" fontFamily="Montserrat" display="block">
              <StyledDate>
                {dayjs(project.post_date).format("MMMM DD, YYYY")}
              </StyledDate>
            </Text>
            <ProjectBody>
              <StyledText>
                <PrismicRichText render={project.project_description} />
              </StyledText>
              <Box display="table" mb="50px">
                <Text
                  fontFamily="Montserrat"
                  color={colors.njabDarkPink}
                  fontSize="12px"
                  letterSpacing="2px"
                  display="table"
                >
                  SHARE THIS PROJECT{" "}
                </Text>
                <Flex width="100%" justifyContent="space-between">
                  <ExternalLink
                    href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}`}
                  >
                    <Box
                      as={FaInstagram}
                      size="20px"
                      color={colors.njabDarkPink}
                    />
                  </ExternalLink>
                  <ExternalLink
                    href={`https://twitter.com/home?status=${fullPath}`}
                  >
                    <Box
                      as={FaPinterest}
                      size="20px"
                      color={colors.njabDarkPink}
                    />
                  </ExternalLink>
                  <ExternalLink
                    href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}`}
                  >
                    <Box
                      as={FaFacebookF}
                      size="20px"
                      color={colors.njabDarkPink}
                    />
                  </ExternalLink>
                </Flex>
              </Box>
              <ScrollLink
                to="bottom-container"
                spy={true}
                smooth={true}
                duration={500}
              >
                <Flex>
                  <Box
                    as={FiArrowDown}
                    size="20px"
                    color={colors.njabDarkPink}
                    mr="20px"
                  />
                  <Text
                    fontFamily="Montserrat"
                    color={colors.njabDarkPink}
                    fontSize="12px"
                    letterSpacing="2px"
                    margin="0"
                  >
                    SCROLL DOWN TO SEE MORE
                  </Text>
                </Flex>
              </ScrollLink>
            </ProjectBody>
          </Box>
          <Box width="100%" flex={{ xs: "1 0 100%", md: "1 1 50%" }}>
            {project.project_hero_image && (
              <ProjectHeroContainer width="100%">
                <Image
                  src={getPrismicImage(project.project_hero_image)}
                  alt={project.project_title}
                  width="100%"
                />
                {project.images.map((item, index) => (
                  <Image
                    src={getPrismicImage(item.gallery_image)}
                    alt={`image-${index}`}
                  />
                ))}
              </ProjectHeroContainer>
            )}
          </Box>
        </Section>
        <Section>
          <Flex justifyContent="center">
            <Box display="table">
              <Text
                fontFamily="Montserrat"
                color={colors.njabDarkPink}
                fontSize="12px"
                letterSpacing="2px"
                display="table"
              >
                SHARE THIS PROJECT{" "}
              </Text>
              <Flex width="100%" justifyContent="space-between">
                <ExternalLink
                  href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}`}
                >
                  <Box
                    as={FaInstagram}
                    size="20px"
                    color={colors.njabDarkPink}
                  />
                </ExternalLink>
                <ExternalLink
                  href={`https://twitter.com/home?status=${fullPath}`}
                >
                  <Box
                    as={FaPinterest}
                    size="20px"
                    color={colors.njabDarkPink}
                  />
                </ExternalLink>
                <ExternalLink
                  href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}`}
                >
                  <Box
                    as={FaFacebookF}
                    size="20px"
                    color={colors.njabDarkPink}
                  />
                </ExternalLink>
              </Flex>
            </Box>
          </Flex>
          <WorkLink to={"/portfolio"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </Section>
        <Section
          outerProps={{
            backgroundColor: colors.njabDarkPink,
            py: "80px",
            marginTop: "80px",
          }}
          maxWidth="initial"
          id="bottom-container"
        >
          <Box margin="0 auto" width="100%" px="30px">
            <Heading
              as="h1"
              textTransform="uppercase"
              letterSpacing="8px"
              fontSize="20px"
              mt="0"
              mb="20px"
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
            {allProjects.map((item, index) => (
              <PseudoBox
                height="400px"
                justifyContent="center"
                // px="15px"
                _focus={{ outline: "none" }}
                position="relative"
                overflow="hidden"
              >
                <Flex
                  height="100%"
                  width="100%"
                  color="white"
                  flexDirection="column"
                  justifyContent={{ xs: "flex-start", md: "flex-end" }}
                  alignItems="flex-start"
                  fontWeight="500"
                  padding="25px"
                  background="linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 100%)"
                >
                  <SliderLink to={`/work/${item.node._meta.uid}`}>
                    <Heading
                      as="h1"
                      textTransform="uppercase"
                      fontSize="20px"
                      margin="0"
                      marginBottom="5px"
                      fontFamily="Montserrat"
                    >
                      {item.node.project_title.map((i) => i.text)}
                    </Heading>
                    <Text
                      fontFamily="Montserrat"
                      margin="0"
                      marginRight="5px"
                      marginBottom="10px"
                      fontSize="12px"
                    >
                      {item.node.project_preview_description[0].text}
                    </Text>
                  </SliderLink>
                </Flex>
                <Image
                  // px="15px"
                  src={getPrismicImage(item.node.project_hero_image)}
                  position="absolute"
                  top="0"
                  zIndex="-1"
                  style={{
                    filter: "brightness(0.7)",
                  }}
                />
              </PseudoBox>
            ))}
          </RelatedSlider>
        </Section>
        <Section
          outerProps={{
            py: "80px",
          }}
        >
          <Flex
            color={colors.njabDarkPink}
            mb="30px"
            alignItems="center"
            flexDirection="column"
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
              <FeaturedHeading>
                <Heading
                  as="h1"
                  fontFamily="Montserrat"
                  textTransform="uppercase"
                >
                  Lorem Ipsum
                </Heading>
              </FeaturedHeading>
            </PseudoBox>
            <FeaturedSubheading>
              <Text as="p" fontFamily="Montserrat" textTransform="uppercase">
                Follow Us
              </Text>
            </FeaturedSubheading>
          </Flex>
          <Mosaic
            height="400px"
            images={home.mosaic.map((item) => ({
              link: item.mosaic_link,
              image: getPrismicImage(item.mosaic_image),
              imageSharp: item.mosaic_imageSharp,
            }))}
          />
        </Section>
        <Section alignItems="flex-end">
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

export default ({ data, path, location }) => {
  const id = path.replace("/work/", "");
  const home = data.prismic.allHomepages.edges.slice(0, 1).pop();

  const projectContent = data.prismic.allProjects.edges.filter(
    (edge) => edge.node._meta.uid === id
  )[0];

  const allProjects = data.prismic.allProjects.edges
    .filter((edge) => edge.node._meta.uid !== id)
    .slice(0, 5);

  const meta = data.site.siteMetadata;

  if (!projectContent || !home || !allProjects) return null;
  return (
    <Project
      fullPath={location.href}
      project={projectContent.node}
      home={home.node}
      meta={meta}
      allProjects={allProjects}
    />
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export const query = graphql`
  query ProjectQuery {
    prismic {
      allProjects {
        edges {
          node {
            project_title
            project_subtitle
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_hero_image
            project_description
            images {
              gallery_image
            }
            _meta {
              uid
            }
          }
        }
      }

      allHomepages {
        edges {
          node {
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
            mosaic_heading
            mosaic_subheading
            mosaic_highlight_text
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
