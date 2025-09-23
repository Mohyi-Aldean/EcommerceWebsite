import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContextProvider from "./theme/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import './i18n.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <ToastContainer />
    <App />
  </ThemeContextProvider>
);