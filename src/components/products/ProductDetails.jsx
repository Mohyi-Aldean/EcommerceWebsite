import React from 'react';
import AxiosUserInstance from "../../api/AxiosUserInstance";
import AxiosInstance from "../../api/AxiosInstance";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Button, Container, Grid, Rating, Divider, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useQuery } from "@tanstack/react-query";
import { useTheme } from '@mui/material/styles';

export default function ProductsDetails() {
  const { id } = useParams();
  const theme = useTheme();

  const FetchProductDetails = async () => {
    const response = await AxiosInstance.get(`/Customer/Products/${id}`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: FetchProductDetails,
    staleTime: 5 * 60 * 1000,
  });

  const addToCart = async (productId) => {
    try {
      // ✅ يجب أن تستخدم AxiosUserInstance هنا بما أنها تتطلب Token للمستخدم
      const response = await AxiosUserInstance.post(`/Customer/Carts`, { productId });
      console.log("Product added to cart:", response.data);
      alert("✅ " + response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("❌ Failed to add product to cart. Please log in.");
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

  // ✅ استخدام Container لتحديد حجم المحتوى
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* العمود الأيسر: الصورة */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={data.mainImageUrl || 'https://via.placeholder.com/600'}
            alt={data.name}
            sx={{
              width: "100%",
              height: { xs: 300, md: 550 },
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: theme.shadows[4],
            }}
          />
        </Grid>

        {/* العمود الأيمن: التفاصيل */}
        <Grid item xs={12} md={6} sx={{ p: { md: 4 } }}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            {data.name}
          </Typography>

          {/* التقييم */}
          <Box display="flex" alignItems="center" mb={2}>
            <Rating name="read-only" value={data.rating || 4.5} precision={0.5} readOnly size="medium" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              (24 Reviews)
            </Typography>
          </Box>
          
          <Typography variant="h4" component="p" color="primary.main" fontWeight={700} mb={3}>
            ${data.price}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* الوصف */}
          <Typography variant="body1" color="text.secondary" mb={4} lineHeight={1.8}>
            {data.description || "A wonderful and high-quality product, designed for comfort and durability. Perfect for all seasons."}
          </Typography>
          
          {/* الأزرار الرئيسية */}
          <Box display="flex" gap={2}>
            {/* زر الإضافة إلى السلة */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={() => addToCart(data.id)}
              sx={{
                flexGrow: 1,
                py: 1.5,
                borderRadius: '30px',
              }}
            >
              Add to Cart
            </Button>
            
            {/* زر الإضافة للمفضلة */}
            <IconButton
              sx={{
                borderRadius: '30px',
                border: `1px solid ${theme.palette.divider}`,
                p: 1.5,
                transition: 'all 0.3s',
                // 💡 تأثير Hover: تغيير خلفية الزر
                '&:hover': {
                    bgcolor: theme.palette.action.hover,
                }
              }}
            >
              <FavoriteBorderIcon color="primary" />
            </IconButton>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* معلومات إضافية */}
          <Box>
            <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight={600} color="text.primary">Category:</Typography> {data.categoryName || 'Furniture'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight={600} color="text.primary">Brand:</Typography> {data.brandName || 'Modern Brand'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      {/* يمكن إضافة قسم للمنتجات المشابهة هنا */}
      {/* <Box mt={6}><SimilarProducts productId={data.id} /></Box> */}
    </Container>
  );
}