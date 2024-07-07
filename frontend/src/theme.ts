import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "base",
  },
  variants: {
    primary: {
      bg: "gray.800",
      fontFamily: "heading",
      color: "gray.100",
      _hover: {
        bg: "gray.700",
        color: "gray.200",
      },
      transitionDuration: "0.5s",
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});

export const colors = {
  gray: {
    50: "#f7fafc",
    100: "#edf2f7",
    200: "#e2e8f0",
    300: "#cbd5e0",
    400: "#a0aec0",
    500: "#718096",
    600: "#4a5568",
    700: "#2d3748",
    800: "#1a202c",
    900: "#171923",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Whyte, sans-serif",
  },
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: "gray.700",
          },
          td: {
            borderColor: "gray.800",
          },
        },
      },
    },
    Text: defineStyleConfig({
      baseStyle: {
        fontFamily: "body",
        color: "gray.700",
      },
    }),
    Heading: defineStyleConfig({
      baseStyle: {
        fontFamily: "heading",
        color: "gray.700",
      },
    }),
    Button,
  },
});

export default theme;
