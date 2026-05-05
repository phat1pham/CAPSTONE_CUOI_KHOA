export interface Pagination<T> {
  data: T[];
  totalRow: number;
  pageIndex: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  content: T;
  dateTime: string;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
}