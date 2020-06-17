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
import colors from "styles/colors";

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
          color={colors.njabDarkPink}
          position="absolute"
          top={{ xs: "-175px", md: "-160px" }}
          right="0"
          my="0"
          mb="5px"
          marginRight={{
            xs: `45px`,
            md: `${leftMargin + 125}px`,
          }}
          fontSize="50px"
          fontWeight="300"
          lineHeight="1"
        >
          \
        </Text>
      )}
      <IconButton
        className="arrow-blabla"
        variant="outline"
        variantColor="teal"
        fontSize="30px"
        position="absolute"
        top={{ xs: "-175px", md: "-160px" }}
        cursor="pointer"
        right="0"
        zIndex="1"
        marginRight={{
          xs: variant === "prev" ? `65px` : `-20px`,
          md: variant === "prev" ? `${leftMargin + 200}px` : `${leftMargin}px`,
        }}
        marginTop="5px"
        icon={iconVariant}
        onClick={onClick}
        color={colors.njabDarkPink}
        border="none"
        _hover={{
          background: "transparent",
          color: colors.njabLightPink,
        }}
        _active={{
          background: "transparent",
          color: colors.njabLightPink,
        }}
        _focus={{
          outline: "none",
          color: colors.njabLightPink,
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

  render() {
    const { children, ...props } = this.props;

    return (
      <DoubleSliderContainer position="relative">
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
          appendDots={(dots) => <List bottom="-40px">{dots}</List>}
          slidesToShow={1}
          // responsive={[
          //   {
          //     breakpoint: 768,
          //     settings: {
          //       arrows: false,
          //     },
          //   },
          // ]}
        >
          {children}
        </Slider>
      </DoubleSliderContainer>
    );
  }
}
