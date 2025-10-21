import React, { useState, useContext, useEffect, forwardRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Slide,
  TextField,
  InputAdornment,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.jsx";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const FadeSlideTransition = forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

export default function Navbar({ isLoggedIn }) {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [dir, setDir] = useState(i18n.language === "AR" ? "rtl" : "ltr");

  useEffect(() => {
    setDir(i18n.language === "AR" ? "rtl" : "ltr");
  }, [i18n.language]);

  const colors = {
    bg: mode === "dark" ? "#1A1A1A" : "#FFFFFF",
    text: mode === "dark" ? "#FFFFFF" : "#141718",
    secondaryText: mode === "dark" ? "#B0B0B0" : "#666666",
    primary: "#38CB89",
  };

  const fontFamily = "'Poppins', sans-serif";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setAnchorElLang(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const navItems = [
    { label: t("Home"), path: "/", icon: <HomeIcon /> },
    { label: t("Categories"), path: "/categories", icon: <StorefrontIcon /> },
    { label: t("Products"), path: "/products", icon: <Inventory2Icon /> },
    { label: t("AboutUs"), path: "/aboutUs", icon: <ContactMailIcon /> },
    { label: t("ContactUs"), path: "/contactUs", icon: <ContactMailIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} dir={dir}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: colors.bg,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          color: colors.text,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              textDecoration: "none",
              color: colors.text,
              fontFamily,
            }}
          >
            MOMENT.
          </Typography>

          {/* 🔍 Search Box */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mx: 3,
            }}
          >
            <TextField
              size="small"
              placeholder={t("Search")}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "38px",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  color: colors.text,
                  bgcolor: mode === "dark" ? "#2C2C2C" : "#F3F3F3",
                  "& fieldset": {
                    borderColor: mode === "dark" ? "#444" : "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: `${colors.primary} !important`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${colors.primary} !important`,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: colors.secondaryText, fontSize: "1.2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* 🌐 Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, fontFamily }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  color: colors.text,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  "&.active": {
                    color: colors.primary,
                    fontWeight: 600,
                    borderBottom: `2px solid ${colors.primary}`,
                    borderRadius: 0,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* 🌙 Right Side Icons */}
          <Box display="flex" alignItems="center">
            <IconButton
              sx={{ ml: 1, color: colors.text }}
              onClick={toggleTheme}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton
              sx={{ ml: 1, color: colors.text }}
              onClick={(e) => setAnchorElLang(e.currentTarget)}
            >
              <LanguageIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={() => setAnchorElLang(null)}
              MenuListProps={{ dir }}
            >
              <MenuItem
                onClick={() => changeLanguage("EN")}
                selected={i18n.language === "EN"}
              >
                English (EN)
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage("AR")}
                selected={i18n.language === "AR"}
              >
                العربية (AR)
              </MenuItem>
            </Menu>

            <IconButton
              sx={{ ml: 1, color: colors.text }}
              component={NavLink}
              to="/cart"
            >
              <ShoppingBagOutlinedIcon />
            </IconButton>

            {/* 👇 Login & Register Buttons */}
            {!isLoggedIn ? (
              <Box sx={{ display: { xs: "none", sm: "flex" }, ml: 2, gap: 1 }}>
                <Button
                  component={NavLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderRadius: "30px",
                    padding: "6px 22px",
                    borderWidth: "2px",
                    borderColor: mode === "dark" ? "#38CB89" : "#2C3E50",
                    color: mode === "dark" ? "#38CB89" : "#2C3E50",
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow:
                      mode === "dark" ? "0 0 8px rgba(56,203,137,0.4)" : "none",
                    "&:hover": {
                      borderColor: "#38CB89",
                      color: "#38CB89",
                      transform: "translateY(-2px) scale(1.03)",
                      boxShadow: "0 4px 12px rgba(56,203,137,0.3)",
                    },
                  }}
                >
                  {t("SignIn")}
                </Button>

                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    padding: "6px 25px",
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #38CB89 0%, #2C3E50 100%)",
                    color: "#fff",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow:
                      mode === "dark"
                        ? "0 0 10px rgba(56,203,137,0.6)"
                        : "0 0 6px rgba(56,203,137,0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2C3E50 0%, #38CB89 100%)",
                      transform: "translateY(-2px) scale(1.03)",
                      boxShadow: "0 4px 12px rgba(56,203,137,0.4)",
                    },
                    animation: "pulse 3s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  {t("SignUp")}
                </Button>
              </Box>
            ) : (
              <>
                <IconButton
                  sx={{ ml: 1, color: colors.text }}
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                  MenuListProps={{ dir }}
                >
                  <MenuItem onClick={() => setAnchorElUser(null)}>
                    {t("Profile")}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t("Logout")} />
                  </MenuItem>
                </Menu>
              </>
            )}

            <IconButton
              edge="end"
              sx={{ display: { xs: "flex", md: "none" }, color: colors.text }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}