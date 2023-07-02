import axiosJWT from "./axiosJWT";
import axios from "axios";
import { User } from "@/models/user";

const refreshToken = localStorage.getItem('refreshToken');

const userApi = {
    getAllUsers: async () => {
        try {
            const headers = {
                Authorization: `Bearer ${refreshToken}`
            };
            const response = await axios.get("http://localhost:3008/api/user/admin/all", { headers });
            const userData = response.data.users.map((user: any, index: number) => ({
                key: String(index + 1),
                ID: user.id,
                username: user.name,
                email: user.email,
            }));
            return userData;
        } catch (err) {
            throw err;
        }
    },

    searchUserByName: async (query: any): Promise<{ users: User[] }> => {
        try {
            const headers = {
                Authorization: `Bearer ${refreshToken}`
            };
            const response = await axios.get("http://localhost:3008/api/user/admin/search", {
                params: { name: query },
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default userApi;
