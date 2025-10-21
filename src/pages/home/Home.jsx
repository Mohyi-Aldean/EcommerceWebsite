import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Box, Typography, Button } from "@mui/material";
import AccessoriesImg from "../../assets/images/furniture.jpg";
import ClothesImg from "../../assets/images/clothes.jpg";
import PhoneImg from "../../assets/images/sport.jpg";
import ElectronicImg from "../../assets/images/technology.jpg";
import i18n from "../../i18n.jsx";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Brands from "../../components/brands/Brands";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";

export default function Home() {
  const slidesContent = [
    {
      img: ElectronicImg,
      titlePre: "Listen to the",
      titleHighlight: "amazing",
      titlePost: "music sound.",
      desc: "Experience music like never before",
      btnText: "Shopping Now",
      btnColor: "#0B132B",
      position: "left",
      top: "50%",
      maxWidth: 520,
      align: "left",
    },
    {
      img: ClothesImg,
      titlePre: "Bring the",
      titleHighlight: "warmth.",
      desc: "Everyone needs a good winter jacket. Find yours with our collection and more.",
      btnText: "Shopping Now",
      btnColor: "#2B7BE4",
      position: "right",
      top: "50%",
      maxWidth: 460,
      align: "right",
    },
    {
      img: PhoneImg,
      titlePre: "Discover the",
      titleHighlight: "future",
      titlePost: "technology today",
      desc: "Upgrade your life with smart devices and gadgets.",
      btnText: "Shop Now",
      btnColor: "#8A2BE2",
      position: "center",
      top: "48%",
      maxWidth: 640,
      align: "center",
    },
    {
      img: AccessoriesImg,
      position: "left",
      top: "52%",
      maxWidth: 540,
      align: "left",
    },
  ];

  const [dir, setDir] = useState(i18n.language === "AR" ? "rtl" : "ltr");

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setDir(lng === "AR" ? "rtl" : "ltr");
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const computePosition = (pos, top) => {
    if (pos === "center") {
      return { left: "50%", transform: "translate(-50%, -50%)", top };
    }
    if (pos === "left") {
      return { left: "6%", transform: "translateY(-50%)", top };
    }
    if (pos === "right") {
      return { right: "6%", transform: "translateY(-50%)", top };
    }
  };

  const overlayGradient = (pos) => {
    if (pos === "center") {
      return {
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.2))",
      };
    }
    if (pos === "left") {
      return {
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0) 100%)",
      };
    }
    if (pos === "right") {
      return {
        background:
          "linear-gradient(270deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0) 100%)",
      };
    }
  };

  return (
    <>
      <Swiper
        key={dir}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        speed={1000}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, Pagination, EffectFade]}
        style={{
          "--swiper-pagination-color": "rgba(255,255,255,0.9)",
          "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.4)",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-pagination-bottom": "20px",
        }}
        dir={dir}
      >
        {slidesContent.map((slide, index) => {
          const posStyle = computePosition(slide.position, slide.top);
          const gradStyle = overlayGradient(slide.position);
          return (
            <SwiperSlide key={index} style={{ position: "relative" }}>
              <Box
                component="img"
                src={slide.img}
                alt={`SlideImg ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "90vh",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                  zIndex: 1,
                  ...gradStyle,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  color: "#fff",
                  maxWidth: slide.maxWidth,
                  ...posStyle,
                  textAlign: slide.align,
                  transition: "all 0.6s ease",
                  direction: dir,
                }}
              >
                {slide.titlePre && (
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.05,
                      mb: 1,
                      fontSize: { xs: "1.6rem", sm: "2.6rem", md: "3.6rem" },
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <span style={{ opacity: 0.95 }}>{slide.titlePre} </span>
                    {slide.titleHighlight && (
                      <span style={{ color: slide.btnColor, marginLeft: 6 }}>
                        {slide.titleHighlight}
                      </span>
                    )}
                    <span style={{ marginLeft: 6 }}>{slide.titlePost}</span>
                  </Typography>
                )}

                {slide.desc && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                      opacity: 0.95,
                    }}
                  >
                    {slide.desc}
                  </Typography>
                )}

                {slide.btnText && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: slide.btnColor,
                      color: "#fff",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "30px",
                      "&:hover": {
                        opacity: 0.92,
                        backgroundColor: slide.btnColor,
                      },
                    }}
                  >
                    {slide.btnText}
                  </Button>
                )}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Brands />
      <Categories />
      <Products />
    </>
  );
}
