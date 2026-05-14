import { useEffect, useState } from "react";
import { getRoomByLocation } from "../api/roomApi";
import type { Room } from "../types/room.type";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(1);

  const { id } = useParams();

  const pageSize = 5;

  useEffect(() => {
    if (!id) return;

    getRoomByLocation(Number(id))
      .then((res) => {
        setRooms(res.data.content || []);
        setPage(1);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const totalPage = Math.ceil(rooms.length / pageSize);

  const paginatedRooms = rooms.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getPages = () => {
    const pages: (number | string)[] = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPage, page + 2);

    if (start > 1) {
      pages.push(1);

      if (start > 2) {
        pages.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPage) {
      if (end < totalPage - 1) {
        pages.push("...");
      }

      pages.push(totalPage);
    }

    return pages;
  };

  return (
    <div className="container-fluid mt-4">

      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="row">

        <div className="col-lg-7 col-12">

          <h4
            className=" mb-4 fw-bold animate__animated animate__fadeInDown "
          >
            Chỗ ở tại khu vực đã chọn
          </h4>

          {paginatedRooms.length === 0 && (
            <p>Không có phòng nào</p>
          )}

          {paginatedRooms.map((room: Room) => (
            <Link
              to={`/room/${room.id}`}
              key={room.id}
              style={{
                textDecoration: "none",
                color: "black"
              }}
            >
              <div
                className="card mb-4 shadow-sm border-0 animate__animated animate__fadeInUp"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "0.35s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >

                <div className="row g-0">

                  <div className="col-12 col-md-4">

                    <img
                      src={room.hinhAnh}
                      alt={room.tenPhong}
                      className="img-fluid rounded-start w-100"
                      style={{
                        height: "260px",
                        objectFit: "cover",
                        transition: "0.5s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1)";
                      }}
                    />

                  </div>

                  <div className="col-12 col-md-8">

                    <div className="card-body d-flex flex-column h-100">

                      <div>
                        <h5 className="card-title fw-bold">
                          {room.tenPhong}
                        </h5>

                        <p className="card-text text-muted">
                          {room.moTa?.slice(0, 120)}...
                        </p>
                      </div>

                      <div className="mt-auto">

                        <p className="mb-2 text-muted">
                          👤 {room.khach} khách · 🛏 {room.phongNgu} phòng ngủ
                        </p>

                        <p className="text-end fw-bold fs-5 text-danger mb-0">
                          ${room.giaTien} / đêm
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </Link>
          ))}

          {totalPage > 1 && (
            <div className="d-flex justify-content-center mt-4">

              <ul className="pagination">

                <li
                  className={`page-item ${page === 1 ? "disabled" : ""
                    }`}
                >
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
                      } ${p === "..." ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        typeof p === "number" && setPage(p)
                      }
                    >
                      {p}
                    </button>
                  </li>
                ))}

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
          )}

        </div>

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