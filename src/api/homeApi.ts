import axiosJWT from "./axiosJWT";
import axios from "axios";
import { Restaurant, Food } from "../models/home";


const homeApi = {
  getRestaurantsAll: async (): Promise<Restaurant[]> => {
    try {
      const res = await axios.get(`http://localhost:3008/api/restaurant/all`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getFoodAll: async (): Promise<Food[]> => {
    try {
      const response = await axios.get(`http://localhost:3008/api/food/filter`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default homeApi;
