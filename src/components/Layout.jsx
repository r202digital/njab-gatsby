import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import globalStyles from "styles/global";
import typeStyles from "styles/typography";
import logoStyles from "styles/logo";
import dimensions from "styles/dimensions";
import Footer from "components/Footer";
import Header from "components/Header";
import Helmet from "react-helmet";
import "styles/fonts.scss";
import preview from "../images/preview.png";
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider";
import IconButton from "@chakra-ui/core/dist/IconButton";
import Flex from "@chakra-ui/core/dist/Flex";
import Box from "@chakra-ui/core/dist/Box";
import Loadable from "react-loadable";
import theme from "../styles/theme";
import MessengerCustomerChat from "react-messenger-customer-chat";
import FontFaceObserver from "fontfaceobserver";
import "react-micro-modal/dist/index.css";

const MicroModal = Loadable({
  loader: () => import("react-micro-modal"),
  delay: 400,
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

const LayoutContainer = styled.div``;

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
}) => {
  const [fontAvailable, setFontAvailable] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);

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
                  twitter {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  left_title
                  left_description
                  right_title
                  first_column_links {
                    column_link
                  }
                  second_column_links {
                    column_link
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        var font = new FontFaceObserver("Montserrat", {
          weight: 400,
        });

        font.load().then(
          function() {
            setFontAvailable(true);
          },
          function() {
            console.log("Font is not available");
          }
        );
        const { node } = data.prismic.allGlobals.edges.reduce(
          (total, item) => item
        );

        const {
          modal_text,
          modal_title,
          nav_links,
          logo,
          logo_light,
          ...footerInfo
        } = node;

        return (
          <>
            <Helmet />
            <MessengerCustomerChat
              pageId="176927569055665"
              appId="1678638095724206"
              themeColor="#ea7674"
              loggedInGreeting="Hi, I'm Debbie! Can I help you with anything?"
              loggedOutGreeting="Hi, I'm Debbie! Can I help you with anything?"
            />
            <ThemeProvider theme={theme}>
              <MicroModal
                open={isModalOpen}
                closeOnAnimationEnd
                handleClose={() => {
                  setModalOpen(false);
                  sessionStorage.setItem("visited", true);
                }}
                children={(handleClose) => (
                  <>
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
                    </Box>
                  </>
                )}
              />
              <LayoutContainer className="div">
                <Global styles={[globalStyles, typeStyles, logoStyles]} />
                <div className="Layout">
                  <Header
                    fontAvailable={fontAvailable}
                    variant={headerVariant}
                    navLinks={nav_links}
                    background={headerBackground}
                  >
                    {headerChildren}
                  </Header>
                  <main className="Layout__content">{children}</main>
                  <Footer data={footerInfo} />
                </div>
              </LayoutContainer>
            </ThemeProvider>
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
