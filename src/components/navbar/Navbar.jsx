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
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  ClickAwayListener,
  Slide,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.jsx";

const FadeSlideTransition = forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

export default function Navbar({ isLoggedIn }) {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dir, setDir] = useState(i18n.language === "AR" ? "rtl" : "ltr");
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || ""
  );

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

  const navItems = [
    { label: t("Home"), path: "/", icon: <HomeIcon /> },
    { label: t("Products"), path: "/products", icon: <Inventory2Icon /> },
    { label: t("AboutUs"), path: "/aboutUs", icon: <ContactMailIcon /> },
    { label: t("ContactUs"), path: "/contactUs", icon: <ContactMailIcon /> },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem("search", value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "AR" ? "EN" : "AR";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: colors.bg,
        height: "100%",
        color: colors.text,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: 700,
          borderBottom: `1px solid ${colors.secondaryText}`,
        }}
      >
        MOMENT.
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            button="true"
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: colors.text,
              "&.active": { color: colors.primary, fontWeight: 600 },
            }}
          >
            <ListItemIcon sx={{ color: colors.text }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }} dir={dir}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: colors.bg,
          color: colors.text,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              textDecoration: "none",
              color: colors.text,
              fontFamily,
            }}
          >
            MOMENT.
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  color: colors.text,
                  textTransform: "none",
                  fontWeight: 500,
                  "&.active": {
                    color: colors.primary,
                    fontWeight: 600,
                    borderBottom: `2px solid ${colors.primary}`,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              component={NavLink}
              to="/cart"
              sx={{ color: colors.text }}
            >
              <ShoppingBagOutlinedIcon />
            </IconButton>

            <ClickAwayListener onClickAway={() => setShowSearch(false)}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Slide
                  direction={dir === "rtl" ? "right" : "left"}
                  in={showSearch}
                  mountOnEnter
                  unmountOnExit
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder={t("Search")}
                    sx={{
                      flexShrink: 1,
                      minWidth: "100px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                        fontSize: "0.9rem",
                        width: "200px",
                        bgcolor: mode === "dark" ? "#2C2C2C" : "#F3F3F3",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.secondaryText }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Slide>

                <IconButton
                  onClick={() => setShowSearch(!showSearch)}
                  sx={{ color: colors.text, zIndex: 1 }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </ClickAwayListener>

            <IconButton onClick={(e) => setAnchorProfile(e.currentTarget)}>
              <Avatar sx={{ width: 35, height: 35, bgcolor: colors.primary }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorProfile}
              open={Boolean(anchorProfile)}
              onClose={() => setAnchorProfile(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={changeLanguage}>
                <LanguageIcon sx={{ mr: 1 }} />
                {i18n.language === "AR" ? "English" : "العربية"}
              </MenuItem>
              <MenuItem onClick={toggleTheme}>
                {mode === "dark" ? (
                  <Brightness7Icon sx={{ mr: 1 }} />
                ) : (
                  <Brightness4Icon sx={{ mr: 1 }} />
                )}
                {mode === "dark" ? t("LightMode") : t("DarkMode")}
              </MenuItem>
              <Divider />
              {!isLoggedIn ? (
                <>
                  <MenuItem component={NavLink} to="/login">
                    {t("SignIn")}
                  </MenuItem>
                  <MenuItem component={NavLink} to="/register">
                    {t("SignUp")}
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={NavLink} to="/profile">
                    <AccountCircleIcon sx={{ mr: 1 }} /> {t("Profile")}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} /> {t("Logout")}
                  </MenuItem>
                </>
              )}
            </Menu>

            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: colors.text }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={dir === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
