import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";
import AccessoriesImg from "../../assets/images/furniture.jpg";
import ClothesImg from "../../assets/images/clothes.jpg";
import PhoneImg from "../../assets/images/sport.jpg";
import ElectronicImg from "../../assets/images/technology.jpg";
import i18n from "../../i18n.jsx";

import "swiper/css";
import "swiper/css/pagination";
import Brands from "../../components/brands/Brands";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";

export default function Home() {
  const images = [ElectronicImg, AccessoriesImg, ClothesImg, PhoneImg];
  const [dir, setDir] = useState(i18n.language === "AR" ? "rtl" : "ltr");

  useEffect(() => {
    const handleLanguageChange = () => setDir(i18n.language === "AR" ? "rtl" : "ltr");
    window.addEventListener("languageChanged", handleLanguageChange);
    return () => window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        speed={1000}
        modules={[Autoplay, Pagination]}
        style={{
          "--swiper-pagination-color": "rgba(255,255,255,0.9)",
          "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.4)",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-pagination-bottom": "20px",
          direction: dir,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} style={{ direction: dir }}>
            <Box component="img" src={img} alt={`SlideImg ${index + 1}`} sx={{ width: "100%", height: "100vh", objectFit: "cover", transition: "transform 0.8s ease-in-out" }} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Brands />
      <Categories />
      <Products />
    </>
  );
}