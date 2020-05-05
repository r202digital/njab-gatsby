import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import globalStyles from "styles/global";
import typeStyles from "styles/typography";
import logoStyles from "styles/logo";
// import listStyles from "styles/list";
import dimensions from "styles/dimensions";
import Footer from "components/Footer";
import Header from "components/Header";
import Helmet from "react-helmet";
import "styles/fonts.scss";
import preview from "../images/preview.png";
import { ThemeProvider } from "@chakra-ui/core";
import theme from "../styles/theme";

const LayoutContainer = styled.div``;

const Layout = ({
  children,
  headerVariant = "light",
  headerChildren,
  headerBackground
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }

        prismic {
          homepage(lang: "en-us", uid: "not-just-a-box-events") {
            nav_links {
              nav_link
            }
          }
          allGlobals {
            edges {
              node {
                nav_links {
                  nav_link
                }
                logo
                logo_light
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { nav_links } = data.prismic.allGlobals.edges.reduce(
        (total, item) => item
      ).node;
      return (
        <>
          <Helmet />
          <ThemeProvider theme={theme}>
            <LayoutContainer className="div">
              <Global styles={[globalStyles, typeStyles, logoStyles]} />
              <div className="Layout">
                <Header
                  variant={headerVariant}
                  navLinks={nav_links}
                  background={headerBackground}
                >
                  {headerChildren}
                </Header>
                <main className="Layout__content">{children}</main>
                <Footer />
              </div>
            </LayoutContainer>
          </ThemeProvider>
        </>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
