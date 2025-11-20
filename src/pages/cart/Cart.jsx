import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AxiosUserInstance from "../../api/AxiosUserInstance";
import AxiosInstance from "../../api/AxiosInstance";

export default function Cart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const FetchCart = async () => {
    const response = await AxiosInstance.get(`/Customer/Carts`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: FetchCart,
    staleTime: 5 * 60 * 1000,
  });

  const refetchCart = () => queryClient.invalidateQueries(["cart"]);

  const removeItem = async (productId) => {
    try {
      await AxiosUserInstance.delete(`/Customer/Carts/${productId}`);
      refetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const clearCart = async () => {
    try {
      await AxiosUserInstance.delete(`/Customer/Carts/clear`);
      refetchCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const incrementItem = async (productId) => {
    try {
      await AxiosUserInstance.post(`/Customer/Carts/increment/${productId}`, {});
      refetchCart();
    } catch (error) {
      console.error("Failed to increment item:", error);
    }
  };

  const decrementItem = async (productId) => {
    try {
      await AxiosUserInstance.post(`/Customer/Carts/decrement/${productId}`, {});
      refetchCart();
    } catch (error) {
      console.error("Failed to decrement item:", error);
    }
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Box>
    );

  if (!data?.items?.length)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h5" fontWeight="600" mb={2}>
          🛒 Your cart is empty
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/products")}>
          Go Shopping
        </Button>
      </Box>
    );

  return (
    <Box maxWidth="lg" mx="auto" py={5} px={2}>
      <Typography variant="h4" fontWeight="700" textAlign="center" mb={4}>
        Your Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {data.items.map((item) => (
          <Grid item xs={12} key={item.productId}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                p: 2,
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CardMedia
                  component="img"
                  image={item.imageUrl || "https://via.placeholder.com/80"}
                  alt={item.productName}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => decrementItem(item.productId)}>
                  <Remove />
                </IconButton>
                <Typography>{item.count}</Typography>
                <IconButton onClick={() => incrementItem(item.productId)}>
                  <Add />
                </IconButton>
              </Box>

              <Typography variant="h6" fontWeight="500">
                ${item.totalPrice.toFixed(2)}
              </Typography>

              <IconButton color="error" onClick={() => removeItem(item.productId)}>
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Button variant="outlined" color="error" onClick={clearCart}>
          Clear Cart
        </Button>

        <Typography variant="h5" fontWeight="700">
          Total: ${data.cartTotal.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
}