import React from "react";
import { Box } from "@chakra-ui/core";
import dimensions from "styles/dimensions";
import styled from "@emotion/styled";

const classNames = require("classnames");

const Section = styled(Box)`
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;
  margin-bottom: 10em;
  display: flex;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-left: ${dimensions.paddingHorizontalTablet}em;
    padding-right: ${dimensions.paddingHorizontalTablet}em;
    margin-bottom: 4em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-left: ${dimensions.paddingHorizontalMobile}em;
    padding-right: ${dimensions.paddingHorizontalMobile}em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.full-width {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default ({
  children,
  outerProps,
  classes = [],
  fullWidth,
  ...props
}) => (
  <Box {...outerProps}>
    <Section
      flexDirection="column"
      maxWidth={`${dimensions.maxwidthDesktop}px`}
      className={classNames([{ "full-width": fullWidth }, ...classes])}
      {...props}
    >
      {children}
    </Section>
  </Box>
);
