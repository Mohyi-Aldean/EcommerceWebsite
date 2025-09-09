import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/UserService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ استخدام الدالة من UserService.jsx
      await forgotPassword(email);

      toast.success("Verification code sent to your email!", {
        position: "top-right",
        autoClose: 4000,
      });

      setTimeout(() => navigate("/reset-password"), 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.", {
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
              Forgot Password
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
              textAlign="center"
            >
              Enter your registered email address and we’ll send you a
              verification code.
            </Typography>

            <TextField
              fullWidth
              label="Email address"
              variant="standard"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
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
                "Send Code"
              )}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={3}
              textAlign="center"
            >
              Remember your password?{" "}
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#38CB89",
                  textTransform: "none",
                  p: 0,
                  minWidth: "auto",
                }}
              >
                Sign In
              </Button>
            </Typography>
          </Card>
        </motion.div>
      </Box>

      <ToastContainer />
    </>
  );
}
