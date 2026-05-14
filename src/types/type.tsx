
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: "USER" | "ADMIN";
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  content?: T;
  data?: T;
}

export interface RoomList {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}
