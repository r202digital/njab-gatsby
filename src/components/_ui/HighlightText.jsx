import React from "react";
import colors from "styles/colors";
import styled from "@emotion/styled";
import { Text } from "@chakra-ui/core";

const HighlightText = styled(Text)`
  font-family: Montserrat;

  * {
    line-height: 2;
    margin: 0;
  }
`;

export default HighlightText;
