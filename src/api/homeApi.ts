import axiosJWT from "./axiosJWT";
import axios from "axios";
import { Restaurant, Food } from "../models/home";

const BASE_URL = "https://localhost:3008/api";

const homeApi = {
  getRestaurantsAll: async (): Promise<Restaurant[]> => {
    try {
      const res = await axiosJWT.get(`${BASE_URL}/restaurant/all`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getFoodAll: async (): Promise<Food[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/food/all`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default homeApi;
