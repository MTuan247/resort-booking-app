
import { DefaultTheme } from '@react-navigation/native';
import { extendTheme } from "native-base";

const theme = {
  COLORS: {
    BLACK: '#000',
    WHITE: '#FFF',
    PRIMARY: '#18C0C1',
    SECONDARY: '#2A93D5',
    BACKGROUND: '#F2F5FA',
    BORDER: '#546A83',
    DARKGRAY: '#546A83',
    GRAY: '#7A7289',
    LIGHTGRAY: '#D2DBEA',
    CARD: '#F2F5FA',
    TEXT: '#37CAEC',
    EMERALD: '#18C0C1',
    BLUE: '#1254BB',
    RED: '#f00',
    PRICE: '#1254BB',
  },
  FONTS: {
    PRIMARY: 'Poppins',
    BOLD: 'Poppins-Bold',
    SEMIBOLD: 'Poppins-SemiBold'
  }
}

/**
 * Theme cho các điều hướng
 */
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.COLORS.PRIMARY, // Màu chủ đạo
    background: theme.COLORS.BACKGROUND, // Màu background
    border: theme.COLORS.DARKGRAY, // Màu viền
    card: theme.COLORS.CARD, // Màu nền của thanh bottom tab
    text: theme.COLORS.PRIMARY // Màu chữ header
  },
}

/**
 * Theme cho nativebase
 */
const nativeBaseTheme = extendTheme({
  fontConfig: {
    [theme.FONTS.PRIMARY]: {
      500: {
        normal: theme.FONTS.PRIMARY,
      },
      600: {
        normal: theme.FONTS.SEMIBOLD,
      },
      700: {
        normal: theme.FONTS.BOLD,
      },
    },
  },
  colors: {
    primary: {
      500: theme.COLORS.PRIMARY,
    },
  },
  fonts: {
    heading: theme.FONTS.PRIMARY,
    body: theme.FONTS.PRIMARY,
    mono: theme.FONTS.PRIMARY,
  },
});

export { theme, navigationTheme, nativeBaseTheme}

global.theme = theme;