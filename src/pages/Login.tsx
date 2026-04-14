import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-3 px-2">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="fs-3 fw-bold text-center mb-4">Chào mừng</h2>

          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                value=""
                onChange
                required
                className="form-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Mật khẩu</label>
              <input
                type="Mật khẩu"
                value=""
                onChange
                required
                className="form-control"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled
              className="btn btn-airbnb w-100 fw-semibold"
            >Đăng nhập</button>
          </form>

          <p className="text-center mt-4 text-muted">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-decoration-none fw-semibold"
              style={{ color: "var(--airbnb-red)" }}
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
