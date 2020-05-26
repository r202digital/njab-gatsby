require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Not Just a Box Events`,
    description: `Not Just a Box Events`,
    author: `Sidney Ramos <sidney.ramos95@gmail.com>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "notjustaboxevents", // (REQUIRED, replace with your own)
        linkResolver: () => (post) => `/${post.uid}`,
        omitPrismicScript: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `not-just-a-box-events`,
        short_name: `njab`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `logonjabpink-notext.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "",
        head: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-iltorb",
      options: {
        extensions: ["css", "html", "js", "svg", "png", "ttf"],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/work`, `/blog`],
      },
    },
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-plugin-html-minifier`,
      options: {
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeComments: true,
      },
    },
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: "#dd8d83",
        // Disable the loading spinner.
        showSpinner: false,
        minimum: 0.4,
      },
    },
    "gatsby-plugin-workerize-loader",
  ],
};
