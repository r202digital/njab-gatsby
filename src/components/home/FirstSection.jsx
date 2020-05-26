import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Section from "components/Section";
import Loadable from "react-loadable";
import Box from "@chakra-ui/core/dist/Box";

// import sampleWorker from "../workers/sample";

const PrismicRichText = Loadable({
  loader: () => import("prismic-reactjs"),
  delay: 50,
  render(loaded, props) {
    const { RichText } = loaded;
    return <RichText {...props} />;
  },
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

const FirstSection = ({ home, projects, meta, posts }) => {
  // sampleWorker.search("sample").then((searchResults) => {
  //   console.log(searchResults);
  // });
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
        <PrismicRichText render={home.hero_quote} />
      </StyledRichText>
    </Section>
  );
};

export default FirstSection;
