import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";
import SectionHeading from "components/_ui/SectionHeading";
import SectionSubheading from "components/_ui/SectionSubheading";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import Section from "components/Section";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import {
  FaFacebookF,
  FaPinterest,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Flex from "@chakra-ui/core/dist/Flex";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import Input from "@chakra-ui/core/dist/Input";
import Textarea from "@chakra-ui/core/dist/Textarea";
import Button from "@chakra-ui/core/dist/Button";
import FormControl from "@chakra-ui/core/dist/FormControl";
import ExternalLink from "@chakra-ui/core/dist/Link";
import Container from "../components/Container";
import GoogleMapReact from "google-map-react";
import {
  getPrismicText,
  getPrismicImage,
  getUrl,
} from "../lib/PrismicFunctions";
import Loadable from "react-loadable";
const p = require("phin");

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
  cursor: pointer;

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

const PageTitle = styled(Box)`
  h1 {
    letter-spacing: 5px;
    font-family: Montserrat;
    font-size: 24px;
    text-transform: uppercase;
  }
`;

const PageSubtitle = styled(ScrollLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
  opacity: 0.75;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
  h3 {
    letter-spacing: 3px;
    font-family: Montserrat;
    font-size: 18px;
    padding-left: 20px;
    text-transform: uppercase;
    font-weight: 400;
    color: white;
  }
`;

const Contact = ({ meta, blog, contact, global }) => (
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
        url: getPrismicImage(contact.hero_image),
        sharp: contact.hero_imageSharp.childImageSharp.fluid,
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
          paddingBottom="30px"
        >
          <Flex flex="1" width="100%" justifyContent="flex-end">
            <Box flex="1" textAlign="right" py="30px">
              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  LOCATION
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  <PrismicRichText render={contact.location} />
                </Text>
              </DetailsBox>

              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  CONTACT NUMBER
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  <PrismicRichText render={contact.contact_number} />
                </Text>
              </DetailsBox>

              <DetailsBox my="20px">
                <Text fontWeight="700" margin="0" fontFamily="Montserrat">
                  EMAIL ADDRESS
                </Text>
                <Text as="em" fontFamily="Montserrat">
                  <PrismicRichText render={contact.email_address} />
                </Text>
              </DetailsBox>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Box
              flex="1"
              textAlign="left"
              display={{ xs: "none", md: "initial" }}
            >
              <PageTitle>
                <PrismicRichText render={contact.page_title} />
              </PageTitle>
              <Box display={{ xs: "none", md: "initial" }}>
                <PageSubtitle
                  to="contact-form"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  <Box as={FaChevronDown} size="20px" color="white" />
                  <PrismicRichText render={contact.page_subtitle} />
                </PageSubtitle>
              </Box>
            </Box>
            <Box flex="1" textAlign={{ xs: "center", md: "right" }}>
              <Text fontWeight="700" my="10px" fontFamily="Montserrat">
                {getPrismicText(contact.follow_us_heading)}
              </Text>
              <Text as="em" my="10px" fontFamily="Montserrat" display="block">
                {getPrismicText(contact.follow_us_text)}
              </Text>
              <Box
                marginLeft="auto"
                marginRight={{ xs: "auto", md: "0" }}
                width={{ xs: "50%", md: "30%" }}
              >
                <Flex justifyContent="space-between">
                  <ExternalLink href={getUrl(global.instagram)}>
                    <Box as={FaInstagram} size="30px" color="white" />
                  </ExternalLink>
                  <ExternalLink href={getUrl(global.pinterest)}>
                    <Box as={FaPinterest} size="30px" color="white" />
                  </ExternalLink>
                  <ExternalLink href={getUrl(global.facebook)}>
                    <Box as={FaFacebookF} size="30px" color="white" />
                  </ExternalLink>
                </Flex>
              </Box>
              <Box display={{ xs: "initial", md: "none" }}>
                <PageSubtitle
                  to="contact-form"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  <Box as={FaChevronDown} size="20px" color="white" />
                  <PrismicRichText render={contact.page_subtitle} />
                </PageSubtitle>
              </Box>
            </Box>
          </Flex>
        </Container>
      }
    >
      <LazyLoad placeholder={<Skeleton />}>
        <Section
          outerProps={{
            backgroundColor: colors.njabDarkPink,
            py: "80px",
          }}
        >
          <Flex color="white" justifyContent="center" id="contact-form">
            <Box
              width={{ xs: "100%", md: "50%" }}
              textAlign="center"
              textTransform="uppercase"
            >
              <PseudoBox
                _after={{
                  content: "''",
                  display: "flex",
                  height: "1px",
                  width: "50px",
                  backgroundColor: "#e9c8bc",
                  margin: "20px auto",
                }}
              >
                <SectionHeading>
                  <PrismicRichText render={contact.form_heading} />
                </SectionHeading>
              </PseudoBox>
              <SectionSubheading>
                <PrismicRichText render={contact.form_subheading} />
              </SectionSubheading>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const sendEmail = await p({
                    url: "/api/email",
                    method: "POST",
                    data: {
                      name: "hi",
                      email: "sample@sample.com",
                      body: "HAHAHAHA HEHEHEHE",
                    },
                  });
                  console.log(sendEmail);
                }}
              >
                <FormControl marginTop="50px" as="fieldset" border="none">
                  <Flex flexDirection={{ xs: "column", md: "row" }}>
                    <FormInput
                      aria-describedby="your-name"
                      variant="flushed"
                      placeholder="Your Name"
                      mr={{ md: "15px" }}
                    />
                    <FormInput
                      aria-describedby="your-email"
                      variant="flushed"
                      placeholder="Your Email"
                      ml={{ md: "15px" }}
                    />
                  </Flex>
                  <FormTextarea
                    aria-describedby="your-message"
                    placeholder="Your Message"
                  />
                  <SubmitButton type="submit">Submit</SubmitButton>
                </FormControl>
              </form>
            </Box>
          </Flex>
        </Section>
        <Box minHeight="600px" height="25vh" width="100%">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBX4uSYUZpp9sn1tYjU1OcQBuas9LZkv78",
            }}
            defaultCenter={{
              lat: contact.map_latitude,
              lng: contact.map_longitude,
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
  const global = data.prismic.allGlobals.edges.slice(0, 1).pop();

  const meta = data.site.siteMetadata;

  if (!blog) return null;

  return (
    <Contact
      contact={contact.node}
      blog={blog.node}
      meta={meta}
      global={global.node}
    />
  );
};

Contact.propTypes = {
  meta: PropTypes.object.isRequired,
};

export const query = graphql`
  {
    prismic {
      allGlobals {
        edges {
          node {
            instagram {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            facebook {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            pinterest {
              ... on PRISMIC__ExternalLink {
                url
              }
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
            hero_imageSharp {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            instagram_link {
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            location
            map_latitude
            map_longitude
            page_title
            page_subtitle
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
