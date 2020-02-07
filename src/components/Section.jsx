import React from "react";
import { Box } from "@chakra-ui/core";
import dimensions from "styles/dimensions";
import styled from "@emotion/styled";

const Section = styled(Box)`
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

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
`;

export default ({ children, outerProps, ...props }) => (
  <Box {...outerProps}>
    <Section maxWidth={`${dimensions.maxwidthDesktop}px`} {...props}>
      {children}
    </Section>
  </Box>
);
