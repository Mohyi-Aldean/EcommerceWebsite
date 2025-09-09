import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://kashop1.runasp.net/api/Customer",

});

export default AxiosInstance;