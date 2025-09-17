import React from "react";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
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
      await AxiosUserInstanse.delete(`/Customer/Carts/${productId}`);
     
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await AxiosUserInstanse.delete(`/Customer/Carts/clear`);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (response.status == 200) {
    window.location.reload();
  }

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
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.totalPrice}</TableCell>
              <TableCell>
                <button color="error" onClick={() => removeItem(item.productId)}>Remove</button>
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
