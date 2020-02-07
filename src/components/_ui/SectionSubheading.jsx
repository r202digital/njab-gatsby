import React from "react";
import colors from "styles/colors";
import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/core";

const SectionSubheading = styled(Heading)`
  margin: 0;

  * {
    text-transform: uppercase;
    font-family: Montserrat;
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

export default SectionSubheading;
