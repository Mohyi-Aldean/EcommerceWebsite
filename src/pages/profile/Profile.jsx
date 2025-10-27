import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AxiosUserInstance from "../../api/AxiosUserInstance"; 
import LanguageIcon from "@mui/icons-material/Language";

// ⬅️ استيراد خط Poppins
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export default function Profile({ toggleTheme, mode }) {
  const { t, i18n } = useTranslation(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await AxiosUserInstance.get("/Users/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError(t("profile.loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [t]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography color="error" fontFamily="Poppins">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
        px: 2,
        gap: 3,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Avatar */}
      <Avatar
        src={profile.avatar || ""}
        alt={profile.username}
        sx={{ width: 120, height: 120 }}
      />

      {/* Username & Email */}
      <Typography variant="h5" fontWeight={700}>
        {profile.username}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {profile.email}
      </Typography>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Profile Information */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", maxWidth: 400 }}>
        <Typography fontWeight={500}>
          <strong>{t("profile.fullName")}:</strong> {profile.fullName || "-"}
        </Typography>
        <Typography fontWeight={500}>
          <strong>{t("profile.phone")}:</strong> {profile.phone || "-"}
        </Typography>
        <Typography fontWeight={500}>
          <strong>{t("profile.address")}:</strong> {profile.address || "-"}
        </Typography>
        <Typography fontWeight={500}>
          <strong>{t("profile.createdAt")}:</strong>{" "}
          {new Date(profile.createdAt).toLocaleDateString() || "-"}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 400 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile/edit")}
          fullWidth
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {t("profile.editProfile")}
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          fullWidth
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {t("profile.logout")}
        </Button>
      </Box>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Settings */}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              color="primary"
            />
          }
          label={mode === "dark" ? "Dark Mode" : "Light Mode"}
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        />
        <IconButton onClick={() => changeLanguage(i18n.language === "EN" ? "AR" : "EN")}>
          <LanguageIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
