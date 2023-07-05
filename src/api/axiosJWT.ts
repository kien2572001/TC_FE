/* eslint-disable no-param-reassign */
import axios from "axios";
import jwt_decode from "jwt-decode";
import { authApi } from "./authApi";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config: any) => {
    const date = new Date();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken: any = jwt_decode(accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await authApi.refreshToken();
        config.headers.authorization = `Bearer ${data.accessToken}`;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        config.headers.authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
