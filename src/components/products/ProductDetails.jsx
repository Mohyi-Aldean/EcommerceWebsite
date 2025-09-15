import React from 'react';
import AxiosUserInstance from "../../api/AxiosUserInstanse";
import AxiosInstance from "../../api/AxiosInstance";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function ProductsDetails() {
  const { id } = useParams();

  const FetchProductDetails = async () => {
    const response = await AxiosInstance.get(`/Customer/Products/${id}`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: FetchProductDetails,
    staleTime: 5 * 60 * 1000,
  });

const addToCart = async (id) => {
  try {
    const response = await AxiosUserInstance.post(`/Customer/Carts`, { productId: id });
    console.log(response.data);
    alert("✅ " + response.data.message);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("❌ Failed to add product to cart.");
  }
};

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box py={3} px={2}>
      <Typography variant="h2" component="h2" gutterBottom>
        {data.name}
      </Typography>
      <Box
        component="img"
        src={data.mainImageUrl}
        alt={data.name}
        sx={{
          width: "100%",
          maxWidth: 600,
          height: "100vh",
          objectFit: "cover",
          borderRadius: 2,
          boxShadow: 3,
          mb: 3,
        }}
      />
      <Typography variant="h5" component="h5" gutterBottom>
        Price: ${data.price.toFixed(2)}
      </Typography>
      <Typography variant="body1" component="p">
        {data.description}
      </Typography>

      <Button variant="contained" color="primary" onClick={() => addToCart(data.id)}>
        Add to Cart
      </Button>
    </Box>
  );
}
