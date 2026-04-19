import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roomService } from "../api/api";
import type { RoomList } from "../types/type";

export default function RoomCard() {
  const [rooms, setRooms] = useState<RoomList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomService
      .getAllRooms()
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải phòng:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        Không có phòng nào để hiển thị.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {rooms.data.map((room) => (
        <div className="col-lg-3 col-md-6" key={room.id}>
          <Link
            to={`/roomList/${room.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="card h-100 shadow-sm border-0 overflow-hidden">
              <img
                src={room.hinhAnh}
                alt={room.tenViTri}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title mb-2">{room.tenViTri}</h5>
                <p className="card-text mb-3 text-muted">
                  {room.tinhThanh}, {room.quocGia}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
