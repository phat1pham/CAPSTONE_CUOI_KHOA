import axiosClient from "./Axios";
import type { Room, Comment, Location } from "../types/room.type";
import type { CommentCreate } from "../types/room.type";
import type { ApiResponse } from "../types/api.type";

export const getRoomList = () => {
  return axiosClient.get<ApiResponse<Room[]>>(
    "/phong-thue"
  );
};

export const getRoomByLocation = (maViTri: number) => {
  return axiosClient.get<ApiResponse<Room[]>>(
    `/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
  );
};

export const getRoomDetail = (id: number | string) => {
  return axiosClient.get<ApiResponse<Room>>(
    `/phong-thue/${id}`
  );
};

export const searchLocation = (keyword: string) => {
  return axiosClient.get<ApiResponse<Location[]>>(
    "/vi-tri",
    {
      params: { keyword }
    }
  );
};

export const getCommentByRoom = (roomId: number) => {
  return axiosClient.get<ApiResponse<Comment[]>>(
    `/binh-luan/lay-binh-luan-theo-phong/${roomId}`
  );
};

export const addComment = (data: CommentCreate) => {
  return axiosClient.post<ApiResponse<Comment>>(
    "/binh-luan",
    data
  );
};