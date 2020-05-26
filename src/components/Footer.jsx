import React from "react";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import theme from "styles/theme";
import njabLogo from "images/njab/njab-logo.png";
import Box from "@chakra-ui/core/dist/Box";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import Flex from "@chakra-ui/core/dist/Flex";
import List, { ListItem } from "@chakra-ui/core/dist/List";
import ExternalLink from "@chakra-ui/core/dist/Link";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import {
  getPrismicText,
  getPrismicDocumentLink,
  getUrl,
} from "../lib/PrismicFunctions";
import Loadable from "react-loadable";

const PinkNoTextLogo = Loadable({
  loader: () => import("../components/_ui/NjabLogos"),
  delay: 50,
  render(loaded, props) {
    const { PinkNoTextLogo } = loaded;
    return <PinkNoTextLogo {...props} />;
  },
  loading() {
    return <div />;
  },
});

const FooterContainer = styled(Box)`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  svg {
    max-width: 50px;
  }
`;

const FooterAuthor = styled("a")`
  font-size: 0.75em;
  color: ${colors.njabMidPink};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;

  .footerLogoContainer {
    position: relative;
  }

  h1 {
    font-size: 45px;
    margin: 0;
    color: ${colors.qimodaDark};
  }

  &:hover {
    color: ${colors.njabDarkPink};

    h1 {
      color: ${colors.qimodaDark};
    }
  }
`;

const FooterLogo = styled("img")`
  max-width: 40px;
`;

const Footer = ({ data }) => {
  const {
    instagram,
    facebook,
    pinterest,
    first_link_column_title,
    first_column_links,
    second_link_column_title,
    second_column_links,
    third_column_title,
    third_column_rich_text,
  } = data;

  return (
    <FooterContainer maxWidth={`${dimensions.maxwidthDesktop}px`}>
      <Flex
        color="#de8e83"
        justifyContent="space-between"
        width="100%"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flex="0 0 15%"
          px={{ xs: "2rem", md: 0 }}
        >
          <PinkNoTextLogo height="100" />
        </Flex>
        <Box flex="0 0 28%" px={{ xs: "2rem", md: 0 }}>
          <Heading
            as="h1"
            fontSize="18px"
            letterSpacing="2px"
            marginBottom="20px"
            fontWeight="400"
            textTransform="uppercase"
            fontFamily={theme.fonts.heading}
            textAlign={{ xs: "center", md: "initial" }}
          >
            {getPrismicText(first_link_column_title)}
          </Heading>
          <Flex>
            <List styleType="none" padding="0" mr="15px" flex="1">
              {first_column_links.map((item) => {
                return (
                  <ListItem textAlign={{ xs: "center", md: "initial" }}>
                    <a href={getPrismicDocumentLink(item.column_link)}>
                      {getPrismicText(item.column_link)}
                    </a>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
          <Flex
            width="100%"
            justifyContent={{ xs: "center", md: "flex-start" }}
            px={{ xs: "15px", md: "0" }}
            py={{ xs: "30px", md: "0" }}
          >
            <ExternalLink href={getUrl(instagram)} mx="15px" ml="0">
              <Box as={FaInstagram} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
            <ExternalLink href={getUrl(pinterest)} mx="15px">
              <Box as={FaPinterest} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
            <ExternalLink href={getUrl(facebook)} mx="15px">
              <Box as={FaFacebookF} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
          </Flex>
        </Box>

        <Box flex="0 0 28%" px={{ xs: "2rem", md: 0 }}>
          <Heading
            as="h1"
            fontSize="18px"
            letterSpacing="2px"
            marginBottom="20px"
            fontWeight="400"
            textTransform="uppercase"
            fontFamily={theme.fonts.heading}
            textAlign={{ xs: "center", md: "initial" }}
          >
            {getPrismicText(second_link_column_title)}
          </Heading>
          <Flex>
            <List styleType="none" padding="0" mr="15px" flex="1">
              {second_column_links.map((item) => {
                return (
                  <ListItem textAlign={{ xs: "center", md: "initial" }}>
                    <a href={getPrismicDocumentLink(item.column_link)}>
                      {getPrismicText(item.column_link)}
                    </a>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
        </Box>

        <Box flex="0 0 28%" px={{ xs: "2rem", md: 0 }}>
          <Heading
            as="h1"
            fontSize="18px"
            letterSpacing="2px"
            marginBottom="20px"
            fontWeight="400"
            textTransform="uppercase"
            fontFamily={theme.fonts.body}
            textAlign={{ xs: "center", md: "initial" }}
          >
            {getPrismicText(third_column_title)}
          </Heading>
          <Text
            fontFamily={theme.fonts.body}
            display={{ xs: "none", md: "block" }}
          >
            {getPrismicText(third_column_rich_text)}
          </Text>
        </Box>
      </Flex>
      <FooterAuthor>© 2020 — Not Just a Box Events</FooterAuthor>
    </FooterContainer>
  );
};

export default Footer;
