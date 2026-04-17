import { useEffect, useState } from "react";
import { getRoomByLocation } from "../api/roomApi";
import type { Room } from "../types/room.type";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const { id } = useParams(); // lấy id từ url

  useEffect(() => {
    if (!id) return;

    getRoomByLocation(Number(id))
      .then((res) => {
        setRooms(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

return (
  <div className="container-fluid mt-4">

    {/* Search Bar */}
    <div className="mb-4">
      <SearchBar />
    </div>

    <div className="row">

      {/* Danh sách phòng */}
      <div className="col-lg-7 col-12">
        <h4>Chỗ ở tại khu vực đã chọn</h4>

        {rooms.map((room: Room) => (
          <Link
            to={`/room/${room.id}`}
            key={room.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card mb-3 shadow-sm">
              <div className="row g-0">

                <div className="col-md-4">
                  <img
                    src={room.hinhAnh}
                    alt={room.tenPhong}
                    className="img-fluid rounded-start"
                    style={{
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {room.tenPhong}
                    </h5>

                    <p className="card-text">
                      {room.moTa}
                    </p>

                    <p className="text-end fw-bold">
                      ${room.giaTien} / tháng
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}

      </div>

      {/* Map */}
      <div className="col-lg-5 d-none d-lg-block">
        <div
          style={{
            height: "80vh",
            position: "sticky",
            top: "100px"
          }}
        >
          <iframe
            src="https://www.google.com/maps?q=ho+chi+minh&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  </div>
);
};

export default RoomList;