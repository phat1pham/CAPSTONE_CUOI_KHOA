import { useEffect, useState } from "react";
import {
  getLocationPagination,
  deleteLocation
} from "../../api/roomApi";
import type { Location } from "../../types/room.type";

const LocationAdmin = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);

  const fetchLocations = () => {
    getLocationPagination(page, keyword)
      .then((res) => {
        setLocations(res.data.content?.data || []);
        setTotal(res.data.content?.totalRow || 0);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocations();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchLocations();
  };

  const handleDelete = (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;

    deleteLocation(id)
      .then(() => {
        alert("Xóa thành công");
        fetchLocations();
      })
      .catch((err) => {
        console.log(err);
        alert("Xóa thất bại");
      });
  };

  const totalPage = Math.ceil(total / 10);

  const getPages = () => {
    const pages: (number | string)[] = [];

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

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý vị trí</h3>

        <button className="btn btn-primary">
          + Thêm vị trí
        </button>
      </div>

      {/* Search */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm vị trí..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            className="btn btn-dark"
            onClick={handleSearch}
          >
            Tìm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Tên vị trí</th>
                <th>Tỉnh thành</th>
                <th>Quốc gia</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.id}</td>
                  <td>{loc.tenViTri}</td>
                  <td>{loc.tinhThanh}</td>
                  <td>{loc.quocGia}</td>

                  <td>
                    <button className="btn btn-sm btn-info me-2">
                      Xem
                    </button>

                    <button className="btn btn-sm btn-warning me-2">
                      Sửa
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(loc.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
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
              className={`page-item ${page === p ? "active" : ""} ${p === "..." ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => typeof p === "number" && setPage(p)}
              >
                {p}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPage ? "disabled" : ""}`}>
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

export default LocationAdmin;