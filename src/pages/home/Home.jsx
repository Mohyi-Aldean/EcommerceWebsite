import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";
import AccessoriesImg from "../../assets/images/accessories.jpeg";
import ClothesImg from "../../assets/images/clothes.jpeg";
import PhoneImg from "../../assets/images/phone.jpeg";
import ElectronicImg from "../../assets/images/electronic.jpeg";

import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const images = [ElectronicImg, AccessoriesImg, ClothesImg, PhoneImg];

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      speed={1000}
      modules={[Autoplay, Pagination]}
      style={{
        "--swiper-pagination-color": "rgba(255,255,255,0.9)",
        "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.4)",
        "--swiper-pagination-bullet-inactive-opacity": "0.3",
        "--swiper-pagination-bullet-size": "8px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "--swiper-pagination-bottom": "20px",
      }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Box
            component="img"
            src={img}
            alt={`SlideImg ${index + 1}`}
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              transition: "transform 0.8s ease-in-out",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
