import axios from "axios";
import { getToken } from "./getToken";

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000,
  withCredentials: false
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = token
      ? {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      : {
          ...config.headers,
        };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
