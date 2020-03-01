import React from "react";
import Link from "components/_ui/Link";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "components/_ui/Logo";
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input
} from "@chakra-ui/core";
import { MdMenu, MdSearch } from "react-icons/md";

const HeaderContainer = styled(Box)`
  &.HeaderContainer--dark {
    color: white;
  }

  &.HeaderContainer--light {
    color: #dd8d83;
  }
`;

const HeaderContent = styled(Box)`
  max-width: ${dimensions.maxwidthDesktop}px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const HeaderLinks = styled("div")`
  display: none;

  @media (min-width: ${dimensions.maxwidthTablet}px) {
    display: flex;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    font-weight: 400;
    font-family: Montserrat;
    font-size: 0.75em;
    letter-spacing: 2px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    margin-left: 15px;
    margin-right: 15px;

    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 1px;
      background: transparent;
      bottom: -5px;
      left: 0;
      transition: 100ms ease-in-out background;
      opacity: 0.7;
    }

    &:hover {
      &:after {
        background: white;
        transition: 100ms ease-in-out background;
      }
    }

    &.Link--is-active {
      font-weight: 700;
    }
  }
`;

const MobileMenuLink = styled(Link)`
  width: 100%;
  display: block;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.njabLightGray};

  &:focus,
  &:hover {
    outline: none;
    background-color: ${colors.njabLightPink};
  }
`;

const Header = ({ navLinks, variant, children, background = {} }) => {
  const newNavLinks = navLinks.map(item => ({
    text: item.nav_link[0].text,
    url: item.nav_link[0].spans[0]
      ? item.nav_link[0].spans[0].data.url.split("/").pop()
      : ""
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <HeaderContainer
      className={`HeaderContainer--${variant}`}
      backgroundImage={background.url ? `url('${background.url}')` : null}
      backgroundSize={background.size}
      backgroundPosition={background.position}
    >
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Link to="/" className="logo-link" aria-label="NJAB Logo">
              <Logo />
            </Link>
          </DrawerHeader>
          <DrawerCloseButton
            mt="3px"
            mr="2px"
            color={colors.njabDarkPink}
            backgroundColor="transparent"
            border="none"
            size="lg"
          />

          <DrawerBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {newNavLinks.map(item => (
              <MobileMenuLink to={item.url}>{item.text}</MobileMenuLink>
            ))}
          </DrawerBody>

          <DrawerFooter>{/* Insert Search Input Here */}</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box background={background.highlight}>
        <HeaderContent
          className={`HeaderContent--${variant}`}
          borderBottom={
            variant === "light"
              ? "1px solid #f7e3da"
              : "1px solid rgba(255,255,255,0.5)"
          }
        >
          <Link to="/" className="logo-link" aria-label="NJAB Logo">
            <Logo variant={variant} />
          </Link>
          <HeaderLinks className={`HeaderLinks--${variant}`}>
            {newNavLinks.map(item => (
              <Link activeClassName="Link--is-active" to={item.url}>
                {item.text}
              </Link>
            ))}
          </HeaderLinks>
          <Box>
            <IconButton
              aria-label="Search database"
              background="transparent"
              color={variant === "light" ? "#dd8d83" : "white"}
              icon={MdSearch}
              fontSize="30px"
              _hover={{
                backgroundColor: "transparent",
                opacity: 0.5
              }}
              border="none"
            />
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              className="menu-item--small"
              display={{ xs: "initial", md: "none" }}
              aria-label="Menu"
              backgroundColor="transparent"
              color={variant === "light" ? "#dd8d83" : "white"}
              icon={MdMenu}
              border="none"
              fontSize="30px"
              _hover={{
                backgroundColor: "transparent",
                opacity: 0.5
              }}
            />
          </Box>
        </HeaderContent>
      </Box>
      <Box>{children}</Box>
    </HeaderContainer>
  );
};

export default Header;
