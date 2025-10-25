import React from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { CardContent, CircularProgress, Container } from "@mui/material";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import "swiper/css";
import "swiper/css/navigation";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "12px",
        p: 1.5,
        transition: "all 0.4s ease",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "translateY(-5px)",
        },
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          sx={{ position: "relative", overflow: "hidden", borderRadius: "8px" }}
        >
          <CardMedia
            component="img"
            height="250"
            image={product.mainImageUrl || "https://via.placeholder.com/300"}
            alt={product.name}
            sx={{
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: "16px 0 0" }}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            {product.categoryName || "Category"}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Typography variant="body1" fontWeight={700} color="primary.main">
              ${product.price}
            </Typography>
            <Rating
              name="read-only"
              value={product.rating || 4.5}
              precision={0.5}
              readOnly
              size="small"
            />
          </Box>
        </CardContent>
      </Link>

      <Box sx={{ mt: 1, mb: 1.5, textAlign: "center" }}>
        <IconButton
          color="primary"
          sx={{
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
          }}
          onClick={() => console.log(`Adding ${product.id} to cart`)}
        >
          <ShoppingBagOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default function Products() {
  const FetchProducts = async () => {
    const response = await AxiosInstance.get(`/Customer/Products`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: FetchProducts,
    staleTime: 5 * 60 * 1000,
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
          Error: {error.message || "Failed to load products."}
        </Typography>
      </Box>
    );
  }

  const productsToDisplay = Array.isArray(data) ? data : [];

  if (productsToDisplay.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          No products available at the moment.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" textAlign="center" mb={6}>
        Trending Products
      </Typography>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        breakpoints={{
          300: { slidesPerView: 1.5, spaceBetween: 15 },
          600: { slidesPerView: 2, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 25 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        navigation={true}
        style={{ paddingBottom: "10px" }}
      >
        {productsToDisplay.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
