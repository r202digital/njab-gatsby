import React from "react";
import Box from "@chakra-ui/core/dist/Box";
import PseudoBox from "@chakra-ui/core/dist/PseudoBox";
import List from "@chakra-ui/core/dist/List";
import Flex from "@chakra-ui/core/dist/Flex";
import Text from "@chakra-ui/core/dist/Text";
import Heading from "@chakra-ui/core/dist/Heading";
import Button from "@chakra-ui/core/dist/Button";
import Slider from "react-slick";
import Container from "./Container";
import styled from "@emotion/styled";
import Link from "components/_ui/Link";
import colors from "styles/colors";
import dayjs from "dayjs";

const Arrow = ({ className, style, onClick }) => {
  const variant = className
    .replace(/ /g, "")
    .replace("slick-arrow", "")
    .replace("slick-", "");
  return (
    <>
      <Button
        variant="outline"
        variantColor="teal"
        aria-label="Previous"
        fontSize="12px"
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        left="0"
        padding="0"
        onClick={onClick}
        color="#414042"
        fontSize="14px"
        fontWeight="400"
        fontFamily="Montserrat"
        display={variant === "next" ? { xs: "none", md: "initial" } : "none"}
        border="none"
        _hover={{
          background: "transparent",
          color: "black",
        }}
        _active={{
          background: "transparent",
          color: "black",
        }}
        _focus={{
          outline: "none",
          color: "black",
        }}
      >
        PREVIOUS
      </Button>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: ${colors.njabDarkPink};
  }
`;

const LinkButton = styled(Link)`
  color: white;
  text-decoration: none;
  border: 1px solid white;
  padding: 10px 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
  }
`;

const DoubleSliderContainer = styled(Box)`
  .first-slider {
    &.one-item {
      .slick-track {
        margin: 0 auto;
      }
    }
  }

  .second-slider {
    width: 100%;
  }

  .white-dots {
    .slick-dots {
      li {
        button {
          &:before {
            color: #332525;
          }
        }

        &.slick-active {
          button {
            &:before {
              color: #fff;
              opacity: 1;
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

const StyledBox = styled(Box)`
  position: relative;

  .details-container {
    transition: all 0.3s;
    opacity: 0;
  }

  &:hover {
    .details-container {
      opacity: 1;
    }
  }
`;

export default class DoubleSlider extends React.Component {
  render() {
    const { children, items, ...props } = this.props;

    return (
      <DoubleSliderContainer position="relative" mb={{ md: "60px" }}>
        <Container
          px="50px"
          maxWidth={{ md: "calc(100% - 250px)" }}
          outerContainerProps={{
            color: "#de8e83",
          }}
          overflow={{ xs: "hidden", md: "visible" }}
          alignItems={{ md: "flex-end" }}
        >
          <Slider
            className="second-slider"
            fade
            arrows={true}
            prevArrow={<Arrow />}
            nextArrow={<Arrow />}
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            appendDots={(dots) => <List bottom="-40px">{dots}</List>}
            ref={(slider) => (this.secondSlider = slider)}
            beforeChange={(oldIndex, newIndex) => {
              this.firstSlider.slickGoTo(newIndex);
            }}
          >
            {items.map((item, index) => (
              <PseudoBox
                _focus={{ outline: "none" }}
                position="relative"
                py="40px"
              >
                <Flex justifyContent="center" position="relative">
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    textAlign="center"
                    fontFamily="Montserrat"
                  >
                    <StyledLink to={`/events/${item.id}`}>
                      <Heading
                        as="h1"
                        textTransform="uppercase"
                        letterSpacing="5px"
                        fontSize="24px"
                        margin="0"
                        color="#d1867a"
                        fontFamily="Montserrat"
                        mb="10px"
                      >
                        {item.title}
                      </Heading>
                    </StyledLink>
                    <StyledLink to={`/events/${item.id}`}>
                      <Heading
                        as="h2"
                        textTransform="uppercase"
                        letterSpacing="5px"
                        fontSize="16px"
                        margin="0"
                        color="#d1867a"
                        fontWeight="400"
                        fontFamily="Montserrat"
                      >
                        {item.subtitle ? item.subtitle : item.title}
                      </Heading>
                    </StyledLink>
                  </Flex>
                  <Flex
                    alignItems="center"
                    position="absolute"
                    right="0"
                    top="50%"
                    transform="translateY(-50%)"
                    display={{
                      xs: "none",
                      md: "flex",
                    }}
                  >
                    <Text
                      fontSize="14px"
                      color="#414042"
                      fontFamily="Montserrat"
                    >{`${item.index + 1 < 10 ? "0" : ""}${item.index +
                      1}`}</Text>
                    <Text fontSize="35px" transform="rotate(15deg)" mx="15px">
                      /
                    </Text>
                    <Text
                      fontSize="14px"
                      color="#414042"
                      fontFamily="Montserrat"
                    >{`${item.total < 10 ? "0" : ""}${item.total}`}</Text>
                  </Flex>
                </Flex>
              </PseudoBox>
            ))}
          </Slider>
        </Container>
        <Slider
          className={`first-slider pink-dots ${
            items.length === 1 ? "one-item" : ""
          }`}
          dots={true}
          arrows={false}
          infinite={true}
          centerMode={true}
          speed={500}
          slidesToScroll={1}
          appendDots={(dots) => <List bottom="-40px">{dots}</List>}
          slidesToShow={1}
          ref={(slider) => (this.firstSlider = slider)}
          beforeChange={(oldIndex, newIndex) => {
            this.secondSlider.slickGoTo(newIndex);
          }}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                centerMode: false,
              },
            },
          ]}
        >
          {items.map((item, index) => (
            <PseudoBox px={{ md: "15px" }} _focus={{ outline: "none" }}>
              <StyledBox
                height={{ xs: "500px", md: "500px" }}
                justifyContent="center"
                backgroundImage={`url("${item.image}")`}
                backgroundSize="cover"
                backgroundPosition={{ xs: "50%", md: "center" }}
                position="relative"
                padding="10px"
              >
                <Flex
                  className="details-container"
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  backgroundColor={colors.njabDarkPink}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  padding={{ xs: "20px", md: "initial" }}
                >
                  <PseudoBox
                    textAlign="center"
                    _after={{
                      content: "''",
                      display: "block",
                      height: "1px",
                      width: "50px",
                      backgroundColor: "#e9c8bc",
                      my: "20px",
                      mx: "auto",
                    }}
                    width="75%"
                  >
                    <Text
                      textTransform="uppercase"
                      margin="0"
                      letterSpacing="2px"
                      lineHeight="2em"
                      fontSize="14px"
                      fontFamily="Montserrat"
                    >
                      {dayjs(item.date).format("MMMM D, YYYY")}
                    </Text>
                  </PseudoBox>
                  <Heading
                    as="h1"
                    letterSpacing="4px"
                    fontWeight="700"
                    lineHeight="1"
                    fontFamily="Montserrat"
                    textAlign="center"
                    margin="0"
                    mb="30px"
                    textTransform="uppercase"
                  >
                    {item.title}
                  </Heading>
                  <Text
                    as="em"
                    color="white"
                    textAlign="center"
                    width={{ xs: "80%", md: "50%" }}
                    letterSpacing="1px"
                    fontWeight="500"
                    fontSize="14px"
                    lineHeight="1.75"
                    mb="50px"
                    overflow={{ xs: "scroll", md: "initial" }}
                  >
                    {item.description}
                  </Text>
                  <LinkButton
                    fontWeight="700"
                    letterSpacing="1px"
                    fontFamily="Montserrat"
                    to={`/events/${item.id}`}
                  >
                    Read More
                  </LinkButton>
                </Flex>
              </StyledBox>
            </PseudoBox>
          ))}
        </Slider>
      </DoubleSliderContainer>
    );
  }
}
