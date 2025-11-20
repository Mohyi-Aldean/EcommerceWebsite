import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  Send,
  Person,
  Subject,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 3-5 business days within the region. Express options are available at checkout for faster delivery.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee on all unused and undamaged items. Please visit our Returns page for detailed instructions.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking number and a link to the courier’s website. You can also track it via your account dashboard.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within the GCC countries. We are working to expand our shipping destinations soon!",
  },
];

export default function ContactUs() {
  const { mode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const colors = {
    bg: mode === "dark" ? "#1A1A1A" : "#FFFFFF",
    text: mode === "dark" ? "#FFFFFF" : "#141718",
    secondaryText: mode === "dark" ? "#B0B0B0" : "#666666",
    primary: "#38CB89",
    cardBg: mode === "dark" ? "#2C2C2C" : "#F5F5F5",
    inputBg: mode === "dark" ? "#3C3C3C" : "#FFFFFF",
    accordionBg: mode === "dark" ? "#222222" : "#F9F9F9",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your message has been sent successfully! Thank you.");
  };

  return (
    <Box
      sx={{ bgcolor: colors.bg, color: colors.text, minHeight: "100vh", py: 6 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Have Any Questions?
          </Typography>
          <Typography variant="h6" sx={{ color: colors.secondaryText }}>
            Feel free to reach out to us using the form below or through direct
            contact information.
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: colors.cardBg,
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${mode === "dark" ? "#333" : "#E0E0E0"}`,
          }}
        >
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                pr: { md: 4 },
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 3, color: colors.primary }}
              >
                Contact Us Directly
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOn sx={{ color: colors.primary, mr: 1 }} />
                  <Typography variant="body1">
                    Location: Riyadh, Saudi Arabia, King Fahd Road.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Phone sx={{ color: colors.primary, mr: 1 }} />
                  <Typography variant="body1">
                    Phone: +966 50 123 4567
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ color: colors.primary, mr: 1 }} />
                  <Typography variant="body1">
                    Email: support@moment.com
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: { xs: 200, md: 350 },
                  borderRadius: 2,
                  overflow: "hidden",
                  border: `1px solid ${colors.secondaryText}`,
                }}
              >
                <iframe
                  title="Google Map Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.739961611607!2d46.67694137538047!3d24.713551878103188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02eddd2c3c0b%3A0xd65e26e7ff8f9b61!2sKing%20Fahd%20Rd%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1698765432100"
                ></iframe>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              sx={{
                pl: { md: 12 },
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Send Us a Message
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: colors.secondaryText }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: colors.inputBg,
                    "& input": { color: colors.text },
                    "& label": { color: colors.secondaryText },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: colors.secondaryText }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: colors.inputBg,
                    "& input": { color: colors.text },
                    "& label": { color: colors.secondaryText },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  label="Subject"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Subject sx={{ color: colors.secondaryText }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: colors.inputBg,
                    "& input": { color: colors.text },
                    "& label": { color: colors.secondaryText },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Message"
                  variant="outlined"
                  sx={{
                    bgcolor: colors.inputBg,
                    "& textarea": { color: colors.text },
                    "& label": { color: colors.secondaryText },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<Send />}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    bgcolor: colors.primary,
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { opacity: 0.9 },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Box sx={{ mt: 8, pb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{
                  mb: 1.5,
                  borderRadius: "8px !important",
                  bgcolor: colors.accordionBg,
                  boxShadow: "none",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{ color: colors.secondaryText, lineHeight: 1.7 }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
