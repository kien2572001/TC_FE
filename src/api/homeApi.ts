import axios from "@/api/axiosJWT";
import { Restaurant, Food } from "../models/home";


const homeApi = {
  getRestaurantsAll: async (): Promise<{ restaurants: Restaurant[] }> => {
    try {
      const res = await axios.get(`http://localhost:3008/api/restaurants/all`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  getFoodAll: async (): Promise<{ foods: Food[] }> => {
    try {
      const response = await axios.get(`http://localhost:3008/api/foods/all`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  searchByKeyword: async (keyword: string): Promise<{ restaurant: Restaurant[]; food: Food[] }> => {
    try {
      const response = await axios.get(`http://localhost:3008/api/search`, {
        params: {
          keyword: keyword
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};

export default homeApi;
