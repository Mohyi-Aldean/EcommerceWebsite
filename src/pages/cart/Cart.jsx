import React from "react";
import AxiosUserInstance from "../../api/AxiosUserInstance";
import AxiosInstance from "../../api/AxiosInstance";

import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  TableBody,
  TableContainer,
  Typography,
  Table,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

export default function Cart() {
  const FetchCart = async () => {
    const response = await AxiosInstance.get(`/Customer/Carts`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: FetchCart,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
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
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const removeItem = async (productId) => {
    try {
      await AxiosUserInstance.delete(`/Customer/Carts/${productId}`);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await AxiosUserInstance.delete(`/Customer/Carts/clear`);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };


  const incremantItem = async (productId) => {
    try {
      await AxiosUserInstance.post(`i/Customer/Carts/increment/${productId}`, {});
       if (response.status == 200) {
    window.location.reload();
  }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const decremantItem = async (productId) => {
    try {
      await AxiosUserInstance.post(`/Customer/Carts/decrement/${productId}`, {});
      if (response.status == 200) {
    window.location.reload();
  }
    } catch (error) {
      console.error("Failed to decrement item in cart:", error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
        <TableBody>
          {data.items.map((item) => (
            <TableRow>
              <TableCell>{item.productName}</TableCell>
              <TableCell>
                  <Button onClick={() => decremantItem(item.productId)}>-</Button>
                {item.count}{" "}
                <Button onClick={() => incremantItem(item.productId)}>+</Button>
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.totalPrice}</TableCell>
              <TableCell>
                <button
                  color="error"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="h6">Total:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">{data.cartTotal}</Typography>
            </TableCell>
            <TableCell />
          </TableRow>

          <TableRow>
            <TableCell colSpan={5} align="right">
              <button variant="contained" color="error" onClick={clearCart}>
                Remove All
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}