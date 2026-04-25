import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { userService } from "../api/api";

export default function Register() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") === "admin" ? "admin" : "user";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthday: "",
    gender: true,
    role: defaultRole,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "gender"
          ? value === "true"
          : name === "role"
          ? value
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);
      await userService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthday: formData.birthday,
        gender: formData.gender,
        role: formData.role,
      });

      // After registration, redirect to login
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.content || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-3 px-2">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-5">
          <h2 className="fs-3 fw-bold text-center mb-2">Tạo tài khoản</h2>
          <p className="text-center text-muted mb-4">
            Tham gia cộng đồng của chúng tôi
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Họ tên"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Xác nhận mật khẩu"
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Số điện thoại"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="form-control"
                placeholder="Ngày sinh"
                required
              />
            </div>

            <div className="mb-3">
              <select
                name="gender"
                value={String(formData.gender)}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
            <input type="hidden" name="role" value={formData.role} />
            <button
              type="submit"
              className="btn btn-airbnb w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-center mt-4 text-muted">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-decoration-none fw-semibold"
              style={{ color: "var(--airbnb-red)" }}
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
