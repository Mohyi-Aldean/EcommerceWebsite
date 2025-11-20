import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  IconButton,
  Button,
} from "@mui/material";
import AxiosInstance from "../../api/AxiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import CloseIcon from "@mui/icons-material/Close";
import "@fontsource/roboto/700.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
    total: 0,
    currentPage: 1,
  });

  useEffect(() => {
    fetchProducts(pagination.skip);
  }, []);

  const fetchProducts = async (skip) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get(
        `/Customer/products?limit=${pagination.limit}&skip=${skip}&sortBy=Price&sortOrder=desc`
      );

      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      const total = res.data.totalCount || data.length;

      setProducts(data);
      setPagination((prev) => ({
        ...prev,
        total,
        skip,
        currentPage: Math.floor(skip / prev.limit) + 1,
      }));
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSlideClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handlePageClick = (pageNumber) => {
    const newSkip = (pageNumber - 1) * pagination.limit;
    fetchProducts(newSkip);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, px: 2 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        fontFamily="'Roboto', sans-serif"
        mb={4}
        textAlign="center"
      >
        All Products
      </Typography>

      <Swiper
        modules={[Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        navigation
        spaceBetween={30}
        style={{ paddingBottom: "50px" }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            style={{ width: 250, cursor: "pointer" }}
            onClick={() => handleSlideClick(product)}
          >
            <Box
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Typography variant="subtitle1" fontWeight={600} mt={1}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

     {/* Pagination numbers */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 1,
    mt: 4,
    mb: {
      xs: 2,
      sm: 3, 
      md: 5, 
      lg: 6,
    },
  }}
>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
    <Button
      key={num}
      variant={num === pagination.currentPage ? "contained" : "outlined"}
      onClick={() => handlePageClick(num)}
    >
      {num}
    </Button>
  ))}
</Box>


      {/* Modal */}
      <Backdrop
        open={modalOpen}
        onClick={handleCloseModal}
        sx={{
          zIndex: 999,
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedProduct && (
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "70%", md: "50%" },
              bgcolor: "#fff",
              borderRadius: 2,
              p: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedProduct.image}
              alt={selectedProduct.name}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Typography variant="h6" fontWeight={700} mt={2}>
              {selectedProduct.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ${selectedProduct.price}
            </Typography>
          </Box>
        )}
      </Backdrop>
    </Box>
  );
}
