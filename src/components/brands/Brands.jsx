import React from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import { Box, Grid, Card, CardMedia, Typography, CircularProgress, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const BrandCard = ({ brand }) => {
  const theme = useTheme();
  // ... (BrandCard component is unchanged)
  return (
    <Link to={`/products?brand=${brand.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          borderRadius: '12px',
          p: 3,
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          backgroundColor: theme.palette.background.paper,
          '&:hover': {
            boxShadow: theme.shadows[8],
            transform: 'translateY(-3px)',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.primary.light,
          },
        }}
      >
        <CardMedia
          component="img"
          image={brand.mainImageUrl || 'https://via.placeholder.com/150x50?text=Brand+Logo'}
          alt={brand.name}
          sx={{
            height: 50,
            width: '80%',
            objectFit: 'contain',
            mb: 2,
            opacity: 0.8,
            transition: 'opacity 0.3s',
            '&:hover': {
                opacity: 1,
            }
          }}
        />
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {brand.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View Products
        </Typography>
      </Card>
    </Link>
  );
};

export default function Brands() {
  const FetchBrands = async () => {
    const response = await AxiosInstance.get(`/Customer/Brands`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: FetchBrands,
    staleTime: 5 * 60 * 1000,
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
          Error: {error.message || "Failed to load brands."}
        </Typography>
      </Box>
    );
  }

  // 💡 نقطة الإصلاح الرئيسية: التأكد من أن data مصفوفة قبل استخدامها
  const brandsToDisplay = Array.isArray(data) ? data : [];
  
  if (brandsToDisplay.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
            No brands available at the moment.
        </Typography>
      </Container>
    );
  }
    
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" textAlign="center" mb={6} fontWeight={700}>
        Shop by Top Brands
      </Typography>
      <Grid container spacing={3}>
        {brandsToDisplay.map((brand) => (
          <Grid key={brand.id} item xs={6} sm={4} md={3} lg={2.4}>
            <BrandCard brand={brand} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}