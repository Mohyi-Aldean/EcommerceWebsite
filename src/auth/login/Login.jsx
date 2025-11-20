import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Card,
  CardMedia,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { loginSchema } from "../../auth/validations/loginValidation";
import { loginUser } from "../../api/UserService";
import momentImg from "../../assets/images/moment0.jpeg";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validateForm = async () => {
    try {
      await loginSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validateForm())) return;

    try {
      setLoading(true);
      const response = await loginUser(values.email, values.password);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
          p: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "900px",
              maxWidth: "95%",
              borderRadius: 4,
              boxShadow: theme.shadows[6],
              overflow: "hidden",
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              transition: "all 0.3s ease",
            }}
          >
            {/* Left side image */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "#f0f0f0",
              }}
            >
              <CardMedia
                component="img"
                image={momentImg}
                alt="Login Image"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxHeight: { xs: "250px", md: "550px" },
                }}
              />
            </Box>

            {/* Right side form */}
            <Box
              sx={{
                flex: 1,
                p: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={2}
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : "#222",
                }}
              >
                Sign In
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Don’t have an account yet?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>

              <TextField
                fullWidth
                label="Email address"
                variant="filled"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "#fafafa",
                  borderRadius: 1,
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="filled"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "#fafafa",
                  borderRadius: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={2}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: theme.palette.text.secondary,
                        "&.Mui-checked": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: theme.palette.primary.main,
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1.2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.main
                        : theme.palette.primary.dark,
                  },
                  transition: "all 0.3s ease",
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Box>
      <ToastContainer />
    </>
  );
}