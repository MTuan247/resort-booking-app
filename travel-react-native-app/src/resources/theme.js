
import { DefaultTheme } from '@react-navigation/native';

const theme = {
  COLORS: {
    BLACK: '#000',
    WHITE: '#FFF',
    PRIMARY: '#18C0C1',
    SECONDARY: '#2A93D5',
    BACKGROUND: '#F2F5FA',
    BORDER: '#546A83',
    CARD: '#F2F5FA',
    TEXT: '#37CAEC',
    EMERALD: '#18C0C1',
    BLUE: '#1254BB',
  },
  FONTS: {
    PRIMARY: 'Poppins',
    POPPINS: 'Poppins'
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
    border: theme.COLORS.BORDER, // Màu viền
    card: theme.COLORS.CARD, // Màu nền của thanh bottom tab
    text: theme.COLORS.PRIMARY // Màu chữ header
  },
}

export { theme, navigationTheme}

global.theme = theme;