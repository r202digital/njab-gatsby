import React from "react";
import { Flex, List, ListItem, Stack, Link, Text, Box } from "@chakra-ui/core";
import Slider from "react-slick";
import styled from "@emotion/styled";
import colors from "styles/colors";

var classNames = require("classnames");

const SliderContainer = styled(Slider)`
  .slick-dots {
    bottom: 15px;

    @media (min-width: 768px) {
      bottom: -40px;
    }
  }

  &.pink-dots {
    .slick-dots {
      li {
        button {
          &:before {
            color: ${colors.njabDotsPinkLight};
            opacity: 0.75;
            font-size: 8px;

            @media (min-width: 768px) {
              color: #9c8881;
              opacity: 0.4;
              font-size: 6px;
            }
          }
        }

        &.slick-active {
          button {
            &:before {
              color: white;
              opacity: 1;
              @media (min-width: 768px) {
                color: #d89a8d;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
`;

const SliderContainerMobile = styled(SliderContainer)`
  display: initial;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DisjointedSlider = ({
  children,
  pinkDots,
  mobileProps,
  classes = [],
  ...props
}) => {
  return (
    <>
      <SliderContainer
        className={classNames([
          "disjoint-slider",
          { "pink-dots": pinkDots },
          ...classes
        ])}
        arrows={false}
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        centerMode
        appendDots={dots => <List bottom="-40px">{dots}</List>}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
              initialSlide: 0
            }
          }
        ]}
        {...props}
      >
        {children}
      </SliderContainer>
      {/* <SliderContainerMobile
        className={classNames([
          "disjoint-slider-mobile",
          { "pink-dots": pinkDots },
          ...classes
        ])}
        arrows={false}
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        centerMode
        appendDots={dots => <List bottom="-40px">{dots}</List>}
        {...mobileProps}
      >
        {children}
      </SliderContainerMobile> */}
    </>
  );
};

export default DisjointedSlider;
