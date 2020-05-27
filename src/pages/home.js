import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";
import Loadable from "react-loadable";
import Box from "@chakra-ui/core/dist/Box";
import FirstSection from "../components/home/FirstSection";

import { getPrismicImage, convertImageSharp } from "../lib/PrismicFunctions";

const SecondSection = Loadable({
  loader: () => import("../components/home/SecondSection"),
  delay: 50,
  loading() {
    return <div />;
  },
});

const ThirdSection = Loadable({
  loader: () => import("../components/home/ThirdSection"),
  loading() {
    return <div />;
  },
});

const FourthSection = Loadable({
  loader: () => import("../components/home/FourthSection"),
  loading() {
    return <div />;
  },
});

const FifthSection = Loadable({
  loader: () => import("../components/home/FifthSection"),
  loading() {
    return <div />;
  },
});

const SixthSection = Loadable({
  loader: () => import("../components/home/SixthSection"),
  loading() {
    return <div />;
  },
});

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

const Hero = styled(Box)`
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.25rem;
    letter-spacing: 2px;
    font-family: Proxima Nova, -apple-system, BlinkMacSystemFont, Helvetica,
      sans-serif;
    text-align: center;

    em {
      text-decoration: line-through;
      color: ${colors.red500};

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;
        color: ${colors.red600};
        background-color: ${colors.red200};
      }
    }

    a,
    strong {
      text-decoration: none;
      transition: all 100ms ease-in-out;
      font-weight: 500;
    }
  }
`;

const RenderBody = (props) => {
  const { home, projects, meta, posts } = props;

  return (
    <>
      <Helmet
        title={meta.title}
        titleTemplate={`%s`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: meta.title,
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
      <FirstSection {...props} />

      <SecondSection {...props} />

      <ThirdSection {...props} />

      <FourthSection {...props} />

      <FifthSection {...props} />

      <SixthSection {...props} />
    </>
  );
};

export default ({ data, ...props }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  const projects = data.prismic.allProjects.edges;
  const meta = data.site.siteMetadata;
  const posts = data.prismic.allPosts.edges;

  if (!doc || !projects) return null;

  return (
    <Layout
      hasModal
      headerVariant="dark"
      headerChildren={
        <Hero>
          <PrismicRichText render={doc.node.hero_title} />
        </Hero>
      }
      headerBackground={{
        url: getPrismicImage(doc.node.hero_image),
        sharp: convertImageSharp(
          doc.node.hero_imageSharp.childImageSharp.fluid,
          doc.node.hero_image.url
        ),
        size: "cover",
        height: `calc(100% + 60px)`,
        highlight:
          "linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%)",
      }}
    >
      <RenderBody
        home={doc.node}
        projects={projects}
        meta={meta}
        posts={posts}
      />
    </Layout>
  );
};

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
};

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_image
            hero_imageSharp {
              childImageSharp {
                fluid(maxWidth: 2800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            hero_quote
            featured_heading
            featured_subheading
            featured_highlight_text
            featured_button
            featured_images {
              featured_image
              featured_imageSharp {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }

            packages_heading
            packages_subheading
            packages_highlight_text
            packages_carousel {
              packages_slide_image
              packages_slide_imageSharp {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              packages_slide_link
              linked_package {
                ... on PRISMIC_Service {
                  service_title
                  service_preview_description
                  _meta {
                    uid
                  }
                }
              }
            }

            journal_heading
            journal_subheading
            journal_highlight_text
            journal_carousel {
              journal_post_link {
                ... on PRISMIC_Post {
                  post_title
                  post_hero_image
                  post_hero_imageSharp {
                    childImageSharp {
                      fluid(quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  post_date
                  post_author
                  post_category
                  post_preview_description
                  _meta {
                    uid
                  }
                }
              }
            }

            testimonial_carousel {
              testimonial_author
              testimonial_date
              testimonial_quote
              testimonial_slide_image
              testimonial_title
            }
            testimonial_title
            testimonial_subtitle

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

            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
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
