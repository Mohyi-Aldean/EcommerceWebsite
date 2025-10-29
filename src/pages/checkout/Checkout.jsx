import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import AxiosUserInstance from "../../api/AxiosUserInstance";
import { motion } from "framer-motion";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await AxiosUserInstance.get(
          "/Customer/CheckOut/payment"
        );
        if (response?.data) {
          setCartItems(response.data.items || []);
          setTotal(response.data.total || 0);
        }
      } catch (err) {
        console.error("Error fetching checkout data:", err);
        setError("An error occurred while loading your cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePayment = async () => {
    try {
      setPaying(true);
      const response = await AxiosUserInstance.post(
        "/Customer/CheckOut/payment"
      );
      if (response.status === 200 || response.status === 201) {
        alert("✅ Payment successful!");
        setCartItems([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setPaying(false);
      setOpenModal(false);
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        maxWidth: "850px",
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          backgroundClip: "text",
          color: "transparent",
          mb: 2,
        }}
      >
        Checkout
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {cartItems.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                p: 2,
                borderRadius: "14px",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transform: "translateY(-3px)",
                },
              }}
              component={motion.div}
              whileHover={{ scale: 1.01 }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    width="70"
                    height="70"
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Box>
                  <Typography fontWeight="bold" variant="subtitle1">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity || 1}
                  </Typography>
                </Box>
              </Box>
              <Typography
                fontWeight="bold"
                color="primary.main"
                variant="subtitle1"
              >
                ${item.price?.toFixed(2) || "0.00"}
              </Typography>
            </Paper>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.main"
              sx={{
                background: "linear-gradient(90deg, #42a5f5, #1976d2)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => setOpenModal(true)}
            sx={{
              borderRadius: "12px",
              py: 1.5,
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0, #2196f3)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Proceed to Payment
          </Button>
        </>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: "16px",
              boxShadow: 24,
              p: 4,
              width: "95%",
              maxWidth: 480,
              textAlign: "center",
            }}
            component={motion.div}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Order Summary
            </Typography>

            <Box
              sx={{
                maxHeight: 200,
                overflowY: "auto",
                mb: 2,
                px: 1,
              }}
            >
              {cartItems.map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    p: 1.5,
                    borderRadius: "10px",
                    bgcolor: "#f9f9f9",
                  }}
                >
                  <Typography fontWeight="600" fontSize="0.95rem">
                    {item.name}
                  </Typography>
                  <Typography fontSize="0.9rem" color="text.secondary">
                    x{item.quantity || 1}
                  </Typography>
                  <Typography fontWeight="bold" color="primary.main">
                    ${item.price?.toFixed(2) || "0.00"}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" mb={3}>
              Total:{" "}
              <strong style={{ color: "#1976d2" }}>${total.toFixed(2)}</strong>
            </Typography>

            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpenModal(false)}
                sx={{ borderRadius: "10px", px: 3 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                disabled={paying}
                sx={{
                  borderRadius: "10px",
                  px: 3,
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                }}
              >
                {paying ? "Processing..." : "Confirm Payment"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Checkout;
