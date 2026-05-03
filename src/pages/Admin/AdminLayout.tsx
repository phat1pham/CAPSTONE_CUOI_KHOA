import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  const menu = [
    {
      path: "/admin/users",
      label: "quản lý Người dùng",
    },
    {
      path: "/admin/location",
      label: "quản lý Vị trí",
    },
    {
      path: "/admin/rooms",
      label: "quản lý Phòng",
    },
    {
      path: "/admin/bookings",
      label: "quản lý đặt Phòng",
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      <div
        className="border-end p-3 bg-dark text-white"
        style={{ width: 250 }}
      >
        <h5 className="mb-4 text-center">Admin Panel</h5>

        <div className="d-flex flex-column gap-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none 
                ${isActive ? "bg-danger text-white" : "text-light"}`
              }
              style={{
                transition: "0.2s",
              }}
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex-grow-1">

        <div className="border-bottom p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Quản lý</h5>

          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
              style={{ width: 35, height: 35 }}
            >
              A
            </div>
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