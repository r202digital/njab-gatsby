import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Button from "components/_ui/Button";
import About from "components/About";
import Layout from "components/Layout";
import Link from "components/_ui/Link";
import ProjectCard from "components/ProjectCard";
import MessengerCustomerChat from "react-messenger-customer-chat";
import njabLogo from "images/njab/njab_logo.svg";
import { Global } from "@emotion/core";
import globalStyles from "styles/global";

const Hero = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  background-color: #e1b2a6;
  font-family: "Proxima Nova", -apple-system, BlinkMacSystemFont, Helvetica,
    sans-serif;
`;

const Title = styled("h1")`
  margin: 0;
  width: 100%;
  margin-top: 15px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
  font-weight: 400;
  color: #fff;
`;

const Description = styled("p")`
  font-size: 16px;
  text-align: center;
`;

const RenderBody = ({ home, projects, meta, posts }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: meta.description
        },
        {
          property: `og:title`,
          content: meta.title
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
    <Hero>
      <MessengerCustomerChat
        pageId="176927569055665"
        appId="1678638095724206"
        themeColor="#ea7674"
        loggedInGreeting="Hi, I'm Debbie! Can I help you with anything?"
        loggedOutGreeting="Hi, I'm Debbie! Can I help you with anything?"
      />
      <img
        src={njabLogo}
        style={{ height: "100px", width: "100px" }}
        alt="Not Just a Box Events Logo"
      />
      <Title>We’re adding some magic to our website!</Title>
      <Description>
        We’ll be back soon! In the meantime, you may talk to Debbie for your
        inquiries!
      </Description>
    </Hero>
  </>
);

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  const projects = data.prismic.allProjects.edges;
  const meta = data.site.siteMetadata;
  const posts = data.prismic.allPosts.edges;

  if (!doc || !projects) return null;

  return (
    <div>
      <Global styles={[globalStyles]} />
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
      />
    </div>
  );
};

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired
};

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
      allPosts(sortBy: post_date_DESC, first: 1) {
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
