import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "var(--font-montserrat), sans-serif",
    body: "var(--font-montserrat), sans-serif",
  },
  colors: {
    primary: {
      50: "#FFECE6",
      100: "#FFD1C9",
      200: "#FFB3A8",
      300: "#FF9487",
      400: "#FF7666",
      500: "#FB5F5A",
      600: "#E04E4A",
      700: "#C53E3A",
      800: "#A92E2A",
      900: "#8E1E1A",
    },
    secondary: {
      50: "#EDE7F1",
      100: "#CBBFD8",
      200: "#A897BF",
      300: "#866FA6",
      400: "#745C97",
      500: "#6B4E8A",
      600: "#5D4376",
      700: "#4F3862",
      800: "#412D4E",
      900: "#33223A",
    },
    background: {
      50: "#F9F9F9",
    },
    gray: {
      50: "#F0F1F3",
      100: "#E0E2E5",
      200: "#D0D3D8",
      300: "#B0B4BC",
      400: "#90949F",
      500: "#70747F",
      600: "#4F535C",
      700: "#2B2E35",
      800: "#1F2228",
      900: "#14161A",
    },
  },
  sizes: {
    container: {
      maxWidth: "1200px",
    },
    containerPaddingBaseLeft: "16px",
    containerPaddingSMLeft: "20px",
    containerPaddingLGLeft: "56px",
    containerPaddingBaseRight: "16px",
    containerPaddingSMRight: "20px",
    containerPaddingLGRight: "56px",
    containerHeadingPY: "56px",
    containerMarginBottom: "0",
    containerPaddingBottom: "0",
    containerContentMarginTop: "56px",
    containerContentMarginBottom: "56px",
  },
  textStyles: {
    sectionTitle: {
      fontSize: { base: "2xl", md: "3xl" },
      fontWeight: 600,
      color: "gray.700",
      lineHeight: "1.2",
    },
    sectionSubtitle: {
      fontSize: { base: "md", md: "1.2rem" },
      color: "gray.500",
      lineHeight: "1.5",
      maxWidth: "700px",
      margin: "0 auto",
    },
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "var(--font-montserrat), sans-serif",
        backgroundColor: "white",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
    },
  },
  breakpoints: {
    xs: "320px",
    sm: "450px",
    md: "700px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
    xxxl: "1920px",
  },
});

export default theme;
