import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  Divider,
  Fade,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/material/styles';

const FooterLink = styled(Link)(() => ({
  color: '#b0b0b0',
  textDecoration: 'none',
  transition: 'all 0.4s ease',
  '&:hover': {
    color: '#fff',
    opacity: 0.9,
  },
}));

const SocialButton = styled(IconButton)(() => ({
  color: '#b0b0b0',
  transition: 'all 0.4s ease',
  '&:hover': {
    color: '#fff',
    transform: 'scale(1.2)',
    opacity: 0.9,
  },
}));

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#141718',
        color: '#fff',
        pt: 6,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">

          <Grid item xs={12} md="auto">
            <Fade in timeout={800}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                 MOMENT.
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                  Bringing you the best products for every moment.
                </Typography>
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'center' },
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              {['Home', 'Shop', 'Product', 'Blog', 'Contact Us'].map((text, i) => (
                <Fade in timeout={800 + i * 200} key={text}>
                  <FooterLink href="#">{text}</FooterLink>
                </Fade>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md="auto">
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                gap: 1,
              }}
            >
              {[<InstagramIcon />, <FacebookIcon />, <YouTubeIcon />].map((icon, i) => (
                <Fade in timeout={1200 + i * 200} key={i}>
                  <SocialButton>{icon}</SocialButton>
                </Fade>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 3,
            border: 0,
            height: '1px',
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'space-between' },
            flexWrap: 'wrap',
            gap: 2,
            color: '#777',
          }}
        >
          <Typography variant="body2">
            Copyright © {new Date().getFullYear()} MOMENT. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Use</FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
