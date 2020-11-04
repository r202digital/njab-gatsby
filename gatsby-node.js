const path = require("path");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await wrapper(
    graphql(`
      {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        prismic {
          allHomepages {
            edges {
              node {
                mosaic {
                  mosaic_image
                  mosaic_imageSharp {
                    childImageSharp {
                      fluid(quality: 100) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        sizes
                        originalImg
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
          allBlog_pages {
            edges {
              node {
                page_heading
                page_hero_image
                page_subheading
                page_hero_imageSharp {
                  childImageSharp {
                    fluid(quality: 100) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                      originalImg
                    }
                  }
                }
              }
            }
          }
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
          allServices {
            edges {
              node {
                service_title
                service_subtitle
                service_preview_description
                service_preview_thumbnail
                service_category
                service_post_date
                service_hero_image
                service_description
                images {
                  gallery_image
                }
                _meta {
                  uid
                }
              }
            }
          }
          allPosts {
            edges {
              node {
                post_title
                post_hero_image
                post_hero_annotation
                post_date
                post_category
                post_body
                post_preview_description
                post_author
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    `)
  );

  const projectsList = result.data.prismic.allProjects.edges;
  const postsList = result.data.prismic.allPosts.edges;
  const servicesList = result.data.prismic.allServices.edges;
  const blog = result.data.prismic.allBlog_pages.edges.slice(0, 1).pop();
  const home = result.data.prismic.allHomepages.edges.slice(0, 1).pop();

  const meta = result.data.site.siteMetadata;

  const projectTemplate = require.resolve("./src/templates/project.js");
  const serviceTemplate = require.resolve("./src/templates/service.js");
  const postTemplate = require.resolve("./src/templates/post.js");

  projectsList.forEach((edge) => {
    // The uid you assigned in Prismic is the slug!
    const allProjects = projectsList
      .filter((allEdge) => allEdge.node._meta.uid !== edge.node._meta.uid)
      .slice(0, 5);
    createPage({
      type: "Project",
      match: "/events/:uid",
      path: `/events/${edge.node._meta.uid}`,
      component: projectTemplate,
      context: {
        home: home,
        projectContent: edge,
        allProjects: allProjects,
        meta: meta,
        uid: edge.node._meta.uid,
        title: edge.node.project_title,
        image: edge.node.project_hero_image,
      },
    });
  });

  postsList.forEach((edge) => {
    const allPosts = postsList
      .filter((allEdge) => allEdge.node._meta.uid !== edge.node._meta.uid)
      .slice(0, 5);
    createPage({
      type: "Post",
      match: "/blog/:uid",
      path: `/blog/${edge.node._meta.uid}`,
      component: postTemplate,
      context: {
        allPosts: allPosts,
        postContent: edge,
        blog: blog,
        meta: meta,
        uid: edge.node._meta.uid,
        title: edge.node.post_title,
        image: edge.node.post_hero_image,
      },
    });
  });

  servicesList.forEach((edge) => {
    const allServices = servicesList
      .filter((allEdge) => allEdge.node._meta.uid !== edge.node._meta.uid)
      .slice(0, 5);
    createPage({
      type: "Service",
      match: "/service/:uid",
      path: `/service/${edge.node._meta.uid}`,
      component: serviceTemplate,
      context: {
        home: home,
        allServices: allServices,
        serviceContent: edge,
        meta: meta,
        uid: edge.node._meta.uid,
        title: edge.node.service_title,
        image: edge.node.service_hero_image,
      },
    });
  });
};

// exports.onCreatePage = ({ page, actions }) => {
//   console.log({
//     uid: page.context,
//     title: page.context,
//     image: page.context,
//   });
// };
