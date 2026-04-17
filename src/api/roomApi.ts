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
