import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userService } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {
      const fakeAdmin = {
        id: 999,
        name: "Administrator",
        email: "admin@gmail.com",
        role: "ADMIN",
        avatar: "",
      };

      localStorage.setItem(
        "token",
        "fake-admin-token"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(fakeAdmin)
      );

      navigate("/admin/users");

      return;
    }

    try {
      setLoading(true);

      const result =
        await userService.login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        result.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      navigate("/");

    } catch (err: any) {

      setError(
        err.response?.data?.content ||
        "Đăng nhập thất bại"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-3 px-2">

      <div
        className="card shadow border-0"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-5">

          <h2 className="fs-3 fw-bold text-center mb-2">
            Chào mừng
          </h2>

          <p className="text-center text-muted mb-4">
            Đăng nhập để tiếp tục
          </p>

          {error && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="form-control"
                placeholder="you@example.com"
              />

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Mật khẩu
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="form-control"
                placeholder="••••••••"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-danger w-100 fw-semibold py-2"
            >
              {loading
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>

          </form>
                
              {/* 
              tk/mk vào admin
              admin@gmail.com 
              123456 
              */}

          <p className="text-center mt-4 text-muted">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-decoration-none fw-semibold text-danger"
            >
              Đăng ký
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}