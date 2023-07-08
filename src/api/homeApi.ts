import axios from "axios";
import { Restaurant, Food } from "../models/home";

const homeApi = {
  getRestaurantsAll: async (): Promise<{ restaurants: Restaurant[] }> => {
    try {
      const res = await axios.get(
        `https://tastingcuisine.kien2572001.tech/api/restaurants/all`
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getFoodAll: async (): Promise<{ foods: Food[] }> => {
    try {
      const response = await axios.get(
        `https://tastingcuisine.kien2572001.tech/api/foods/all`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  searchByKeyword: async (
    keyword: string
  ): Promise<{ restaurant: Restaurant[]; food: Food[] }> => {
    try {
      const response = await axios.get(
        `https://tastingcuisine.kien2572001.tech/api/search`,
        {
          params: {
            keyword: keyword,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default homeApi;
