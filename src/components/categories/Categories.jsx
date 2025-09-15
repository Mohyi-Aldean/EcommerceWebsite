import React from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { CardContent, CircularProgress } from "@mui/material";
import { Box, Grid, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
 const FetchBrands = async () => {
    const response = await AxiosInstance.get(`/Customer/Brands`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: FetchBrands,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
    <Box py={3}>
      <Typography variant="h2" component="h2">
        Categories
      </Typography>
      <Grid container spacing={1.5} mt={5}>
        {data.map((category) => (
          <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 5, borderRadius: 5, p: 1 }}>
              <CardContent>
                <Typography align="center" variant="h6" component="h3" mt={1}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
