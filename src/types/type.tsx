
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

