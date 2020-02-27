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
import { FaMapMarkerAlt } from "react-icons/fa";

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
  ListItem,
  Input,
  Textarea,
  Button,
  FormControl
} from "@chakra-ui/core";
import leftFlower from "../images/njab/flower.png";
import rightFlower from "../images/njab/flower2.png";
import Container from "../components/Container";
import GoogleMapReact from "google-map-react";

const DetailsBox = styled(Box)`
  p {
    margin: 0;
    font-size: 14px;
  }
`;

const FormInput = styled(Input)`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 10px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  font-family: Montserrat;

  &::-webkit-input-placeholder {
    /* Edge */
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &::placeholder {
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &:hover,
  &:focus {
    border-color: white;
  }
`;

const FormTextarea = styled(Textarea)`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 10px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  font-family: Montserrat;

  &::-webkit-input-placeholder {
    /* Edge */
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &::placeholder {
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  &:hover,
  &:focus {
    border-color: white;
    box-shadow: none;
  }
`;

const SubmitButton = styled(Button)`
  text-transform: uppercase;
  background: transparent;
  border: 2px solid white;
  border-radius: 0px;
  color: white;
  padding: 15px 60px;
  max-height: none;
  height: auto;
  letter-spacing: 2px;
  font-family: Montserrat;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: none;
    outline: none;
  }
`;

const MarkerComponent = ({ text }) => (
  <Box width="50px" height="46px" position="relative">
    <Box
      as={FaMapMarkerAlt}
      width="100%"
      height="100%"
      color={colors.njabMidPink}
    />
  </Box>
);

const Contact = ({ meta, blog, contact }) => (
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
        url: contact.hero_image.url,
        size: "cover",
        position: "0 calc(50% + 35px)",
        highlight:
          "linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%)"
      }}
      headerChildren={
        <Container
          height="calc(80vh - 71px)"
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="center"
          letterSpacing="2px"
          color="white"
          paddingBottom="30px"
        >
          <Flex flex="1" width="100%" justifyContent="flex-end">
            <Box flex="1" textAlign="right" py="30px">
              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  LOCATION
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  {RichText.render(contact.location)}
                </Text>
              </DetailsBox>

              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  CONTACT NUMBER
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  {RichText.render(contact.contact_number)}
                </Text>
              </DetailsBox>

              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  EMAIL ADDRESS
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  {RichText.render(contact.email_address)}
                </Text>
              </DetailsBox>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Box flex="1" textAlign="left">
              <Heading
                as="h1"
                letterSpacing="5px"
                fontFamily="Montserrat"
                fontSize="24px"
              >
                OUR JOURNAL
              </Heading>
              <Text py="10px" paddingRight="20px" fontFamily="Montserrat">
                GET IN TOUCH
              </Text>
            </Box>
            <Box flex="1" textAlign="right">
              <Text py="10px" paddingRight="20px" fontFamily="Montserrat">
                FOLLOW US
              </Text>
              <Text py="10px" paddingRight="20px" fontFamily="Montserrat">
                LOREM IPSUM DOLOR SIT AMET
              </Text>
            </Box>
          </Flex>
        </Container>
      }
    >
      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            backgroundColor: colors.njabDarkPink,
            py: "80px"
          }}
        >
          <Flex color="white" justifyContent="center">
            <Box width="50%" textAlign="center" textTransform="uppercase">
              <PseudoBox
                _after={{
                  content: "''",
                  display: "flex",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  margin: "20px auto"
                }}
              >
                <SectionHeading>
                  {RichText.render(contact.form_heading)}
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading>
                {RichText.render(contact.form_subheading)}
              </SectionSubheading>
              <FormControl marginTop="50px" as="fieldset" border="none">
                <Flex>
                  <FormInput
                    aria-describedby="your-name"
                    variant="flushed"
                    placeholder="Your Name"
                    mr="15px"
                  />
                  <FormInput
                    aria-describedby="your-email"
                    variant="flushed"
                    placeholder="Your Email"
                    ml="15px"
                  />
                </Flex>
                <FormTextarea
                  aria-describedby="your-message"
                  placeholder="Your Message"
                />
                <SubmitButton type="submit">Submit</SubmitButton>
              </FormControl>
            </Box>
          </Flex>
        </Section>
        <Box minHeight="600px" height="25vh" width="100%">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBX4uSYUZpp9sn1tYjU1OcQBuas9LZkv78"
            }}
            defaultCenter={{
              lat: contact.map_latitude,
              lng: contact.map_longitude
            }}
            defaultZoom={18}
          >
            <MarkerComponent
              lat={contact.map_latitude + 0.00015}
              lng={contact.map_longitude - 0.00025}
              text={"We are here"}
            />
          </GoogleMapReact>
        </Box>
      </LazyLoad>
    </Layout>
  </>
);

export default ({ data }) => {
  const blog = data.prismic.allBlog_pages.edges.slice(0, 1).pop();
  const contact = data.prismic.allContact_pages.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  if (!blog) return null;

  return <Contact contact={contact.node} blog={blog.node} meta={meta} />;
};

Contact.propTypes = {
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
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
            page_subheading
          }
        }
      }

      allContact_pages {
        edges {
          node {
            contact_number
            email_address
            facebook_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            follow_us_heading
            follow_us_text
            form_heading
            form_subheading
            get_in_touch_text
            hero_image
            instagram_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            location
            map_latitude
            map_longitude
            page_title
            twitter_link {
              ... on PRISMIC__ExternalLink {
                url
              }
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
