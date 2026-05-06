import { useEffect, useState } from "react";
import { getAllBooking, deleteBooking } from "../../api/roomApi";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const fetchBooking = async () => {
    try {
      const res = await getAllBooking();
      setBookings(res.data.content || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const totalPage = Math.ceil(bookings.length / pageSize);

  const paginatedBookings = bookings.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá booking này?")) return;

    try {
      await deleteBooking(id);
      fetchBooking();
    } catch (err) {
      console.log(err);
      alert("Xoá thất bại");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">Quản lý đặt phòng</h3>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Mã phòng</th>
                <th>User</th>
                <th>Ngày đến</th>
                <th>Ngày đi</th>
                <th>Khách</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paginatedBookings.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>
                    <span className="badge bg-primary">
                      {item.maPhong}
                    </span>
                  </td>

                  <td>
                    <span className="badge bg-secondary">
                      {item.maNguoiDung}
                    </span>
                  </td>

                  <td>{formatDate(item.ngayDen)}</td>

                  <td>{formatDate(item.ngayDi)}</td>

                  <td>{item.soLuongKhach}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default BookingAdmin;