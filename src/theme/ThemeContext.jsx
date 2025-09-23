import React, { createContext, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const currentTheme = theme(mode);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode); // حفظ الوضع الجديد
      return newMode;
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;