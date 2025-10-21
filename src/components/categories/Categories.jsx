import React from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import { CardContent, CircularProgress, Container } from '@mui/material';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import 'swiper/css';
import 'swiper/css/pagination';

// ... (مكون HoverCard لم يتغير)

const HoverCard = ({ category }) => {
  const theme = useTheme();
  return (
    <Link to={`/products?category=${category.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'transform 0.4s, box-shadow 0.4s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.03)', 
            boxShadow: theme.shadows[10], 
          },
          height: 250,
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          image={category.mainImageUrl || 'https://via.placeholder.com/400'}
          alt={category.name}
          sx={{
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <CardContent
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {category.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, borderBottom: '2px solid white', pb: 0.5 }}>
            Shop Now
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Categories() {
  // ✅ إصلاح بسيط لـ endpoint: إزالة المسافة الزائدة
  const FetchCategories = async () => {
    const response = await AxiosInstance.get(`/Customer/Categories`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: FetchCategories,
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
          Error: {error.message || "Failed to load categories."}
        </Typography>
      </Box>
    );
  }
    
  // 💡 نقطة الإصلاح الرئيسية: التأكد من أن data مصفوفة قبل استخدامها
  const categoriesToDisplay = Array.isArray(data) ? data : []; 
  
  if (categoriesToDisplay.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
            No categories available at the moment.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" textAlign="center" mb={6} fontWeight={700}>
        Shop by Categories
      </Typography>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        breakpoints={{
          300: { slidesPerView: 1.2, spaceBetween: 10 },
          600: { slidesPerView: 2.5, spaceBetween: 15 },
          900: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: '40px' }}
      >
        {categoriesToDisplay.map((category) => (
          <SwiperSlide key={category.id}>
            <HoverCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}