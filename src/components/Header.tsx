import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import React from "react";

export default function Header() {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="pe-2 fs-4">
            <i className="fab fa-airbnb"></i>
          </div>
          <Link className="navbar-brand" to="/">
            Airbnb
          </Link>

          {/* Pages Menu */}
          <div className="collapse navbar-collapse" id="navbarPages">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item d-none d-md-block">
                <Link to="/vocation" className="nav-link fw-bold">
                  Nơi ở
                </Link>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link to="/experience" className="nav-link fw-bold">
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

          {/* Right Menu */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Navigation Menu */}
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa-solid fa-bars"></i>
                  <i className="fa fa-user"></i>
                </button>
                <ul className="dropdown-menu position-absolute end-0">
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
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
