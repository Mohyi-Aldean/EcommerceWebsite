import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Card,
  CardMedia,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerSchema } from "../../auth/validations/registerValidation";
import { registerUser } from "../../api/UserService";
import momentImg from "../../assets/images/moment0.jpeg";

export default function Register() {
  const [values, setValues] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = async () => {
    try {
      await registerSchema.validate(values, { abortEarly: false });
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

    if (!values.acceptTerms) {
      toast.error("You must accept Privacy Policy and Terms of Use.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      await registerUser(values);

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.", {
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
          bgcolor: "#f8f9fa",
          p: 2,
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
              width: "1200px",
              maxWidth: "100%",
              borderRadius: 4,
              boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
              overflow: "hidden",
              height: "auto",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f8f9fa",
              }}
            >
              <CardMedia
                component="img"
                image={momentImg}
                alt="MomentImg"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxHeight: { xs: "auto", md: "100%" },
                }}
              />
            </Box>
            <Box
              sx={{
                flex: 1.2,
                p: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                bgcolor: "#fff",
              }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={2}
                sx={{ color: "#222" }}
              >
                Create Account
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#38CB89",
                  }}
                >
                  Sign In
                </Link>
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                variant="standard"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Username"
                variant="standard"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                error={Boolean(errors.userName)}
                helperText={errors.userName}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email address"
                variant="standard"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="standard"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                variant="standard"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={handleChange}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree with{" "}
                    <Link
                      sx={{ fontWeight: "bold", color: "#141718" }}
                      component={RouterLink}
                      to="/privacy"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      sx={{ fontWeight: "bold", color: "#141718" }}
                      component={RouterLink}
                      to="/terms"
                    >
                      Terms of Use
                    </Link>
                  </Typography>
                }
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#000",
                  color: "#fff",
                  py: 1.4,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#333" },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
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