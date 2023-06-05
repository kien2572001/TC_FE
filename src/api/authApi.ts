import { setCookie } from "cookies-next";
import { LoginUser, RegisterUser } from "@/models/auth";
import axios from "axios";

export const authApi = {
  register: async (registerUser: RegisterUser) => {
    try {
      const res = await axios.post(
        "http://localhost:3008/api/user/register",
        registerUser
      );
      return res.data;
    } catch (err) {}
    return 0;
  },
  login: async (userLogin: LoginUser) => {
    const REFRESH_TOKEN_EXPIRES_IN =
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN;
    try {
      const res = await axios.post(
        "http://localhost:3008/api/user/login",
        userLogin
      );
      if (res && res.data) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }
      return 1;
    } catch (error) {}
    return 0;
  },
  refreshToken: async () => {
    try {
      const res = await axios.post(
        "http://localhost:3008/api/user/refresh-token",
        {
          refreshToken: localStorage.getItem("refreshToken"),
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return 0;
  },
};
