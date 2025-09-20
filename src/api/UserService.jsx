import AxiosInstance from "./AxiosInstance";
import AxiosUserInstance from "./AxiosUserInstance";

export const loginUser = (email, password) => {
  return AxiosInstance.post("/Identity/Account/Login", { email, password });
};

export const registerUser = (userData) => {
  return AxiosInstance.post("/Identity/Account/Register", userData);
};

export const getUserProfile = () => {
  return AxiosUserInstance.get("/Profile");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const forgotPassword = (email) => {
  return AxiosInstance.post("/Identity/Account/forgot-password", { email });
};

export const resetPassword = (data) => {
  return AxiosInstance.post("/Identity/Account/reset-password", data);
};

export const verifyCode = (code) => {
  return AxiosInstance.post("/Identity/Account/verify-code", { code });
};
