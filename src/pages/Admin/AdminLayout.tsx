import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [showDropdown, setShowDropdown] =
    useState(false);

  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");

  const user = userStr
    ? JSON.parse(userStr)
    : null;

  const menu = [
    {
      path: "/admin/users",
      label: "Quản lý Người dùng",
      icon: "fa-users",
    },
    {
      path: "/admin/location",
      label: "Quản lý Vị trí",
      icon: "fa-location-dot",
    },
    {
      path: "/admin/rooms",
      label: "Quản lý Phòng",
      icon: "fa-bed",
    },
    {
      path: "/admin/bookings",
      label: "Quản lý Đặt phòng",
      icon: "fa-calendar-check",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh" }}
    >

      <div
        className="
          border-end
          p-3
          bg-dark
          text-white
        "
        style={{
          width: 260,
        }}
      >
        <h3 className="mb-4 text-center fw-bold text-danger">
          <i className="fab fa-airbnb me-2"></i>
          Airbnb
        </h3>

        <div className="d-flex flex-column gap-2">

          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                d-flex
                align-items-center
                gap-3
                px-3
                py-3
                rounded-4
                text-decoration-none
                fw-semibold
                ${
                  isActive
                    ? "bg-danger text-white shadow"
                    : "text-light"
                }
              `
              }
              style={{
                transition: "0.3s",
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
              ></i>

              <span>{item.label}</span>
            </NavLink>
          ))}

        </div>
      </div>

      <div className="flex-grow-1 bg-light">

        <div
          className="
            bg-white
            border-bottom
            px-4
            py-3
            d-flex
            justify-content-between
            align-items-center
            shadow-sm
            position-relative
          "
        >
          <div>
            <h4 className="mb-0 fw-bold">
              Dashboard Admin
            </h4>
          </div>

          <div className="position-relative">

            <button
              className="
                btn
                border
                rounded-pill
                d-flex
                align-items-center
                gap-2
                px-3
                py-2
                shadow-sm
              "
              onClick={() =>
                setShowDropdown(!showDropdown)
              }
            >
              <div
                className="
                  rounded-circle
                  d-flex
                  align-items-center
                  justify-content-center
                  bg-danger
                  text-white
                  fw-bold
                "
                style={{
                  width: 38,
                  height: 38,
                }}
              >
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "A"}
              </div>

              <div className="text-start d-none d-md-block">
                <div
                  className="fw-semibold"
                  style={{
                    fontSize: 14,
                  }}
                >
                  {user?.name || "Admin"}
                </div>

                <small className="text-muted">
                  ADMIN
                </small>
              </div>

              <i className="fa-solid fa-chevron-down"></i>
            </button>

            {showDropdown && (
              <div
                className="
                  position-absolute
                  end-0
                  mt-2
                  bg-white
                  shadow
                  rounded-4
                  border-0
                  overflow-hidden
                "
                style={{
                  width: 230,
                  zIndex: 9999,
                }}
              >

                <div className="p-3 border-bottom">
                  <div className="fw-bold">
                    {user?.name || "Admin"}
                  </div>

                  <small className="text-muted">
                    {user?.email ||
                      "admin@gmail.com"}
                  </small>
                </div>

                <button
                  className="
                    dropdown-item
                    py-3
                    d-flex
                    align-items-center
                    gap-2
                  "
                  onClick={() =>
                    navigate("/")
                  }
                >
                  <i className="fa-solid fa-house"></i>

                  Trang chủ
                </button>

                <button
                  className="
                    dropdown-item
                    py-3
                    d-flex
                    align-items-center
                    gap-2
                  "
                  onClick={() =>
                    navigate("/profile")
                  }
                >
                  <i className="fa-solid fa-user"></i>

                  Hồ sơ
                </button>

                <hr className="my-1" />

                <button
                  className="
                    dropdown-item
                    py-3
                    text-danger
                    d-flex
                    align-items-center
                    gap-2
                  "
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>

                  Đăng xuất
                </button>

              </div>
            )}

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