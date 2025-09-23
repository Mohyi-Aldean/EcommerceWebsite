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
  Fade,
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
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const fontFamily = "'Poppins', sans-serif";

const FadeSlideTransition = forwardRef(function FadeSlideTransition(props, ref) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="left" ref={ref} {...props} timeout={800} />
    </Fade>
  );
});

export default function Navbar({ isLoggedIn }) {
  const { t } = useTranslation();
  const [anchorElProduct, setAnchorElProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode && savedMode !== mode) {
      toggleTheme();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ضبط اتجاه الصفحة عند أول تحميل
  useEffect(() => {
    const lang = localStorage.getItem("lang") || i18n.language;
    document.body.dir = lang === "AR" ? "rtl" : "ltr";
    i18n.changeLanguage(lang);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleOpen = (setAnchor) => (event) => setAnchor(event.currentTarget);
  const handleClose = (setAnchor) => () => setAnchor(null);
  const toggleDrawer = (open) => () => setMobileOpen(open);

  // تبديل اللغة مع التخزين و تغيير اتجاه الصفحة
  const toggleLanguage = () => {
    const newLang = i18n.language === "EN" ? "AR" : "EN";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.body.dir = newLang === "AR" ? "rtl" : "ltr";
  };

  // حفظ وضعية Dark/Light Mode عند تغييره
  const handleToggleTheme = () => {
    toggleTheme();
    const newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
  };

  const colors = {
    text: mode === "light" ? (scrolled ? "#111" : "#111") : scrolled ? "#eee" : "#eee",
    secondaryText: mode === "light" ? (scrolled ? "#555" : "#555") : scrolled ? "#bbb" : "#bbb",
    background: mode === "light" ? (scrolled ? "#fff" : "transparent") : scrolled ? "#1e1e1e" : "transparent",
    hoverBackground: mode === "light" ? "#f5f5f5" : "#444",
    borderHover: mode === "light" ? "#111" : "#eee",
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: colors.background,
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
          px: 2,
          fontFamily,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              color: colors.text,
              fontFamily,
              fontSize: "1.5rem",
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
          >
            MOMENT.
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {[{ label: t("Home"), path: "/" },
              { label: t("Categories"), path: "/categories" },
              { label: t("AboutUs"), path: "/aboutUs" },
              { label: t("ContactUs"), path: "/contactUs" }].map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? colors.text : colors.secondaryText,
                  fontWeight: isActive ? 600 : 500,
                  borderBottom: isActive ? `2px solid ${colors.text}` : "2px solid transparent",
                  transition: "color 0.3s ease, border-bottom 0.3s ease",
                })}
                sx={{
                  textTransform: "none",
                  fontFamily,
                  fontSize: "1rem",
                  letterSpacing: "0.3px",
                  "&:hover": { color: colors.text },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              sx={{
                color: colors.secondaryText,
                textTransform: "none",
                fontFamily,
                fontWeight: 500,
                "&:hover": { color: colors.text },
              }}
              onClick={handleOpen(setAnchorElProduct)}
            >
              {t("Products")} ▾
            </Button>
            <Menu
              anchorEl={anchorElProduct}
              open={Boolean(anchorElProduct)}
              onClose={handleClose(setAnchorElProduct)}
              PaperProps={{
                sx: {
                  fontFamily,
                  backgroundColor: colors.background,
                  "& .MuiMenuItem-root": {
                    color: colors.text,
                    "&:hover": { backgroundColor: colors.hoverBackground },
                  },
                },
              }}
            >
              <MenuItem component={NavLink} to="/products" onClick={handleClose(setAnchorElProduct)}>
                {t("AllProducts")}
              </MenuItem>
              <MenuItem component={NavLink} to="/products?filter=featured" onClick={handleClose(setAnchorElProduct)}>
                {t("Featured")}
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Slide direction="left" in={showSearch} mountOnEnter unmountOnExit>
              <TextField
                autoFocus
                size="small"
                placeholder={t("Search") + "..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    fontFamily,
                    backgroundColor: colors.background,
                    color: colors.text,
                    transition: "all 0.3s ease",
                  },
                  minWidth: "220px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowSearch(false)} sx={{ color: colors.text }}>
                        ✕
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Slide>

            {!showSearch && (
              <IconButton sx={{ color: colors.secondaryText, "&:hover": { color: colors.text } }}
                onClick={() => setShowSearch(true)}
              >
                <SearchIcon />
              </IconButton>
            )}

            <IconButton sx={{ color: colors.secondaryText, "&:hover": { color: colors.text } }}
              onClick={handleToggleTheme}
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            <Button
              onClick={toggleLanguage}
              sx={{
                color: colors.secondaryText,
                textTransform: "none",
                fontFamily,
                fontWeight: 500,
                border: `1px solid ${mode === "light" ? "#ddd" : "#555"}`,
                borderRadius: "20px",
                px: 2,
                "&:hover": { backgroundColor: colors.hoverBackground, color: colors.text },
                transition: "all 0.3s ease",
              }}
            >
              {i18n.language === "EN" ? "AR" : "EN"}
            </Button>

            {isLoggedIn ? (
              <IconButton component={NavLink} to="/cart" sx={{ color: colors.secondaryText, "&:hover": { color: colors.text } }}>
                <ShoppingBagOutlinedIcon />
              </IconButton>
            ) : (
              <Button component={NavLink} to="/login"
                sx={{
                  color: colors.secondaryText,
                  textTransform: "none",
                  fontFamily,
                  fontWeight: 500,
                  border: `1px solid ${mode === "light" ? "#ddd" : "#555"}`,
                  borderRadius: "20px",
                  px: 2,
                  "&:hover": { backgroundColor: colors.hoverBackground, color: colors.text },
                  transition: "all 0.3s ease",
                }}
              >
                {t("Login")}
              </Button>
            )}

            <IconButton edge="end" sx={{ display: { xs: "flex", md: "none" }, color: colors.text }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)} TransitionComponent={FadeSlideTransition}>
        <Box sx={{ width: 250, fontFamily, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.text }}>{t("Menu")}</Typography>
          <Divider />
          <List>
            {[
              { label: t("Home"), path: "/", icon: <HomeIcon /> },
              { label: t("Categories"), path: "/categories", icon: <StorefrontIcon /> },
              { label: t("Products"), path: "/products", icon: <Inventory2Icon /> },
              { label: t("AboutUs"), path: "/aboutUs", icon: <ContactMailIcon /> },
              { label: t("ContactUs"), path: "/contactUs", icon: <ContactMailIcon /> },
            ].map((item) => (
              <ListItem button key={item.path} component={NavLink} to={item.path}>
                <ListItemIcon sx={{ color: colors.secondaryText }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: colors.text }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
