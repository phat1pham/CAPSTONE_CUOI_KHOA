import { useEffect, useState } from "react";
import { getUserPagination } from "../../api/api";
import type { User } from "../../types/type";
import AddAdminModal from "./AddAdminModal";
import { deleteUser } from "../../api/api";
import EditUserModal from "./EditUserModal";

const UserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] =
    useState<User | null>(null);

  const fetchUsers = () => {
    getUserPagination(page, keyword)
      .then((res) => {
        setUsers(res.data.content?.data || []);
        setTotal(res.data.content?.totalRow || 0);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const handleSearch = () => {
    setPage(1);
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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa người dùng này?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      alert("Xóa người dùng thành công");
    } catch (err) {
      console.log(err);
      alert("Xóa thất bại");
    }
  };

  const colors = [
    "#0d6efd",
    "#198754",
    "#dc3545",
    "#ffc107",
    "#6f42c1",
    "#fd7e14",
  ];


  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          width={40}
          height={40}
          className="rounded-circle"
          style={{ objectFit: "cover" }}
        />
      );
    }

    const firstChar = user.name?.charAt(0)?.toUpperCase() || "?";

    const color = colors[user.id % colors.length];

    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: 40,
          height: 40,
          backgroundColor: color,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {firstChar}
      </div>
    );
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý người dùng</h3>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Thêm quản trị viên
        </button>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex gap-2">

          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm người dùng..."
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

      <div className="card shadow-sm">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Email</th>
                <th>sđt</th>
                <th>Role</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{renderAvatar(user)}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <span
                      className={
                        user.role === "ADMIN"
                          ? "badge bg-danger"
                          : "badge bg-secondary"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditUser(user)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
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

      {showModal && (
        <AddAdminModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchUsers}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={fetchUsers}
        />
      )}

    </div>
  );
};

export default UserAdmin;