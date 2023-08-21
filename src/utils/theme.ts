import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { transpileModule } from 'typescript';

const config: ThemeConfig = {
    useSystemColorMode: true,
    initialColorMode: "system",
  };

  const breakpoints = {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  }

  const theme = extendTheme({
    config,
    breakpoints,
    colors: {
      transparent: "transparent",
      gray: {
        50: "#F7FAFC",
        100: "#EDF2F7",
        200: "#E2E8F0",
        300: "#CBD5E0",
        400: "#A0AEC0",
        500: "#718096",
        600: "#4A5568",
        700: "#2D3748",
        800: "#1A202C",
        900: "#171923",
      },
      fonts: {
        
      },
      fontsizes: {

      },
      fontweights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900
      }
    },
  });

  export default theme;