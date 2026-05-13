import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/css/SearchBar.css";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
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
          style={{ width: 40, height: 40, objectFit: "cover" }}
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
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="pe-2 fs-4 animate__animated animate__pulse">
              <i className="fab fa-airbnb pe-2"></i>
              Airbnb
            </div>
          </Link>

          <button
            type="button"
            className="navbar-toggler d-lg-none border-0 bg-transparent"
            aria-label="Toggle navigation"
            onClick={() => setIsPagesOpen((prev) => !prev)}
          >
            <i className="fa fa-bars"></i>
          </button>

          <div
            className={`collapse navbar-collapse ${isPagesOpen ? "show" : ""}`}
            id="navbarPages"
          >
            <ul className="navbar-nav ms-auto gap-3 flex-column flex-lg-row mobile-nav-right">
              <li className="nav-item">
                <Link to="/" className="nav-link fw-bold">
                  Nơi ở
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/RoomDetail" className="nav-link fw-bold">
                  Trải nghiệm
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/experienceonline" className="nav-link fw-bold">
                  Trải nghiệm trực tuyện
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={`collapse navbar-collapse ${isPagesOpen ? "show" : ""}`}
            id="navbarContent"
          >
            <ul className="navbar-nav ms-auto gap-3 flex-column flex-lg-row mobile-nav-right">
              <li className="nav-item dropdown d-none d-lg-block">
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
                    className="btn btn-secondary rounded-pill d-flex align-items-center gap-2"
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
              {!token && (
                <>
                  <li className="nav-item d-lg-none">
                    <Link to="/login" className="dropdown-item">
                      Đăng nhập
                    </Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link to="/register" className="dropdown-item">
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
              {token && (
                <>
                  <li className="nav-item d-lg-none">
                    <Link to="/profile" className="dropdown-item">
                      Hồ sơ
                    </Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link to="/bookings" className="dropdown-item">
                      Đặt phòng của tôi
                    </Link>
                  </li>
                  {userRole === true && (
                    <li className="nav-item d-lg-none">
                      <Link to="/admin" className="dropdown-item">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="nav-item d-lg-none">
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="nav-item d-lg-none">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
