import axiosJWT from "./axiosJWT";
import axios from "axios";
import { Restaurant, Food } from "../models/home";


const homeApi = {
  getRestaurantsAll: async (): Promise<Restaurant[]> => {
    try {
      const res = await axios.get(`http://localhost:3008/api/restaurants/all`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getFoodAll: async (): Promise<Food[]> => {
    try {
      const response = await axios.get(`http://localhost:3008/api/foods/all`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRestaurantsOrFoodsByKeyword: async (keyword: string): Promise<Restaurant[]> => {
    try {
      const res = await axios.get('http://localhost:3008/api/search', {
        params: {
          keyword: keyword
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default homeApi;
