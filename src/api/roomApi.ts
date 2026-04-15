import axiosClient from "./Axios";

export const getRoomByLocation = (maViTri: number) => {
  return axiosClient.get(
    `/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`
  );
};