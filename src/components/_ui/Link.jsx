import React from "react";
import colors from "styles/colors";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const Link = ({ children, ...props }) => (
  <AniLink cover duration={1.25} delay={0} bg={colors.njabMidPink} {...props}>
    {children}
  </AniLink>
);

export default Link;
