import { theme } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac"
    }
  },
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: "Montserrat, sans-serif",
    mono: "Montserrat, monospace"
  }
};

export default customTheme;
