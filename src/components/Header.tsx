import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userRole = user?.role === "ADMIN";

  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          className="rounded-circle"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
          }}
        />
      );
    }

    const name = user?.name || "User";

    const firstChar = name.charAt(0).toUpperCase();

    const bgColor = getColorFromName(name);

    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: 40,
          height: 40,
          backgroundColor: bgColor,
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {firstChar}
      </div>
    );
  };

  const getColorFromName = (name: string) => {
    const colors = [
      "#f56a00",
      "#7265e6",
      "#ffbf00",
      "#00a2ae",
      "#ff4d4f",
      "#52c41a",
      "#1890ff",
      "#eb2f96",
    ];

    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">

          <Link
            className="navbar-brand fw-bold fs-4 text-danger"
            to="/"
          >
            <div className="animate__animated animate__pulse">
              <i className="fab fa-airbnb me-2"></i>
              Airbnb
            </div>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarMain"
          >
            <ul className="navbar-nav mx-auto gap-lg-4 text-center">

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link fw-semibold"
                >
                  Nơi ở
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/ExperienceViews"
                  className="nav-link fw-semibold"
                >
                  Trải nghiệm
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/online-experience"
                  className="nav-link fw-semibold"
                >
                  Trải nghiệm trực tuyến
                </Link>
              </li>

            </ul>

            <div className="d-flex justify-content-center mt-3 mt-lg-0">
              <div className="position-relative">
                {token ? (
                  <button
                    className="btn border rounded-pill d-flex align-items-center gap-2 px-2 py-1"
                    onClick={() =>
                      setIsUserMenuOpen(!isUserMenuOpen)
                    }
                  >
                    <i className="fa-solid fa-bars"></i>
                    {renderAvatar()}
                  </button>
                ) : (
                  <button
                    className="btn border rounded-pill d-flex align-items-center gap-3 px-3 py-2"
                    onClick={() =>
                      setIsUserMenuOpen(!isUserMenuOpen)
                    }
                  >
                    <i className="fa-solid fa-bars"></i>

                    <i className="fa-solid fa-user"></i>
                  </button>
                )}

                {isUserMenuOpen && (
                  <ul
                    className="dropdown-menu show border-0 shadow position-absolute end-0 mt-2"
                    style={{
                      display: "block",
                      minWidth: 220,
                      borderRadius: 15,
                    }}
                  >

                    {token ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className="dropdown-item py-2"
                          >
                            Hồ sơ
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/bookings"
                            className="dropdown-item py-2"
                          >
                            Đặt phòng của tôi
                          </Link>
                        </li>

                        {userRole && (
                          <li>
                            <Link
                              to="/admin"
                              className="dropdown-item py-2"
                            >
                              Dashboard Admin
                            </Link>
                          </li>
                        )}

                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item text-danger py-2"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="dropdown-item py-2"
                          >
                            Đăng nhập
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/register"
                            className="dropdown-item py-2"
                          >
                            Đăng ký
                          </Link>
                        </li>
                      </>
                    )}

                  </ul>
                )}

              </div>

            </div>

          </div>

        </div>
      </nav>
    </header>
  );
}