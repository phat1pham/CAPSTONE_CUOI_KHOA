import axiosClient from "./Axios";
import type { User, ApiResponse, RoomList } from "../types/type";

// User Services
export const userService = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> => {
    const response = await axiosClient.post<ApiResponse<any>>("/auth/signin", {
      email,
      password,
    });
    return response.data.content;
  },

  register: async (
    data: Partial<User> & { password: string },
  ): Promise<User> => {
    const response = await axiosClient.post<ApiResponse<User>>(
      "/auth/signup",
      data,
    );
    return response.data.content!;
  },
  getUserProfile: async (userId: string): Promise<User> => {
    const response = await axiosClient.get<ApiResponse<User>>(
      `/users/${userId}`,
    );
    return response.data.content!;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosClient.put<ApiResponse<User>>(
      `/users/${data.id}`,
      data,
    );
    return response.data.content!;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },
};

export const roomService = {
  getAllRooms: async (params?: any): Promise<RoomList[]> => {
    const response = await axiosClient.get<ApiResponse<RoomList[]>>(
      "/vi-tri/phan-trang-tim-kiem",
      {
        params: {
          pageIndex: 1,
          pageSize: 8,
        },
      },
    );
    return response.data.content || [];
  },
};

export const getUserPagination = (page: number, keyword: string = "") => {
  return axiosClient.get<ApiResponse<Pagination<User>>>(
    "/users/phan-trang-tim-kiem",
    {
      params: {
        pageIndex: page,
        pageSize: 10,
        keyword: keyword,
      },
    },
  );
};
