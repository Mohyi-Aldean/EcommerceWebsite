import React, { createContext, useState, useEffect } from "react";
// ✅ استبدال createTheme بـ ThemeProvider واستيراد دالة الثيم المخصصة
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme"; // 💡 استيراد الثيم الجديد

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  // استخدام 'userToken' بدلاً من 'theme' في التخزين المحلي، أو التأكد من الاسم الصحيح
  const storedMode = localStorage.getItem("theme_mode") || "light";
  const [mode, setMode] = useState(storedMode);

  // 💡 تمرير الوضع (mode) إلى دالة الثيم المخصصة
  const currentTheme = theme(mode);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme_mode", newMode); // ✅ تحديث اسم المفتاح ليكون واضحاً
      return newMode;
    });
  };
  
  // ✅ تحديث useEffect للتعامل مع المفتاح الجديد عند التحميل الأولي
  useEffect(() => {
    // التأكد من أن localStorage يحتوي على القيمة الصحيحة
    localStorage.setItem("theme_mode", mode);
  }, [mode]);


  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {/* تمرير الثيم المخصص */}
      <ThemeProvider theme={currentTheme}> 
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;