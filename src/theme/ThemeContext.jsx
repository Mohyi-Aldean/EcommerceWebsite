import React, { createContext, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const currentTheme = theme(mode);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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