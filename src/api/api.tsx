import axiosClient from "./Axios";
import type { User, ApiResponse } from "../types/type";
import type { Pagination, CreateAdminPayload } from "../types/api.type";
import type { Room } from "../types/room.type";

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
  getUserProfile: async (userId: number): Promise<User> => {
    const response = await axiosClient.get<ApiResponse<User>>(
      `/users/${userId}`,
    );
    return response.data.content!;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosClient.put<ApiResponse<User>>(
      `/users/${data.id}`,
      data
    );
    return response.data.content!;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },
};

export const roomService = {
  getAllRooms: async (): Promise<Room[]> => {
    const response = await axiosClient.get<
      ApiResponse<{
        data: Room[];
      }>
    >(
      "/phong-thue/phan-trang-tim-kiem",
      {
        params: {
          pageIndex: 1,
          pageSize: 8,
        },
      }
    );

    return response.data.content?.data || [];
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

export const createAdmin = (data: CreateAdminPayload) => {
  return axiosClient.post("/users", {
    ...data,
    role: "ADMIN",
  });
};

export const deleteUser = (id: number) => {
  return axiosClient.delete(`/users?id=${id}`);
};

export const updateUser = (
  id: number,
  data: Partial<User>
) => {
  return axiosClient.put(`/users/${id}`, data);
};