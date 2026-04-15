import { useEffect, useState } from "react";
import { getRoomByLocation } from "../api/roomApi";
import type { Room } from "../types/room.type";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    getRoomByLocation(1)
      .then((res) => {
        setRooms(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        <div className="col-md-7">
          <h4>Chỗ ở tại khu vực đã chọn</h4>

          {rooms.map((room: any) => (
            <div className="card mb-3" key={room.id}>
              <div className="row g-0">

                <div className="col-md-4">
                  <img
                    src={room.hinhAnh}
                    className="img-fluid rounded-start"
                    alt=""
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
          ))}

        </div>
        <div className="col-md-5">
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