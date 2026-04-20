import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <div
        className="border-end p-3"
        style={{ width: 250 }}
      >
        <h5 className="mb-4">Dashboard</h5>

        <div className="d-flex flex-column gap-2">

          <Link
            to="/admin/users"
            className="text-decoration-none"
          >
            Quản lý người dùng
          </Link>

          <Link
            to="/admin/location"
            className="text-decoration-none"
          >
            Quản lý vị trí
          </Link>

          <Link
            to="/admin/rooms"
            className="text-decoration-none"
          >
            Quản lý phòng
          </Link>

          <Link
            to="/admin/rooms"
            className="text-decoration-none"
          >
            Thêm tài khoản Admin
          </Link>

        </div>
      </div>

      {/* Content */}
      <div className="flex-grow-1">

        {/* Header */}
        <div className="border-bottom p-3 d-flex justify-content-between">
          <h5>Quản lý</h5>

          <div>
            <span>Admin</span>
          </div>
        </div>

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;