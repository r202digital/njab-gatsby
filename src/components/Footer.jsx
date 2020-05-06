import React from "react";
import Link from "components/_ui/Link";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import theme from "styles/theme";

import Logo from "components/_ui/Logo";
import njabLogo from "images/njab/njab-logo.png";
import {
  Image,
  Box,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Heading,
  Flex,
  List,
  ListItem,
  Link as ExternalLink
} from "@chakra-ui/core";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaArrowRight
} from "react-icons/fa";
import {
  getPrismicText,
  getPrismicDocumentLink
} from "../lib/PrismicFunctions";

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
    twitter,
    left_title,
    left_description,
    right_title,
    first_column_links,
    second_column_links
  } = data;
  return (
    <FooterContainer maxWidth={`${dimensions.maxwidthDesktop}px`}>
      <Flex
        color="#de8e83"
        justifyContent="space-between"
        width="100%"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box flex="1" px={{ xs: "2rem", md: 0 }}>
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
            {getPrismicText(left_title)}
          </Heading>
          <Text
            fontFamily={theme.fonts.body}
            display={{ xs: "none", md: "block" }}
          >
            {getPrismicText(left_description)}
          </Text>
          <Flex
            width="100%"
            justifyContent="space-between"
            px={{ xs: "15px", md: "0" }}
            py={{ xs: "30px", md: "0" }}
          >
            <ExternalLink href={instagram}>
              <Box as={FaInstagram} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
            <ExternalLink href={twitter}>
              <Box as={FaTwitter} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
            <ExternalLink href={facebook}>
              <Box as={FaFacebookF} size="20px" color={colors.njabDarkPink} />
            </ExternalLink>
          </Flex>
        </Box>
        <Box flex="2" px={{ xs: "2rem", md: "15%" }}>
          <Heading
            as="h1"
            fontSize="18px"
            letterSpacing="2px"
            marginBottom="20px"
            fontWeight="400"
            textTransform="uppercase"
            textAlign="center"
            fontFamily={theme.fonts.body}
          >
            Questions?
          </Heading>
          <Box>
            <InputGroup>
              <InputLeftAddon
                borderRadius="0px"
                backgroundColor="transparent"
                borderLeft="initial"
                borderTop="initial"
                borderColor="#de8e83"
                paddingRight="10px"
                paddingLeft="0px"
              >
                <Box as={FaArrowRight} size="20px" />
              </InputLeftAddon>
              <Input
                placeholder="FULL NAME"
                aria-label="FULL NAME"
                fontSize="12px"
                paddingLeft="5px"
                size="sm"
                mb="10px"
                borderTop="none"
                borderRight="none"
                borderLeft="none"
                borderRadius="0px"
                fontFamily={theme.fonts.body}
                borderColor="#de8e83"
                _hover={{
                  borderColor: "#de8e83"
                }}
                _focus={{
                  boxShadow: "initial",
                  borderColor: "#de8e83"
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                borderRadius="0px"
                backgroundColor="transparent"
                borderLeft="initial"
                borderTop="initial"
                borderColor="#de8e83"
                paddingRight="10px"
                paddingLeft="0px"
              >
                <Box as={FaArrowRight} size="20px" />
              </InputLeftAddon>
              <Input
                placeholder="CONTACT NUMBER"
                aria-label="CONTACT NUMBER"
                fontSize="12px"
                paddingLeft="5px"
                size="sm"
                mb="10px"
                borderTop="none"
                borderRight="none"
                borderLeft="none"
                borderRadius="0px"
                fontFamily={theme.fonts.body}
                borderColor="#de8e83"
                _hover={{
                  borderColor: "#de8e83"
                }}
                _focus={{
                  boxShadow: "initial",
                  borderColor: "#de8e83"
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                borderRadius="0px"
                backgroundColor="transparent"
                borderLeft="initial"
                borderTop="initial"
                borderColor="#de8e83"
                paddingRight="10px"
                paddingLeft="0px"
              >
                <Box as={FaArrowRight} size="20px" />
              </InputLeftAddon>
              <Input
                placeholder="EMAIL ADDRESS"
                aria-label="EMAIL ADDRESS"
                fontSize="12px"
                paddingLeft="5px"
                size="sm"
                mb="10px"
                borderTop="none"
                borderRight="none"
                borderLeft="none"
                borderRadius="0px"
                fontFamily={theme.fonts.body}
                borderColor="#de8e83"
                _hover={{
                  borderColor: "#de8e83"
                }}
                _focus={{
                  boxShadow: "initial",
                  borderColor: "#de8e83"
                }}
              />
            </InputGroup>
          </Box>
        </Box>
        <Box flex="1" px={{ xs: "2rem", md: 0 }}>
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
            {getPrismicText(right_title)}
          </Heading>
          <Flex>
            <List styleType="none" padding="0" mr="15px" flex="1">
              {first_column_links.map(item => {
                return (
                  <ListItem>
                    <a href={getPrismicDocumentLink(item.column_link)}>
                      {getPrismicText(item.column_link)}
                    </a>
                  </ListItem>
                );
              })}
            </List>
            <List styleType="none" padding="0" ml="15px" flex="1">
              {second_column_links.map(item => {
                return (
                  <ListItem>
                    <a href={getPrismicDocumentLink(item.column_link)}>
                      {getPrismicText(item.column_link)}
                    </a>
                  </ListItem>
                );
              })}
            </List>
          </Flex>
        </Box>
      </Flex>
      <FooterAuthor>
        <div className="footerLogoContainer">
          <FooterLogo
            className="FooterLogo lazyload"
            data-src={njabLogo}
            src={njabLogo}
          />
        </div>
        © 2020 — Not Just a Box Events
      </FooterAuthor>
    </FooterContainer>
  );
};

export default Footer;
