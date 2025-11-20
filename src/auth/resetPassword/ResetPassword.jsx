import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/UserService";

export default function ResetPassword() {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.newPassword || !values.confirmPassword) {
      toast.error("Please fill all fields.", { position: "top-right" });
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match.", { position: "top-right" });
      return;
    }

    try {
      setLoading(true);

      await resetPassword({ newPassword: values.newPassword });

      toast.success("Password has been reset successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.", {
        position: "top-right",
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
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              width: "500px",
              borderRadius: 4,
              boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
              p: 5,
              bgcolor: "#fff",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#222", textAlign: "center" }}
            >
              Reset Password
            </Typography>

            <TextField
              fullWidth
              label="New Password"
              variant="standard"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={values.newPassword}
              onChange={handleChange}
              margin="normal"
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
            <TextField
              fullWidth
              label="Confirm Password"
              variant="standard"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#000",
                color: "#fff",
                py: 1.2,
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
                "Reset Password"
              )}
            </Button>
          </Card>
        </motion.div>
      </Box>

      <ToastContainer />
    </>
  );
}
