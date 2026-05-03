import { useEffect, useState } from "react";
import { getRoomPagination, getLocation } from "../../api/roomApi";
import type { Room, Location } from "../../types/room.type";

const RoomAdmin = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);

  const fetchRooms = () => {
    getRoomPagination(page, keyword)
      .then((res) => {
        setRooms(res.data.content?.data || []);
        setTotal(res.data.content?.totalRow || 0);
      })
      .catch(console.log);
  };

  const fetchLocation = () => {
    getLocation()
      .then((res) => {
        setLocations(res.data.content || []);
      })
      .catch(console.log);
  };

  const getLocationName = (maViTri: number) => {
    const location = locations.find(
      (item) => item.id === maViTri
    );

    return location
      ? `${location.tenViTri} - ${location.tinhThanh}`
      : "Chưa có vị trí";
  };

  const totalPage = Math.ceil(total / 10);

  const getPages = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPage, page + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPage) {
      if (end < totalPage - 1) pages.push("...");
      pages.push(totalPage);
    }

    return pages;
  };

  useEffect(() => {
    fetchRooms();
  }, [page]);

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between mb-4">
        <h3>Quản lý phòng</h3>

        <button className="btn btn-primary">
          + Thêm phòng
        </button>
      </div>

      {/* Search */}

      <div className="card mb-3">
        <div className="card-body d-flex gap-2">
          <input
            className="form-control"
            placeholder="Tìm kiếm phòng..."
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />

          <button
            className="btn btn-dark"
            onClick={fetchRooms}
          >
            Tìm
          </button>
        </div>
      </div>

      <div className="card">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Hình ảnh</th>
              <th>Vị trí</th>
              <th>Khách tối đa</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>

                <td>{room.tenPhong}</td>

                <td>
                  <img
                    src={room.hinhAnh}
                    width={80}
                    height={60}
                    className="rounded"
                  />
                </td>

                <td>
                  {getLocationName(room.maViTri)}
                </td>

                <td>
                  <span className="badge bg-info">
                    {room.khach} khách
                  </span>
                </td>

                <td>
                  <button className="btn btn-sm btn-info me-2">
                    Xem chi tiết
                  </button>

                  <button className="btn btn-sm btn-warning me-2">
                    Sửa
                  </button>

                  <button className="btn btn-sm btn-danger">
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">

          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
          </li>

          {getPages().map((p, index) => (
            <li
              key={index}
              className={`page-item ${page === p ? "active" : ""
                } ${p === "..." ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => typeof p === "number" && setPage(p)}
              >
                {p}
              </button>
            </li>
          ))}

          {/* Next */}
          <li
            className={`page-item ${page === totalPage ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default RoomAdmin;