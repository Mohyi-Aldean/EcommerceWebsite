import React from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { CardContent, CircularProgress } from "@mui/material";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Products() {
  const FetchProducts = async () => {
    const response = await AxiosInstance.get(`/Customer/Products`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: FetchProducts,
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

  return (
    <Box py={3}>
      <Typography variant="h2" component="h2">
        Products
      </Typography>
      <Grid container spacing={1.5} mt={5}>
        {data.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ boxShadow: 5, borderRadius: 5, p: 1 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.mainImageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography align="center" variant="h6" component="h3" mt={1}>
                    {product.name}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                    component="p"
                    mt={1}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
