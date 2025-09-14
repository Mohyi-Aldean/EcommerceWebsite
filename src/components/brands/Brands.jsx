import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import {
Box,
Grid, 
Card,
CardMedia,
CardContent,
} from '@mui/material';
import { CircularProgress, Typography } from '@mui/material';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBrands = async () => {
    try {
      const response = await AxiosInstance.get(`/Customer/Brands`);
      //console.log(response);
      setBrands(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) return <p> <CircularProgress/> Loading...</p>;

  return (
    <Box py={3}>
      <Typography variant='h2' component="h2" mt={3}>Brands</Typography>
      <Grid container spacing={2} mt={5}>
        {brands.map((brand, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>

            <Card sx={{boxShadow: 4, borderRadius: 40, p: 3}}>
                <CardMedia component="img" height="80" image={brand.mainImageUrl} alt={brand.name} />
            </Card>
             <Typography align='center' variant='p' component="h4" mt={1}>
              {brand.name} 
             </Typography>
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}
