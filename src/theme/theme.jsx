import { createTheme } from '@mui/material/styles';

// تعريف الألوان الأساسية لـ 3legant Style: حيادي مع لمسات دافئة
const neutralBlack = '#141718'; // أسود عميق للنصوص والعناوين
const neutralWhite = '#FFFFFF'; // أبيض ناصع للخلفيات
const neutralGray = '#6C7275'; // رمادي للنصوص الثانوية والحدود
const accentColor = '#38CB89'; // لون لهجة أخضر حيوي

// تعريف نظام الخطوط - Poppins و Roboto هما خياران ممتازين
const fontFamily = ['Poppins', 'Roboto', 'sans-serif'].join(',');

const theme = (mode) =>
  createTheme({
    // 🎨 لوحة الألوان الجديدة
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
    // ✍️ إعدادات الطباعة (Typography)
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
    // 🔨 تعديلات المكونات (Components Overrides)
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
              // تأثير هوفر خفيف على الزر الأساسي (الأسود)
              backgroundColor: neutralGray,
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined', // استخدام Outlined للـ Input
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            // نمط حقول الإدخال لتتناسب مع التصميم
            marginTop: '16px',
            marginBottom: '8px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // ظل خفيف وعصري
          },
        },
      },
    },
  });

export default theme;