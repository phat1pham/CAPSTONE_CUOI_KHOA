import { useState } from "react";

const UserAdmin = () => {

  const [keyword, setKeyword] = useState("");

  return (
    <div>

      <div className="d-flex justify-content-between mb-3">
        <h4>Quản lý người dùng</h4>

        <button className="btn btn-primary">
          Thêm quản trị viên
        </button>
      </div>

      {/* Search */}
      <div className="d-flex mb-3">

        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập tài khoản hoặc họ tên"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn btn-outline-dark">
          Tìm
        </button>

      </div>

      {/* Table */}
      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>Admin</td>

            <td>
              <img
                src="https://i.pravatar.cc/40"
                className="rounded-circle"
              />
            </td>

            <td>admin@gmail.com</td>
            <td>Admin</td>

            <td>
              <button className="btn btn-info btn-sm me-2">
                Xem
              </button>

              <button className="btn btn-warning btn-sm me-2">
                Sửa
              </button>

              <button className="btn btn-danger btn-sm">
                Xóa
              </button>
            </td>

          </tr>

        </tbody>

      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">

        <ul className="pagination">

          <li className="page-item">
            <button className="page-link">1</button>
          </li>

          <li className="page-item">
            <button className="page-link">2</button>
          </li>

          <li className="page-item">
            <button className="page-link">3</button>
          </li>

        </ul>

      </div>

    </div>
  );
};

export default UserAdmin;