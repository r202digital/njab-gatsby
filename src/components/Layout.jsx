import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import globalStyles from "styles/global";
import typeStyles from "styles/typography";
import logoStyles from "styles/logo";
import colors from "styles/colors";
import Footer from "components/Footer";
import Header from "components/Header";
import "styles/fonts.scss";
import preview from "../images/njab/fbimage.png";
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider";
import IconButton from "@chakra-ui/core/dist/IconButton";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Image from "@chakra-ui/core/dist/Image";
import Loadable from "react-loadable";
import theme from "../styles/theme";
import MessengerCustomerChat from "react-messenger-customer-chat";

import FontFaceObserver from "fontfaceobserver";
import "react-micro-modal/dist/index.css";
import { parsePrismicUrl } from "../lib/PrismicFunctions";
import { Link, Meta, Title } from "react-head";

const PinkNoTextLogo = Loadable({
  loader: () => import("../components/_ui/NjabLogos"),
  delay: 50,
  render(loaded, props) {
    const { PinkNoTextLogo } = loaded;
    return <PinkNoTextLogo {...props} />;
  },
  loading() {
    return <div />;
  },
});

const MicroModal = Loadable({
  loader: () => import("react-micro-modal"),
  delay: 50,
  loading() {
    return <div />;
  },
});

const PrismicHeading = Loadable({
  loader: () => import("prismic-reactjs"),
  delay: 50,
  render(loaded, props) {
    const { RichText } = loaded;
    const StyledHeading = styled.div`
      h3 {
        margin: 0;
      }
    `;
    return (
      <StyledHeading>
        <RichText {...props} />
      </StyledHeading>
    );
  },
  loading() {
    return <div />;
  },
});

const PrismicRichText = Loadable({
  loader: () => import("prismic-reactjs"),
  delay: 50,
  render(loaded, props) {
    const { RichText } = loaded;
    const StyledRichText = styled.div`
      p {
        line-height: 1.5;
        font-size: 13px;
      }

      img {
        max-width: 100%;
      }

      h4 {
        margin: 0;
      }
    `;
    return (
      <StyledRichText>
        <RichText {...props} />
      </StyledRichText>
    );
  },
  loading() {
    return <div />;
  },
});

const LayoutContainer = styled.div`
  background-color: white;
`;

const StyledClose = styled(IconButton)`
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin-left: 15px;
`;

const Layout = ({
  children,
  headerVariant = "light",
  headerChildren,
  headerBackground,
  hasModal = false,
  meta,
}) => {
  const [fontAvailable, setFontAvailable] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(!sessionStorage.getItem("visited"));
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }

          prismic {
            allGlobals {
              edges {
                node {
                  modal_title
                  modal_text
                  modal_side_image
                  nav_links {
                    nav_link
                  }
                  logo
                  logo_light
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
                  first_link_column_title
                  first_column_links {
                    column_link
                  }
                  second_link_column_title
                  second_column_links {
                    column_link
                  }
                  third_column_title
                  third_column_rich_text
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        // console.log(meta);

        var font = new FontFaceObserver("Montserrat", {
          weight: 400,
        });

        font.load().then(
          function() {
            setFontAvailable(true);
          },
          function() {
            return;
          }
        );
        const { node } = data.prismic.allGlobals.edges.reduce(
          (total, item) => item
        );

        const {
          modal_text,
          modal_title,
          modal_side_image,
          nav_links,
          logo,
          logo_light,
          ...footerInfo
        } = node;

        return (
          <>
            {hasModal && (
              <ThemeProvider theme={theme}>
                <MicroModal
                  open={isModalOpen}
                  closeOnAnimationEnd
                  handleClose={() => {
                    setModalOpen(false);
                    sessionStorage.setItem("visited", true);
                  }}
                  children={(handleClose) => (
                    <Flex height="100%">
                      <Flex
                        justifyContent="center"
                        flex="0 0 40%"
                        overflow="hidden"
                      >
                        <Image
                          objectFit="cover"
                          height="100%"
                          src={parsePrismicUrl(modal_side_image.url, 800)}
                        />
                      </Flex>
                      <Box
                        flex="0 0 60%"
                        height="100%"
                        overflowY="scroll"
                        padding="30px"
                        backgroundColor={colors.njabLightPink}
                      >
                        <Flex>
                          <Box>
                            <PrismicHeading render={modal_title} />
                          </Box>
                          <StyledClose
                            aria-label="Modal close"
                            size="sm"
                            icon="close"
                            onClick={handleClose}
                          />
                        </Flex>
                        <Box>
                          <PrismicRichText render={modal_text} />
                          <PinkNoTextLogo margin="0 auto" />
                        </Box>
                      </Box>
                    </Flex>
                  )}
                />
              </ThemeProvider>
            )}
            <LayoutContainer className="div">
              <MessengerCustomerChat
                pageId="176927569055665"
                appId="1678638095724206"
                themeColor="#ea7674"
                loggedInGreeting="Hi, I'm Debbie! Can I help you with anything?"
                loggedOutGreeting="Hi, I'm Debbie! Can I help you with anything?"
              />
              <Global styles={[globalStyles, typeStyles, logoStyles]} />
              <div className="Layout">
                <Header
                  fontAvailable={fontAvailable}
                  variant={headerVariant}
                  navLinks={nav_links}
                  background={headerBackground}
                >
                  <Meta
                    name="p:domain_verify"
                    content="1228088838575c68d8e15366463bb836"
                  />
                  <Link rel="preconnect" href="https://images.prismic.io" />
                  <Title>{meta.title}</Title>
                  <Meta name="title" content={meta.title} />
                  <Meta name="description" content={meta.description} />
                  <Meta property="og:type" content="website" />
                  <Meta property="og:title" content={meta.title} />
                  <Meta property="og:description" content={meta.description} />
                  <Meta property="og:image" content={meta.image} />
                  <Meta property="twitter:card" content="summary_large_image" />
                  <Meta
                    property="twitter:url"
                    content="https://notjustaboxevents.com/"
                  />
                  <Meta property="twitter:title" content={meta.title} />
                  <Meta
                    property="twitter:description"
                    content={meta.description}
                  />
                  <Meta property="twitter:image" content={meta.image} />
                  {headerChildren}
                </Header>
                <ThemeProvider theme={theme}>
                  <main className="Layout__content">{children}</main>
                  <Footer data={footerInfo} />
                </ThemeProvider>
              </div>
            </LayoutContainer>
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
