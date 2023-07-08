import { setCookie } from "cookies-next";
import { LoginUser, RegisterUser } from "@/models/auth";
import axios from "axios";
import { json } from "stream/consumers";

export const authApi = {
  register: async (registerUser: RegisterUser) => {
    try {
      const res = await axios.post(
        "https://tastingcuisine.kien2572001.tech/api/user/register",
        registerUser
      );
      return res.data;
    } catch (err) { }
    return 0;
  },
  login: async (userLogin: LoginUser) => {
    const REFRESH_TOKEN_EXPIRES_IN =
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN;
    try {
      const res = await axios.post(
        "https://tastingcuisine.kien2572001.tech/api/user/login",
        userLogin
      );
      if (res && res.data) {
        localStorage.setItem("userName", res.data.user.name)
        localStorage.setItem("userAvatar", res.data.user.avatar)
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userEmail", res.data.user.email)
      }
      return 1;
    } catch (error) { }
    return 0;
  },
  refreshToken: async () => {
    try {
      const res = await axios.post(
        "https://tastingcuisine.kien2572001.tech/api/user/refresh-token",
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
