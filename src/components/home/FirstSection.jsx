import React from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Loadable from "react-loadable";
import { RichText } from "prismic-reactjs";

const Box = Loadable({
  loader: () => import("@chakra-ui/core/dist/Box"),
  delay: 5,
  loading() {
    return <div />;
  },
});

const Section = Loadable({
  loader: () => import("components/Section"),
  delay: 5,
  loading() {
    return <div />;
  },
});

const StyledRichText = styled(Box)`
  * {
    margin-top: 0;
    margin-bottom: 0;
    line-height: normal;
  }

  h3 {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 2px;
  }

  p {
    line-height: 1.5;
  }
`;

const FirstSection = ({ home }) => {
  return (
    <Section
      outerProps={{
        backgroundColor: colors.njabDarkPink,
        color: "white",
        textAlign: "center",
      }}
    >
      <StyledRichText
        py="120px"
        fontSize="14px"
        letterSpacing="1px"
        fontFamily="Montserrat"
      >
        <RichText render={home.hero_quote} />
      </StyledRichText>
    </Section>
  );
};

export default FirstSection;
