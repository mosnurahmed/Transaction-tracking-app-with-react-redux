import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://transaction01.herokuapp.com",
});
export default axiosInstance;
