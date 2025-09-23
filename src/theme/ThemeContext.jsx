import React, { createContext, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const storedMode = localStorage.getItem("theme") || "light";
  const [mode, setMode] = useState(storedMode);

  const currentTheme = createTheme({ palette: { mode } });

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

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