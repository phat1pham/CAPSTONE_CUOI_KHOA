import axiosClient from "./Axios";
import type { User, ApiResponse } from "../types/room.type";

export const getRoomByLocation = (maViTri: number) => {
  return axiosClient.get(
    `/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
  );
};

// User Services
export const userService = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await axiosClient.post<ApiResponse<any>>('/auth/signin', { email, password });
    return response.data.content;
  },

  register: async (data: Partial<User> & { password: string }): Promise<User> => {
    const response = await axiosClient.post<ApiResponse<User>>('/auth/signup', data);
    return response.data.content!;
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },
};
