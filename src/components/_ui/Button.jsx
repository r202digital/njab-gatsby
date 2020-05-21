import React, { Component } from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import ChakraButton from "@chakra-ui/core/dist/Button";

const ButtonContainer = styled(ChakraButton)`
  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding: 0.8em 1.8em;
    font-size: 1em;
  }

  p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    transition: 100ms ease-in-out;
  }

  &.Button--secondary {
    background: ${colors.njabLightPink};
    color: ${colors.njabDarkPink};
    padding: 0.95em 1.8em;
    font-size: 0.95rem;

    &:hover {
      background: ${colors.njabLightPinkHover};
      transition: background 100ms ease-in-out;
    }
  }
`;

class Button extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <ButtonContainer
        onClick={this.props.onClick}
        height="initial"
        padding="1em 2em"
        backgroundColor="#159f9f"
        fontWight={600}
        color="white"
        outline="none"
        border="none"
        fontSize="1rem"
        borderRadius="2px"
        position="relative"
        transition="background 100ms ease-in-out"
        {...props}
      >
        {this.props.children}
      </ButtonContainer>
    );
  }
}

export default Button;
