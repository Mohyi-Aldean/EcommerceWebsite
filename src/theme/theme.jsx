import { createTheme } from '@mui/material/styles';

const neutralBlack = '#141718'; 
const neutralWhite = '#FFFFFF'; 
const neutralGray = '#6C7275'; 
const accentColor = '#38CB89'; 

const fontFamily = ['Poppins', 'Roboto', 'sans-serif'].join(',');

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: neutralBlack,
        light: '#272B2C',
        dark: neutralBlack,
        contrastText: neutralWhite,
      },
      secondary: {
        main: accentColor,
        light: '#A7EAD7',
        dark: '#2AA570',
        contrastText: neutralWhite,
      },
      background: {
        default: mode === 'light' ? neutralWhite : '#121212',
        paper: mode === 'light' ? '#F3F5F7' : '#1D1D1D', // لون خلفية أفتح قليلاً للبطاقات (MUI Card)
      },
      text: {
        primary: mode === 'light' ? neutralBlack : neutralWhite,
        secondary: neutralGray,
        accent: accentColor,
      },
      divider: mode === 'light' ? '#E8ECEF' : '#333333',
    },
    typography: {
      fontFamily: fontFamily,
      h1: { fontSize: '3.5rem', fontWeight: 700 },
      h2: { fontSize: '2.5rem', fontWeight: 700 },
      h3: { fontSize: '1.8rem', fontWeight: 600 },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 },
      body1: { fontSize: '1rem' },
      body2: { fontSize: '0.9rem', color: neutralGray },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            padding: '12px 24px',
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: neutralGray,
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            marginTop: '16px',
            marginBottom: '8px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });

export default theme;