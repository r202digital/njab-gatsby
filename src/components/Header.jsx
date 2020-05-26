import React from "react";
import Link from "components/_ui/Link";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "components/_ui/Logo";
import Box from "@chakra-ui/core/dist/Box";
import IconButton from "@chakra-ui/core/dist/IconButton";
import useDisclosure from "@chakra-ui/core/dist/useDisclosure";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core/dist/Drawer";
import { MdMenu, MdSearch } from "react-icons/md";
import BackgroundImage from "gatsby-background-image";
import GatsbyImage from "gatsby-image";

const HeaderContainerBox = styled(Box)`
  position: relative;
  overflow: hidden;
  z-index: 1;

  &.HeaderContainer--dark {
    background-color: black;
    color: white;
  }

  &.HeaderContainer--light {
    color: #dd8d83;
  }
`;

const HeroGatsbyImage = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  width: 100%;
  height: ${({ height }) => (height ? height : "100%")};
  z-index: -1;

  img {
    top: ${({ position }) =>
      position && position.top ? position.top : "0"} !important;
    bottom: ${({ position }) =>
      position && position.bottom ? position.bottom : "initial"} !important;
    left: ${({ position }) =>
      position && position.left ? position.left : "initial"} !important;
    right: ${({ position }) =>
      position && position.right ? position.right : "initial"} !important;
  }

  @media (min-width: ${dimensions.maxwidthTablet}px) {
    width: 100%;
  }
`;

const HeaderContainerWrapper = ({
  children,
  fluid,
  position,
  height,
  ...props
}) =>
  !!fluid ? (
    <HeaderContainerBox {...props}>
      <HeroGatsbyImage fluid={fluid} height={height} position={position} />
      {children}
    </HeaderContainerBox>
  ) : (
    <HeaderContainerBox children={children} {...props} />
  );

const HeaderBox = styled(Box)`
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
      &:hover {
        text-decoration: initial;
      }
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
    text-decoration: initial;
  }
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: initial;
  }
`;

const Header = ({
  fontAvailable,
  navLinks,
  variant,
  children,
  background = {},
}) => {
  const newNavLinks = navLinks.map((item) => {
    const { data } = item.nav_link[0].spans[0];
    return {
      text: item.nav_link[0].text,
      url: item.nav_link[0].spans[0]
        ? data.link_type === "Document"
          ? `/${data.uid}`
          : data.url
        : "",
    };
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <HeaderContainerWrapper
      className={`HeaderContainer--${variant}`}
      fluid={background.sharp}
      backgroundSize={background.size}
      backgroundPosition={background.position}
      position={background.position}
      height={background.height}
      // backgroundColor={`#000`}
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
            {newNavLinks.map((item) => (
              <MobileMenuLink to={item.url}>{item.text}</MobileMenuLink>
            ))}
          </DrawerBody>

          <DrawerFooter>{/* Insert Search Input Here */}</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box background={background.highlight} height="62px">
        {fontAvailable && (
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
              {newNavLinks.map((item) => (
                <NavLink activeClassName="Link--is-active" to={item.url}>
                  {item.text}
                </NavLink>
              ))}
            </HeaderLinks>
            <Box>
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
                  opacity: 0.5,
                }}
              />
            </Box>
          </HeaderContent>
        )}
      </Box>
      <Box>{children}</Box>
    </HeaderContainerWrapper>
  );
};

export default Header;
