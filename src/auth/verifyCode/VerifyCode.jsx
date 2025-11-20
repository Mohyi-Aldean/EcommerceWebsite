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
import { verifyCode } from "../../api/UserService";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      toast.error("Please enter the verification code.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      await verifyCode(code);

      toast.success("Code verified successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid verification code.", {
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
              width: "400px",
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
              Verify Code
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
              textAlign="center"
            >
              Enter the verification code we sent to your email.
            </Typography>

            <TextField
              fullWidth
              label="Verification Code"
              variant="standard"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
                "Verify Code"
              )}
            </Button>
          </Card>
        </motion.div>
      </Box>
      <ToastContainer />
    </>
  );
}
