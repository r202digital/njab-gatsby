import React from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Section from "components/Section";
import Img from "gatsby-image";
import Loadable from "react-loadable";

const Box = Loadable({
  loader: () => import("@chakra-ui/core/dist/Box"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Link = Loadable({
  loader: () => import("@chakra-ui/core/dist/Link"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Flex = Loadable({
  loader: () => import("@chakra-ui/core/dist/Flex"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const Text = Loadable({
  loader: () => import("@chakra-ui/core/dist/Text"),
  delay: 10,
  loading() {
    return <div />;
  },
});

const PseudoBox = Loadable({
  loader: () => import("@chakra-ui/core/dist/PseudoBox"),
  delay: 10,
  loading() {
    return <div />;
  },
});

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

const FeaturedHeading = styled(Box)`
  h1 {
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 400;
    margin: 0;
  }
`;

const FeaturedSubheading = styled(Box)`
  p {
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

const FeaturedHighlight = styled(Text)`
  font-family: Montserrat;

  p {
    margin: 0;
  }
`;

const FeaturedButton = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  color: ${colors.njabDarkPink};
  border: 1px solid #e9c8bc;
  border-radius: 0;
  background-color: white;
  padding: 10px 50px;
  font-weight: 500;
  &:hover {
    background-color: #e2e8f0;
    color: ${colors.njabDarkPink};
  }
  @media (min-width: 768px) {
    width: auto;
  }
`;

const HoverFlex = styled(Flex)`
  opacity: 0;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const FeaturedImg = styled(Img)`
  width: 100%;
  height: 100px;

  @media (min-width: 768px) {
    width: 30%;
  }

  img {
    object-fit: contain !important;
  }

  picture {
    img {
      object-fit: contain !important;
    }
  }
`;

const SecondSection = ({ home, projects, meta, posts }) => {
  return (
    <Section
      outerProps={{
        py: { xs: "60px", md: "120px" },
      }}
    >
      <Flex color={colors.njabDarkPink} flexWrap="wrap" mb="30px">
        <Box
          flex={{ default: "1 0 100%", md: "1 0 50%" }}
          textTransform="uppercase"
        >
          <PseudoBox
            _after={{
              content: "''",
              display: "block",
              height: "1px",
              width: "50px",
              backgroundColor: "#e9c8bc",
              my: "20px",
            }}
          >
            <FeaturedHeading>
              <PrismicRichText render={home.featured_heading} />
            </FeaturedHeading>
          </PseudoBox>
          <FeaturedSubheading>
            <PrismicRichText render={home.featured_subheading} />
          </FeaturedSubheading>
        </Box>
        <Box flex={{ default: "1 0 100%", md: "1 0 50%" }}>
          <FeaturedHighlight
            letterSpacing="1px"
            as="em"
            fontSize="14px"
            textAlign="right"
          >
            <PrismicRichText render={home.featured_highlight_text} />
          </FeaturedHighlight>
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={{ xs: "30px", md: "70px" }}
        flexWrap="wrap"
        px={{ xs: "15%", md: "0" }}
      >
        {home.featured_images.map((item, index) => {
          return (
            <FeaturedImg
              fluid={item.featured_imageSharp.childImageSharp.fluid}
              objectFit="contain"
              alt=""
            />
          );
        })}
      </Flex>
      <Flex justifyContent="center" px={{ xs: "10%", md: "0" }}>
        <FeaturedButton to="/about">
          {home.featured_button
            ? home.featured_button[0].text
            : "Read our story"}
        </FeaturedButton>
      </Flex>
    </Section>
  );
};

export default SecondSection;
