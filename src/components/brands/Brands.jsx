import AxiosInstance from "../../api/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Card, CardMedia, Typography, CircularProgress } from "@mui/material";

export default function Brands() {
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
      <Typography variant="h2" component="h2" mt={3}>
        Brands
      </Typography>
      <Grid container spacing={2} mt={5}>
        {data.map((brand) => (
          <Grid key={brand.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 4, borderRadius: 4, p: 3 }}>
              <CardMedia
                component="img"
                height="80"
                image={brand.mainImageUrl}
                alt={brand.name}
              />
            </Card>
            <Typography align="center" variant="body1" component="h4" mt={1}>
              {brand.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}