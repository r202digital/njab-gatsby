import React from "react";
import {
  Box,
  List,
  ListItem,
  Stack,
  Link,
  Text,
  Image,
  IconButton
} from "@chakra-ui/core";
import { MdMenu, MdSearch } from "react-icons/md";
import Container from "./Container";

const links = [
  {
    href: "/home",
    label: "Home"
  },
  {
    href: "/about",
    label: "Our Story"
  },
  {
    href: "/services",
    label: "Our Services"
  },
  {
    href: "/portfolio",
    label: "Portfolio"
  },
  {
    href: "/blog",
    label: "Our Journal"
  },
  {
    href: "/",
    label: "Contact"
  }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = ({
  outerContainerProps,
  innerContainerProps,
  navBorderBottom = "solid 1px #f7e3da",
  navLogo = "/logonjabpink.png",
  navSearchIconColor = "#dd8d83",
  navHighlightColor = "#d1867b"
}) => (
  <Box as="nav">
    <Container
      alignItems="center"
      justifyContent="space-between"
      fontFamily="Montserrat"
      fontSmoothing="anti-aliased"
      // borderBottom="1px solid rgba(255,255,255,0.5)"
      borderBottom={navBorderBottom}
      py="15px"
      flexDirection="row"
      outerContainerProps={outerContainerProps}
    >
      <Link href="/">
        <Image
          className="lazyload"
          data-src={navLogo}
          src={navLogo}
          height="30px"
          alt="NJAB Logo"
        />
      </Link>
      <Box
        color="#dd8d83"
        display={{ xs: "none", md: "initial" }}
        {...innerContainerProps}
      >
        {links.map(link => (
          <Link
            mx="15px"
            fontSize="12px"
            letterSpacing="2px"
            paddingTop="5px"
            paddingBottom="4px"
            textTransform="uppercase"
            transition="all 0.5s"
            borderBottom="1px solid transparent"
            _hover={{
              borderBottomColor: navHighlightColor
            }}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </Box>
      <Box>
        <IconButton
          aria-label="Search database"
          background="transparent"
          color={navSearchIconColor}
          icon={MdSearch}
          fontSize="30px"
          _hover={{
            backgroundColor: "transparent",
            opacity: 0.5
          }}
        />
        <IconButton
          display={{ xs: "initial", md: "none" }}
          aria-label="Menu"
          backgroundColor="transparent"
          color={navSearchIconColor}
          icon={MdMenu}
          fontSize="30px"
          _hover={{
            backgroundColor: "transparent",
            opacity: 0.5
          }}
        />
      </Box>
    </Container>
  </Box>
);

export default Nav;
