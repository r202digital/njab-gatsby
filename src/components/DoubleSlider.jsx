import React from "react";
import Box from "@chakra-ui/core/dist/Box";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import Image from "@chakra-ui/core/dist/Image";
import List from "@chakra-ui/core/dist/List";
import IconButton from "@chakra-ui/core/dist/IconButton";
import Flex from "@chakra-ui/core/dist/Flex";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import Slider from "react-slick";
import Container from "./Container";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";

const Arrow = ({ className, style, onClick }) => {
  const variant = className
    .replace(/ /g, "")
    .replace("slick-arrow", "")
    .replace("slick-", "");
  const iconVariant = `arrow-${variant === "prev" ? "back" : "forward"}`;
  const leftMargin = 50;
  return (
    <>
      {variant === "next" && (
        <Text
          color="white"
          position="absolute"
          bottom={{ md: "-80px" }}
          my="0"
          mb="5px"
          marginLeft={{ md: `${leftMargin + 125}px` }}
          fontSize="50px"
          fontWeight="300"
          lineHeight="1"
        >
          \
        </Text>
      )}
      <IconButton
        variant="outline"
        variantColor="teal"
        aria-label="Call Sage"
        fontSize="30px"
        position="absolute"
        bottom={{ md: "-80px" }}
        zIndex="1"
        marginLeft={{
          md: variant === "next" ? `${leftMargin + 200}px` : `${leftMargin}px`
        }}
        marginBottom="5px"
        icon={iconVariant}
        onClick={onClick}
        color="rgba(255,255,255,0.75)"
        border="none"
        _hover={{
          background: "transparent",
          color: "white"
        }}
        _active={{
          background: "transparent",
          color: "white"
        }}
        _focus={{
          outline: "none",
          color: "white"
        }}
      />
    </>
  );
};

const FeaturedHeading = styled(Box)`
  h1 {
    font-size: 14px;
    letter-spacing: 2px;
    font-weight: 400;
    margin: 0;
  }
`;

const FeaturedSubheading = styled(Box)`
  p {
    font-size: 18px;
    letter-spacing: 4px;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

const DoubleSliderContainer = styled(Box)`
  .first-slider {
    width: 100%;
    z-index: 1;

    @media (min-width: 768px) {
      width: 50%;
      z-index: 0;
    }
  }
  .second-slider {
    width: 100%;
    @media (min-width: 768px) {
      width: 65%;
    }

    &.white-dots {
      .slick-dots {
        li {
          button {
            &:before {
              color: #9c8881;
              @media (min-width: 768px) {
                color: #332525;
              }
            }
          }

          &.slick-active {
            button {
              &:before {
                color: #d89a8d;
                opacity: 1;
                @media (min-width: 768px) {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }

  .pink-dots {
    .slick-dots {
      li {
        button {
          &:before {
            color: #9c8881;
          }
        }

        &.slick-active {
          button {
            &:before {
              color: #d89a8d;
            }
          }
        }
      }
    }
  }
`;

export default class DoubleSlider extends React.Component {
  firstSlider = null;
  secondSlider = null;

  render() {
    const { children, items, title, subtitle, ...props } = this.props;

    return (
      <DoubleSliderContainer position="relative">
        <Container
          maxWidth={{ md: "calc(100% - 250px)" }}
          outerContainerProps={{
            color: "#de8e83"
          }}
          overflow="visible"
          flexDirection={{ xs: "column-reverse", md: "row" }}
          px="2em"
        >
          <Slider
            className="first-slider"
            fade
            dots={false}
            arrows={true}
            nextArrow={<Arrow />}
            prevArrow={<Arrow />}
            infinite={true}
            speed={500}
            slidesToScroll={1}
            appendDots={dots => <List bottom="-40px">{dots}</List>}
            slidesToShow={1}
            ref={slider => (this.firstSlider = slider)}
            beforeChange={(oldIndex, newIndex) => {
              this.secondSlider.slickGoTo(newIndex);
            }}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  arrows: false
                }
              }
            ]}
          >
            {items.map((item, index) => (
              <PseudoBox
                height={{ xs: "300px", md: "375px" }}
                justifyContent="center"
                _focus={{ outline: "none" }}
                backgroundImage={`url("${item.image}")`}
                backgroundSize="cover"
                position="relative"
              />
            ))}
          </Slider>
          <Flex
            color="white"
            width={{ xs: "100%", md: "50%" }}
            flexWrap="wrap"
            px="0"
            justifyContent={{ md: "flex-end" }}
          >
            <Box width="100%" textTransform="uppercase">
              {title && (
                <PseudoBox>
                  <FeaturedHeading textAlign={{ md: "right" }}>
                    <h1>{title}</h1>
                  </FeaturedHeading>
                  <Flex
                    height="1px"
                    width="50px"
                    backgroundColor="#e9c8bc"
                    my="15px"
                    ml={{ md: "auto" }}
                  />
                </PseudoBox>
              )}
              {subtitle && (
                <FeaturedSubheading textAlign={{ md: "right" }}>
                  <p>{subtitle}</p>
                </FeaturedSubheading>
              )}
            </Box>
          </Flex>
        </Container>
        <Container
          maxWidth={{ md: "calc(100% - 250px)" }}
          outerContainerProps={{
            color: "#de8e83"
          }}
          mt={{ xs: "-100px", md: "-15%" }}
          overflow={{ xs: "hidden", md: "visible" }}
          alignItems={{ md: "flex-end" }}
          px="0"
        >
          <Slider
            className="second-slider white-dots"
            fade
            arrows={false}
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            appendDots={dots => (
              <List bottom={{ xs: "25px", md: "-40px" }}>{dots}</List>
            )}
            ref={slider => (this.secondSlider = slider)}
            beforeChange={(oldIndex, newIndex) => {
              this.firstSlider.slickGoTo(newIndex);
            }}
            style={{
              backgroundColor: "white"
            }}
          >
            {items.map((item, index) => (
              <PseudoBox
                height={{ xs: "auto", md: "auto" }}
                justifyContent="center"
                _focus={{ outline: "none" }}
                position="relative"
              >
                <Flex
                  height="100%"
                  width="100%"
                  color="black"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="500"
                  pt={{ xs: "130px", md: "70px" }}
                  pb={{ xs: "75px", md: "70px" }}
                  px={{ xs: "2em", md: "70px" }}
                  border="5px solid white"
                >
                  <Heading
                    as="h1"
                    margin="0"
                    textTransform="uppercase"
                    fontSize="70px"
                    lineHeight="1"
                    color="rgba(209, 134, 122, 0.5)"
                    fontFamily="Montserrat"
                  >
                    “
                  </Heading>
                  <Text
                    fontSize="13px"
                    lineHeight="30px"
                    fontStyle="italic"
                    color="#414042"
                    margin="0"
                    fontFamily="Montserrat"
                    textAlign={{ xs: "center", md: "initial" }}
                  >
                    {item.quote}
                  </Text>
                  <Heading
                    as="h2"
                    textTransform="uppercase"
                    letterSpacing="2px"
                    fontSize="13px"
                    margin="0"
                    mt="40px"
                    color="#d1867a"
                  >
                    {item.title}
                  </Heading>
                </Flex>
              </PseudoBox>
            ))}
          </Slider>
        </Container>
      </DoubleSliderContainer>
    );
  }
}
