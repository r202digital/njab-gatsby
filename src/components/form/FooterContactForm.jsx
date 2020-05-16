import { useForm, useField } from "react-final-form-hooks";
import theme from "styles/theme";
import React from "react";
import {
  Box,
  Flex,
  InputGroup,
  Input,
  InputLeftAddon,
  Heading
} from "@chakra-ui/core";
import { FaArrowRight } from "react-icons/fa";
import Button from "components/_ui/Button";
import useToast from "@chakra-ui/core/dist/Toast";
import colors from "styles/colors";

const FooterContactForm = ({ children, ...props }) => {
  return (
    <Box flex="2" px={{ xs: "2rem", md: "15%" }}>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log("sample");
        }}
      >
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
        <Flex direction="column">
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
          <Button
            type="submit"
            borderRadius="6px"
            padding="10px"
            backgroundColor={colors.njabDarkPink}
            _hover={{ backgroundColor: colors.njabDarkPink }}
          >
            Connect
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default FooterContactForm;
