import { createTheme, lighten } from '@mui/material';
import { fonts } from '../utils/variables';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#101214',
      paper: lighten('#101214', 0.01),
    },
    primary: {
      light: '#fcce83',
      main: '#fbba52',
      dark: '#faab2e',
      contrastText: '#000',
    },
    secondary: {
      light: '#75b3fe',
      main: '#5293fb',
      dark: '#5084ec',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.heading,
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: fonts.heading,
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.25rem',
    },
    button: {
      fontFamily: fonts.button,
      fontWeight: 600,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: fonts.button,
        },
      },
    },
  },
});
