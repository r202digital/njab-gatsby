import React from "react";
import colors from "styles/colors";
import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/core";

const SectionHeading = styled(Heading)`
  margin: 0;

  * {
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 400;
    text-transform: uppercase;
    font-family: Montserrat;
    margin: 0;
  }
`;

export default SectionHeading;
