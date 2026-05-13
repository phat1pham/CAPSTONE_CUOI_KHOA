
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  phone: string;
  birthday: string;
  gender: true | false;
  role: "USER" | "ADMIN";
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  content?: T;
  data?: T;
}
export type Room = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

export type RoomList = {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string | null;
  data: Room[];
};