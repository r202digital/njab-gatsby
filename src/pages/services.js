import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";
import HighlightText from "components/_ui/HighlightText";
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
import Image from "@chakra-ui/core/dist/Image";
import Flex from "@chakra-ui/core/dist/Flex";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import leftFlower from "../images/njab/flower.png";
import rightFlower from "../images/njab/flower2.png";
import { getPrismicText, getPrismicImage } from "../lib/PrismicFunctions";
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

const Services = ({ services, meta }) => {
  const [isWedding, setIsWedding] = useState(true);
  const filteredServices = services.node.wedding_checkerboard.filter((item) => {
    const { linked_service } = item;
    if (!linked_service) {
      return false;
    }
    const category = getPrismicText(
      linked_service.service_category
    ).toLowerCase();
    const includeService = category.includes("wedding");
    return includeService === isWedding;
  });
  const checkerServices = filteredServices.map(({ linked_service }) => {
    return {
      title: getPrismicText(linked_service.service_title),
      description: getPrismicText(linked_service.service_preview_description),
      link_text: getPrismicText(linked_service.service_preview_link_text),
      image: getPrismicImage(linked_service.service_preview_thumbnail),
      link: `/service/${linked_service._meta.uid}`,
    };
  });

  return (
    <>
      <Helmet>
        <title>Services | Not Just a Box Events</title>
        <meta name="title" content={`Services | Not Just a Box Events`} />
        <meta name="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notjustaboxevents.com/" />
        <meta
          property="og:title"
          content={`Services | Not Just a Box Events`}
        />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={preview} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://notjustaboxevents.com/" />
        <meta
          property="twitter:title"
          content={`Services | Not Just a Box Events`}
        />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:image" content={preview} />
      </Helmet>
      <Layout>
        <Section py="80px">
          <Grid
            width="100%"
            gridTemplateColumns={"1fr 50px 1fr"}
            gridTemplateRows="1fr"
            gridColumnGap="0px"
            gridRowGap="0px"
          >
            <Link
              _hover={{
                textDecoration: "none",
                filter: "brightness(0.9)",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsWedding(true);
              }}
            >
              <Box
                textAlign="right"
                py="20px"
                position="relative"
                paddingRight={{ xs: "10px", md: "80px" }}
                zIndex="1"
              >
                <Heading
                  as="h3"
                  fontSize="18px"
                  letterSpacing="2px"
                  fontWeight="700"
                  marginBottom="10px"
                  color={colors.njabDarkPink}
                  fontFamily="Montserrat"
                  textTransform="uppercase"
                >
                  {services.node.left_button[0].text}
                </Heading>
                <Text
                  as="em"
                  fontSize="14px"
                  letterSpacing="2px"
                  marginBottom="20px"
                  color={colors.njabDarkPink}
                  fontFamily="Montserrat"
                >
                  {services.node.left_button_subheading[0].text}
                </Text>
                <Image
                  maxWidth="initial"
                  src={leftFlower}
                  width="auto"
                  height="100%"
                  position="absolute"
                  top="0"
                  left={{ xs: "0", md: "initial" }}
                  right={{ xs: "0", md: "130px" }}
                  margin={{ xs: "0 auto", md: "0" }}
                  zIndex="-1"
                />
              </Box>
            </Link>
            <Box
              backgroundColor="#d0857a"
              transform="rotate(30deg)"
              mx="24px"
              mt={{
                xs: "42px",
                md: "5px",
              }}
              mb={{
                xs: "20px",
                md: "5px",
              }}
            />
            <Link
              _hover={{
                textDecoration: "none",
                filter: "brightness(0.9)",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsWedding(false);
              }}
            >
              <Box
                textAlign="left"
                py="20px"
                position="relative"
                paddingLeft={{ xs: "10px", md: "80px" }}
                zIndex="1"
              >
                <Heading
                  as="h3"
                  fontSize="18px"
                  letterSpacing="2px"
                  fontWeight="700"
                  marginBottom="10px"
                  color={colors.njabDarkPink}
                  textTransform="uppercase"
                  fontFamily="Montserrat"
                >
                  {services.node.right_button[0].text}
                </Heading>
                <Text
                  as="em"
                  fontSize="14px"
                  letterSpacing="2px"
                  marginBottom="20px"
                  color={colors.njabDarkPink}
                  fontFamily="Montserrat"
                >
                  {services.node.right_button_subheading[0].text}
                </Text>
                <Image
                  maxWidth="initial"
                  src={rightFlower}
                  width="auto"
                  height="100%"
                  position="absolute"
                  zIndex="-1"
                  top="0"
                  right={{ xs: "0", md: "initial" }}
                  left={{ xs: "0", md: "110px" }}
                  margin={{ xs: "0 auto", md: "0" }}
                />
              </Box>
            </Link>
          </Grid>
          <Flex
            mt="50px"
            alignItems="center"
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Box flex={{ xs: "1 0 100%", md: "1 0 50%" }}>
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
                >
                  <PrismicRichText render={services.node.weddings_heading} />
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading
                as="h3"
                fontSize="18px"
                letterSpacing="2px"
                marginBottom="20px"
                fontWeight="700"
                color={colors.njabDarkPink}
              >
                <PrismicRichText render={services.node.weddings_subheading} />
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
                <PrismicRichText
                  render={services.node.weddings_highlight_text}
                />
              </HighlightText>
            </Box>
          </Flex>
        </Section>

        <Section maxWidth="initial" fullWidth>
          <Checkerboard items={checkerServices} />
        </Section>

        <LazyLoad placeholder={<Skeleton />}>
          <Section py="80px">
            <Box textAlign={{ xs: "left", md: "center" }} mb={{ xs: "50px" }}>
              <PseudoBox
                _after={{
                  content: "''",
                  display: "block",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  my: "15px",
                  mx: {
                    xs: "0",
                    md: "auto",
                  },
                }}
              >
                <MapHeading as="h3" color={colors.njabDarkPink}>
                  <PrismicRichText render={services.node.map_heading} />
                </MapHeading>
              </PseudoBox>
              <MapSubheading
                as="h3"
                marginBottom="20px"
                color={colors.njabDarkPink}
              >
                <PrismicRichText render={services.node.map_subheading} />
              </MapSubheading>
            </Box>
            <Box>
              <Image
                maxWidth="initial"
                src={getPrismicImage(services.node.map_image)}
                objectFit="cover"
                width="100%"
              />
            </Box>
          </Section>
        </LazyLoad>
      </Layout>
    </>
  );
};

export default ({ data }) => {
  const posts = data.prismic.allPosts.edges;
  const doc = data.prismic.allServices_pages.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  if (!doc) return null;

  return <Services services={doc} posts={posts} meta={meta} />;
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
            wedding_checkerboard {
              linked_service {
                ... on PRISMIC_Service {
                  service_title
                  service_preview_description
                  service_preview_thumbnail
                  service_preview_link_text
                  service_category
                  _meta {
                    uid
                  }
                }
              }
            }
            weddings_heading
            weddings_highlight_text
            weddings_subheading
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
