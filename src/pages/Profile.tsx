import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/type";
import { userService } from "../api/api";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userstr = localStorage.getItem("user");
    const userid = userstr ? JSON.parse(userstr).id : null;
    loadProfile(userid);
  }, []);

  const loadProfile = async (userid) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const profile = await userService.getUserProfile(userid);
      setUser(profile);
      setFormData(profile);
    } catch (error) {
      console.error("Không thể tải hồ sơ:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await userService.updateProfile(formData);
      setUser(updated);
      setIsEditing(false);
      alert("Hồ sơ đã được cập nhật thành công!");
    } catch (error) {
      console.error("Không thể cập nhật hồ sơ:", error);
      alert("Không thể cập nhật hồ sơ!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-overlay" style={{ height: "400px" }}>
        <div
          className="spinner-border"
          style={{ color: "var(--airbnb-red)" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-5">Không tìm thấy người dùng</div>;
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div className="py-5">
        <h1 className="display-5 fw-bold mb-5">Hồ Sơ Của Tôi</h1>

        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center gap-4 mb-5 pb-4 border-bottom">
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#e0e0e0",
                }}
                className="rounded-circle d-flex align-items-center justify-content-center"
              >
                <img
                  src={user.avatar || "/default-avatar.jpg"}
                  alt={user.name}
                  className="rounded-circle"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h2 className="fs-3 fw-bold mb-2">{user.name}</h2>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="d-flex align-items-center gap-2 text-muted small fw-semibold mb-2">
                  <i className="fa fa-user"></i> Tên
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p className="fs-6 fw-semibold">{user.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="d-flex align-items-center gap-2 text-muted small fw-semibold mb-2">
                  <i className="fa fa-envelope"></i> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p className="fs-6">{user.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="d-flex align-items-center gap-2 text-muted small fw-semibold mb-2">
                  <i className="fa fa-phone"></i> Số diện thoại
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p className="fs-6">{user.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small fw-semibold">
                  Birthday
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <p className="fs-6">{user.birthday.split("-").reverse().join("/")}</p>
                )}
              </div>
            </div>

            <div className="d-flex gap-3 mt-5 pt-4 border-top">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-airbnb flex-grow-1"
                  >
                    {saving ? "Lưu..." : "Lưu thay đổi"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline-secondary flex-grow-1"
                  >
                    Huỷ
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-dark flex-grow-1"
                >
                  Chỉnh sửa hồ sơ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
