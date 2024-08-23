// themes.js
import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#F15A24',
      },
      background: {
        default: '#0d4fa5',
        paper: '#121212',
      },
      text: {
        primary: '#ffffff',
        secondary: '#F15A24',
      },
      action: {
        color:"#f1e7e7",
      },
      hover:{
        color:"#3764e3"
      },
    },
    typography: {
      fontFamily: 'poppins',
    },
  });
  
  export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#F15A24',
      },
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
      },
      text: {
        primary: '#000000',
        secondary: '#F15A24',
      },
      action: {
        color:"#080808",
      },
      hover:{
        color:"#a8aab9"
      },
    },
    typography: {
      fontFamily: 'poppins',
    },
  });
  
