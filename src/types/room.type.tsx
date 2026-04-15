export interface Room {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface User {
  id: string;
  name: string;
  email: string;
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
