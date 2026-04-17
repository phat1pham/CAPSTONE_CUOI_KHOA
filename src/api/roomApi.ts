import axiosClient from "./Axios";

export const getRoomByLocation = (maViTri: number) => {
  return axiosClient.get(
    `/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
  );
};

export const getRoomDetail = (id: number | string) => {
  return axiosClient.get(`/phong-thue/${id}`);
};

export const searchLocation = (keyword: string) => {
  return axiosClient.get("/vi-tri", {
    params: {
      keyword: keyword
    }
  });
};

export const getCommentByRoom = (roomId: number) => {
  return axiosClient.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
};

export const addComment = (data: any) => {
  return axiosClient.post("/binh-luan", data);
};