import { useEffect, useState } from "react";
import { searchLocation } from "../api/roomApi";
import { useNavigate } from "react-router-dom";
import type { Location } from "../types/room.type";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword.trim()) {
      setLocations([]);
      return;
    }

    const delay = setTimeout(() => {
      searchLocation(keyword)
        .then((res) => {
          const data = res.data.content || [];

          const filtered = data.filter((item: Location) =>
            `${item.tenViTri} ${item.tinhThanh}`
              .toLowerCase()
              .includes(keyword.toLowerCase())
          );

          setLocations(filtered);
        })
        .catch(() => setLocations([]));
    }, 400);

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSelect = (item: Location) => {
    setSelectedLocation(item);

    setKeyword(
      `${item.tenViTri}, ${item.tinhThanh}`
    );

    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (!selectedLocation) {
      alert("Vui lòng chọn địa điểm");
      return;
    }

    navigate(`/roomList/${selectedLocation.id}`);
  };

  return (
    <div
      className="container mt-3 position-relative"
      style={{
        zIndex: 99999,
      }}
    >
      <div
        className="
          bg-white
          shadow
          rounded-4
          p-3
          position-relative
        "
        style={{
          zIndex: 99999,
        }}
      >
        <div className="row g-3 align-items-center">

          <div className="col-12 col-md-6 col-lg">

            <div
              className="
                position-relative
                border
                rounded-pill
                px-3
                py-2
                h-100
              "
            >
              <small className="fw-bold d-block">
                Địa điểm
              </small>

              <input
                type="text"
                className="form-control border-0 p-0 shadow-none"
                placeholder="Bạn sẽ đi đâu?"
                value={keyword}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />

              {showDropdown &&
                keyword &&
                locations.length > 0 && (
                  <div
                    className="
                      dropdown-menu
                      show
                      w-100
                      mt-2
                      shadow
                      rounded-4
                      border-0
                      position-absolute
                    "
                    style={{
                      zIndex: 999999,
                      top: "100%",
                      left: 0,
                    }}
                  >
                    {locations.map((item) => (
                      <button
                        key={item.id}
                        className="dropdown-item py-2"
                        onClick={() =>
                          handleSelect(item)
                        }
                      >
                        <i className="fa fa-location-dot me-2"></i>

                        {item.tenViTri} -{" "}
                        {item.tinhThanh}
                      </button>
                    ))}
                  </div>
                )}

            </div>

          </div>

          <div className="col-6 col-md-3 col-lg">

            <div className="border rounded-pill px-3 py-2 h-100">

              <small className="fw-bold d-block">
                Nhận phòng
              </small>

              <input
                type="date"
                className="form-control border-0 p-0 shadow-none"
              />

            </div>

          </div>

          <div className="col-6 col-md-3 col-lg">

            <div className="border rounded-pill px-3 py-2 h-100">

              <small className="fw-bold d-block">
                Trả phòng
              </small>

              <input
                type="date"
                className="form-control border-0 p-0 shadow-none"
              />

            </div>

          </div>

          <div className="col-8 col-md-6 col-lg">

            <div className="border rounded-pill px-3 py-2 h-100">

              <small className="fw-bold d-block">
                Khách
              </small>

              <input
                type="number"
                className="form-control border-0 p-0 shadow-none"
                placeholder="Thêm khách"
                min={1}
              />

            </div>

          </div>

          <div className="col-4 col-md-6 col-lg-auto">

            <button
              className="
                btn
                btn-danger
                rounded-pill
                w-100
                h-100
                px-4
              "
              onClick={handleSearch}
            >
              <i className="fa fa-search me-2"></i>

              <span className="d-none d-md-inline">
                Tìm kiếm
              </span>

            </button>

          </div>

        </div>
      </div>
    </div>
  );
}