/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    if (x.type === "meta") {
      return -1;
    } else if (y.type === "meta") {
      return 1;
    }
    return 0;
  });
  replaceHeadComponents(headComponents);
};
