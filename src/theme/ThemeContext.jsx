import React, { createContext, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme"; 

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const storedMode = localStorage.getItem("theme_mode") || "light";
  const [mode, setMode] = useState(storedMode);

  const currentTheme = theme(mode);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme_mode", newMode); 
      return newMode;
    });
  };
  
  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);


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