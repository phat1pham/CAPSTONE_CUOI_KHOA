
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  phone: string;
  birthday: string;
  render: "true" | "false";
  role: 'user' | 'admin';
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  content?: T;
  data?: T;
}

export interface RoomList {
  id: string;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface RoomSearchResult {
  pageIndex: number;
  pageSize: number;
  keyword: string;
}