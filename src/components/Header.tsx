import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userstr = localStorage.getItem("user");
  const user = userstr ? JSON.parse(userstr) : null;
  const userRole = null;
  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          className="rounded-circle mx-auto mb-3"
          style={{ width: 20, height: 20, objectFit: "cover" }}
        />
      );
    }

    const name = user?.name || "User";
    const firstChar = name.charAt(0).toUpperCase();
    const bgColor = getColorFromName(name);

    return (
      <div
        className="rounded-circle mx-auto mb-1 d-flex align-items-center justify-content-center"
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
    navigate("/login");
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="pe-2 fs-4">
              <i className="fab fa-airbnb pe-2"></i> 
            Airbnb
            </div>
          </Link>

          <div className="collapse navbar-collapse" id="navbarPages">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item d-none d-md-block">
                <Link to="/" className="nav-link fw-bold">
                  Nơi ở
                </Link>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link to="/RoomDetail" className="nav-link fw-bold">
                  Trải nghiệm
                </Link>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link to="/experienceonline" className="nav-link fw-bold">
                  Trải nghiệm trực tuyện
                </Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item dropdown">
                {token ? (
                  <button
                    className="btn btn-light-secondary rounded-pill border-0 d-flex align-items-center gap-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{ textDecoration: "none" }}
                  >
                    {renderAvatar()}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{ textDecoration: "none" }}
                  >
                    <i className="fa-solid fa-bars"></i>
                    <i className="fa fa-user"></i>
                  </button>
                )}
                {isUserMenuOpen && (
                  <ul
                    className="dropdown-menu show position-absolute end-0"
                    style={{ display: "block" }}
                  >
                    {token ? (
                      <>
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            Hồ sơ
                          </Link>
                        </li>
                        <li>
                          <Link to="/bookings" className="dropdown-item">
                            Đặt phòng của tôi
                          </Link>
                        </li>
                        {userRole === true && (
                          <li>
                            <Link to="/admin" className="dropdown-item">
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item text-danger"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className="dropdown-item">
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link to="/register" className="dropdown-item">
                            Đăng ký
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
