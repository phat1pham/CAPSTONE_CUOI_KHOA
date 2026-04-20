import { useEffect, useState } from "react";
import { getRoomList } from "../../api/roomApi";
import type { Room } from "../../types/room.type";

const RoomAdmin = () => {

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRoomList().then((res) => {
      setRooms(res.data.content);
    });
  }, []);

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">
        <h3>Quản lý phòng</h3>

        <button className="btn btn-primary">
          + Thêm phòng
        </button>
      </div>

      <div className="card shadow-sm">

        <table className="table table-hover mb-0">

          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Hình</th>
              <th>Tên phòng</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>

            {rooms.map((room) => (
              <tr key={room.id}>

                <td>{room.id}</td>

                <td>
                  <img
                    src={room.hinhAnh}
                    style={{ width: 60, height: 40, objectFit: "cover" }}
                  />
                </td>

                <td>{room.tenPhong}</td>

                <td>${room.giaTien}</td>

                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    Sửa
                  </button>

                  <button className="btn btn-danger btn-sm">
                    Xoá
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RoomAdmin;