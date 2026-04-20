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