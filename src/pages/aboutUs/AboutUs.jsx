import React, { useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  Avatar, 
  Divider 
} from '@mui/material';
import { Gavel, Lightbulb, TrendingUp } from '@mui/icons-material';
import { ThemeContext } from '../../theme/ThemeContext.jsx';
import { useTranslation } from 'react-i18next';
import AboutImage from '../../assets/images/about-us-banner.jpg'; 

const teamMembers = [
  { name: 'Ahmed Alsalem', title: 'Founder & CEO', image: null, desc: 'Leads the company\'s vision towards an innovative e-commerce future.', fallbackIcon: 'A' },
  { name: 'Fatima Mohammed', title: 'Chief Operating Officer', image: null, desc: 'Oversees daily operations and ensures our high standard of service quality.', fallbackIcon: 'F' },
  { name: 'Khaled Nasser', title: 'Marketing Manager', image: null, desc: 'Focused on building customer relationships and reaching new markets.', fallbackIcon: 'K' },
];

const coreValues = [
  { icon: <Gavel sx={{ color: '#38CB89' }} />, title: 'Integrity', desc: 'We adhere to the highest standards of honesty and ethical conduct in every transaction.' },
  { icon: <Lightbulb sx={{ color: '#38CB89' }} />, title: 'Innovation', desc: 'We constantly seek to introduce new solutions that meet your evolving needs.' },
  { icon: <TrendingUp sx={{ color: '#38CB89' }} />, title: 'Customer Focus', desc: 'Client satisfaction is our ultimate measure of success and performance.' },
];

export default function AboutUs() {
  const { mode } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const colors = {
    bg: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
    text: mode === 'dark' ? '#FFFFFF' : '#141718',
    secondaryText: mode === 'dark' ? '#B0B0B0' : '#666666',
    primary: '#38CB89',
    cardBg: mode === 'dark' ? '#2C2C2C' : '#F5F5F5',
  };

  return (
    <Box sx={{ bgcolor: colors.bg, color: colors.text, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">

        {/* 🔹 Hero Section */}
        <Box sx={{
          position: 'relative',
          height: { xs: 300, md: 450 },
          mb: 6,
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <CardMedia
            component="img"
            image={AboutImage}
            alt="About Us Banner"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <Box sx={{ maxWidth: 700, p: 3 }}>
              <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Our Story: Commitment to Quality, Passion for Innovation
              </Typography>
              <Typography variant="h6" sx={{ color: '#fff', opacity: 0.9, fontWeight: 300 }}>
                We are here to make your shopping experience unique and outstanding.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: colors.secondaryText, opacity: 0.2 }} />

        {/* 🔹 About Us Section (Responsive direction) */}
        <Grid 
          container 
          spacing={5} 
          alignItems="center" 
          direction={isArabic ? 'row-reverse' : 'row'}
          sx={{ my: 6 }}
        >
          {/* الصورة */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.03)' },
            }}>
              <CardMedia
                component="img"
                image={AboutImage}
                alt="About Our Company"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>

          {/* النص */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 700, mb: 2 }}>
              {isArabic ? 'من نحن' : 'Who We Are'}
            </Typography>
            <Typography variant="h4" sx={{ color: colors.text, fontWeight: 600, mb: 3 }}>
              {isArabic 
                ? 'بدأت رحلتنا بحلم بسيط: لحظة.'
                : 'A Journey Started with a Simple Dream: MOMENT.'}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.secondaryText, lineHeight: 1.8 }}>
              {isArabic 
                ? 'تأسست شركة MOMENT عام 2020 بواسطة فريق شغوف بالتجارة الإلكترونية، يهدف إلى تقديم تجربة تسوق مختلفة ومبتكرة تجمع بين الجودة والإبداع والاهتمام بالتفاصيل.'
                : 'MOMENT was founded in 2020 by a passionate team aiming to revolutionize the e-commerce experience in our region. We combine quality, creativity, and customer focus to deliver a marketplace that truly makes a difference.'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: colors.secondaryText, opacity: 0.2 }} />

        {/* 🔹 Core Values */}
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 5, color: colors.text }}>
            {isArabic ? 'قيمنا الأساسية' : 'Our Beliefs and Core Values'}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ bgcolor: colors.cardBg, p: 3, boxShadow: 'none' }}>
                  <Box sx={{ mb: 2 }}>{value.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text, mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.secondaryText }}>
                    {value.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4, borderColor: colors.secondaryText, opacity: 0.2 }} />

        {/* 🔹 Team Section */}
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 5, color: colors.text }}>
            {isArabic ? 'تعرف على فريق مومنت' : 'Meet the MOMENT Team'}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ bgcolor: colors.cardBg, p: 3, boxShadow: 'none', textAlign: 'center' }}>
                  {member.image ? (
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        mx: 'auto',
                        mb: 2
                      }}
                    />
                  ) : (
                    <Avatar sx={{
                      width: 120,
                      height: 120,
                      bgcolor: colors.primary,
                      fontSize: '3rem',
                      mx: 'auto',
                      mb: 2
                    }}>
                      {member.fallbackIcon}
                    </Avatar>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.primary, mb: 1 }}>
                    {member.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.secondaryText }}>
                    {member.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}