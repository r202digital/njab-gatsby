import React from "react";
import { Flex, List, ListItem, Stack, Link, Text, Box } from "@chakra-ui/core";
import Slider from "react-slick";
import styled from "@emotion/styled";

var classNames = require("classnames");

const SliderContainer = styled(Slider)`
  display: none;

  @media (min-width: 768px) {
    display: initial;
  }

  &.pink-dots {
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

const SliderContainerMobile = styled(SliderContainer)`
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
        {...props}
      >
        {children}
      </SliderContainer>
      <SliderContainerMobile
        className={`disjoint-slider-mobile ${pinkDots && "pink-dots"}`}
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
      </SliderContainerMobile>
    </>
  );
};

export default DisjointedSlider;
