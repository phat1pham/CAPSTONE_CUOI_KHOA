
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  phone: string;
  birthday: string;
  render: "true" | "false";
  role: "USER" | "ADMIN";
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  content?: T;
  data?: T;
}

