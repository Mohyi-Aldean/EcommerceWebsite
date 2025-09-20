import React, { useState } from "react";
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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const fontFamily = "'Poppins', sans-serif";

// مكوّن يجمع بين Fade + Slide
const FadeSlideTransition = React.forwardRef(function FadeSlideTransition(
  props,
  ref
) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="left" ref={ref} {...props} timeout={400} />
    </Fade>
  );
});

export default function Navbar({ isLoggedIn }) {
  const [anchorElProduct, setAnchorElProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
          px: 2,
          fontFamily,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              color: "#000",
              fontFamily,
              fontSize: "1.5rem",
              letterSpacing: "0.5px",
            }}
          >
            MOMENT.
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {[
              { label: "Home", path: "/" },
              { label: "Categories", path: "/categories" },
              { label: "About Us", path: "/aboutUs" },
              { label: "Contact Us", path: "/contactUs" },
            ].map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#111" : "#555",
                  fontWeight: isActive ? "600" : "500",
                  borderBottom: isActive
                    ? "2px solid #111"
                    : "2px solid transparent",
                })}
                sx={{
                  textTransform: "none",
                  fontFamily,
                  fontSize: "1rem",
                  letterSpacing: "0.3px",
                  transition: "0.3s",
                  "&:hover": { color: "#111" },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              sx={{
                color: "#555",
                textTransform: "none",
                fontFamily,
                fontWeight: 500,
                "&:hover": { color: "#111" },
              }}
              onClick={handleOpen(setAnchorElProduct)}
            >
              Products ▾
            </Button>
            <Menu
              anchorEl={anchorElProduct}
              open={Boolean(anchorElProduct)}
              onClose={handleClose(setAnchorElProduct)}
              PaperProps={{
                sx: {
                  fontFamily,
                  "& .MuiMenuItem-root": {
                    color: "#444",
                    "&:hover": { backgroundColor: "#f5f5f5", color: "#000" },
                  },
                },
              }}
            >
              <MenuItem
                component={NavLink}
                to="/products"
                onClick={handleClose(setAnchorElProduct)}
              >
                All Products
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/products?filter=featured"
                onClick={handleClose(setAnchorElProduct)}
              >
                Featured
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Slide direction="left" in={showSearch} mountOnEnter unmountOnExit>
              <TextField
                autoFocus
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    fontFamily,
                  },
                  minWidth: "220px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowSearch(false)}>
                        ✕
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Slide>

            {!showSearch && (
              <IconButton
                sx={{ color: "#555", "&:hover": { color: "#000" } }}
                onClick={() => setShowSearch(true)}
              >
                <SearchIcon />
              </IconButton>
            )}

            {isLoggedIn ? (
              <IconButton
                component={NavLink}
                to="/cart"
                sx={{ color: "#555", "&:hover": { color: "#000" } }}
              >
                <ShoppingBagOutlinedIcon />
              </IconButton>
            ) : (
              <Button
                component={NavLink}
                to="/login"
                sx={{
                  color: "#555",
                  textTransform: "none",
                  fontFamily,
                  fontWeight: 500,
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#111",
                  },
                }}
              >
                Login
              </Button>
            )}

            {/* منيو الموبايل */}
            <IconButton
              edge="end"
              sx={{ display: { xs: "flex", md: "none" }, color: "#000" }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        TransitionComponent={FadeSlideTransition}
      >
        <Box
          sx={{
            width: 250,
            fontFamily,
            p: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 2, color: "#000" }}
          >
            Menu
          </Typography>
          <Divider />
          <List>
            <ListItem button component={NavLink} to="/">
              <ListItemIcon>
                <HomeIcon sx={{ color: "#555" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={NavLink} to="/categories">
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#555" }} />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button component={NavLink} to="/products">
              <ListItemIcon>
                <Inventory2Icon sx={{ color: "#555" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={NavLink} to="/aboutUs">
              <ListItemIcon>
                <ContactMailIcon sx={{ color: "#555" }} />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button component={NavLink} to="/contactUs">
              <ListItemIcon>
                <ContactMailIcon sx={{ color: "#555" }} />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}