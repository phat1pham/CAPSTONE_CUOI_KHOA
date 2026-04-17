import React, { useEffect, useState } from "react";
import { searchLocation } from "../api/roomApi";
import { useNavigate } from "react-router-dom";
import type { Location } from "../types/room.type";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
    navigate(`/roomList/${item.id}`);
    setShowDropdown(false);
    setKeyword(item.tenViTri);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="bg-white shadow rounded-pill p-2 d-flex w-75">

        <div className="flex-fill position-relative px-3 border-end">
          <small className="fw-bold">Địa điểm</small>

          <input
            type="text"
            className="form-control border-0 p-0"
            placeholder="Bạn sẽ đi đâu?"
            value={keyword}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {showDropdown && keyword && locations.length > 0 && (
            <div className="dropdown-menu show w-100 mt-3 shadow rounded-4">

              {locations.map((item) => (
                <button
                  key={item.id}
                  className="dropdown-item"
                  onClick={() => handleSelect(item)}
                >
                  <i className="fa fa-location-dot me-2"></i>
                  {item.tenViTri} - {item.tinhThanh}
                </button>
              ))}

            </div>
          )}

        </div>

        <div className="flex-fill px-3 border-end">
          <small className="fw-bold">Nhận phòng</small>
          <input type="date" className="form-control border-0 p-0"/>
        </div>

        <div className="flex-fill px-3 border-end">
          <small className="fw-bold">Trả phòng</small>
          <input type="date" className="form-control border-0 p-0"/>
        </div>

        <div className="flex-fill px-3">
          <small className="fw-bold">Khách</small>
          <input
            type="number"
            className="form-control border-0 p-0"
            placeholder="Thêm khách"
          />
        </div>

        <button className="btn btn-danger rounded-circle ms-2">
          <i className="fa fa-search"></i>
        </button>

      </div>
    </div>
  );
}