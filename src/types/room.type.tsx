export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  hinhAnh: string;
  maViTri: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
}

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
}

export interface Comment {
  id: number
  maPhong: number
  maNguoiBinhLuan: number
  ngayBinhLuan: string
  noiDung: string
  saoBinhLuan: number
  tenNguoiBinhLuan: string
  avatar: string
}

export interface CommentCreate {
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}
export interface Booking {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  phong?: {
    tenPhong: string;
    hinhAnh: string;
    giaTien: number;
    khach: number;
    phongNgu: number;
  };
}

export interface BookingCreatePayload {
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}