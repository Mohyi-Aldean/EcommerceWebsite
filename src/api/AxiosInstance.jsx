import axios from "axios";

const token = localStorage.getItem("token");
const AxiosInstance = axios.create({
  baseURL: "https://kashop1.runasp.net/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default AxiosInstance;