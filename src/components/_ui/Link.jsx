import React from "react";
import ChakraLink from "@chakra-ui/core/dist/Link";

const Link = ({ children, href, to, ...props }) => (
  <ChakraLink href={to ? to : href ? href : ""} {...props}>
    {children}
  </ChakraLink>
);

export default Link;
