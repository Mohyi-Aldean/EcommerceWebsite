import React, { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Avatar,
  Divider,
} from "@mui/material";
import { Gavel, Lightbulb, TrendingUp } from "@mui/icons-material";
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import AboutImage from "../../assets/images/about-us-banner.jpg";

const teamMembers = [
  {
    name: "Ahmed Alsalem",
    title: "Founder & CEO",
    image: null,
    desc: "Leads the company’s vision towards an innovative e-commerce future.",
    fallbackIcon: "A",
  },
  {
    name: "Fatima Mohammed",
    title: "Chief Operating Officer",
    image: null,
    desc: "Oversees daily operations and ensures our high standard of service quality.",
    fallbackIcon: "F",
  },
  {
    name: "Khaled Nasser",
    title: "Marketing Manager",
    image: null,
    desc: "Focused on building customer relationships and reaching new markets.",
    fallbackIcon: "K",
  },
];

const coreValues = [
  {
    icon: <Gavel sx={{ color: "#38CB89", fontSize: 36 }} />,
    title: "Integrity",
    desc: "We adhere to the highest standards of honesty and ethical conduct in every transaction.",
  },
  {
    icon: <Lightbulb sx={{ color: "#38CB89", fontSize: 36 }} />,
    title: "Innovation",
    desc: "We constantly seek to introduce new solutions that meet your evolving needs.",
  },
  {
    icon: <TrendingUp sx={{ color: "#38CB89", fontSize: 36 }} />,
    title: "Customer Focus",
    desc: "Client satisfaction is our ultimate measure of success and performance.",
  },
];

export default function AboutUs() {
  const { mode } = useContext(ThemeContext);

  const colors = {
    bg: mode === "dark" ? "#1A1A1A" : "#FFFFFF",
    text: mode === "dark" ? "#FFFFFF" : "#141718",
    secondaryText: mode === "dark" ? "#B0B0B0" : "#666666",
    primary: "#38CB89",
    cardBg: mode === "dark" ? "#2C2C2C" : "#F9F9F9",
  };

  return (
    <Box sx={{ bgcolor: colors.bg, color: colors.text, minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            height: { xs: 280, md: 420 },
            mb: 8,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          }}
        >
          <CardMedia
            component="img"
            image={AboutImage}
            alt="About Us Banner"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: 750 }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 2,
                  textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                }}
              >
                Our Story: Commitment to Quality, Passion for Innovation
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#eee",
                  fontWeight: 300,
                  opacity: 0.9,
                  lineHeight: 1.7,
                }}
              >
                We are here to make your shopping experience unique and outstanding.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 6px 25px rgba(0,0,0,0.15)",
                transition: "transform 0.4s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardMedia
                component="img"
                image={AboutImage}
                alt="About Our Company"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 700, mb: 2 }}>
              Who We Are
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              A Journey Started with a Simple Dream: MOMENT.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.secondaryText, lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              MOMENT was founded in 2020 by a passionate team aiming to revolutionize
              the e-commerce experience in our region. We combine quality, creativity,
              and customer focus to deliver a marketplace that truly makes a difference.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6 }}>
            Our Beliefs and Core Values
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: colors.cardBg,
                    borderRadius: 3,
                    p: 4,
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{value.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.secondaryText, lineHeight: 1.7 }}
                  >
                    {value.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6 }}>
            Meet the MOMENT Team
          </Typography>
          <Grid container spacing={5} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: colors.cardBg,
                    borderRadius: 3,
                    p: 4,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {member.image ? (
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        objectFit: "cover",
                        mx: "auto",
                        mb: 2,
                      }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: colors.primary,
                        fontSize: "3rem",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {member.fallbackIcon}
                    </Avatar>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
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