import React from "react";

export default function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-3 px-2">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="fs-3 fw-bold text-center mb-2">Tạo tài khoản</h2>
          <p className="text-center text-muted mb-4">
            Tham gia cộng đồng của chúng tôi
          </p>

          <form>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value=""
                onChange
                required
                className="form-control"
                placeholder="Họ tên"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value=""
                onChange
                required
                className="form-control"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                name="phoneNumber"
                value=""
                onChange
                className="form-control"
                placeholder="Số điện thoại"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value=""
                onChange
                required
                className="form-control"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                value=""
                onChange
                required
                className="form-control"
                placeholder="Xác nhận mật khẩu"
              />
            </div>

            <button
              type="submit"
              className="btn btn-airbnb w-100 fw-semibold"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
