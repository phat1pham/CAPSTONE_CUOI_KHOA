import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/type";
import { userService } from "../api/api";
import { getBookingByUser } from "../api/roomApi";
import type { Booking } from "../types/room.type";
import { getRoomDetail } from "../api/roomApi";
import { deleteBooking } from "../api/roomApi";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userstr = localStorage.getItem("user");
    const userid = userstr ? JSON.parse(userstr).id : null;
    loadProfile(userid);
  }, []);

  const loadBookings = async (userId: number) => {
    try {
      const res = await getBookingByUser(userId);
      const bookingList = res.data.content || [];

      const bookingWithRoom = await Promise.all(
        bookingList.map(async (item: Booking) => {
          try {
            const roomRes = await getRoomDetail(item.maPhong);

            return {
              ...item,
              phong: roomRes.data.content,
            };
          } catch {
            return item;
          }
        })
      );

      setBookings(bookingWithRoom);

    } catch (err) {
      console.log("Lỗi load booking", err);
    }
  };

  const loadProfile = async (userid: number) => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN");
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

  const renderAvatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          className="rounded-circle mx-auto mb-3"
          style={{ width: 120, height: 120, objectFit: "cover" }}
        />
      );
    }

    const name = user?.name || "User";
    const firstChar = name.charAt(0).toUpperCase();
    const bgColor = getColorFromName(name);

    return (
      <div
        className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
        style={{
          width: 120,
          height: 120,
          backgroundColor: bgColor,
          color: "#fff",
          fontSize: 40,
          fontWeight: "bold"
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
      "#eb2f96"
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const handleCancel = async (bookingId: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn huỷ phòng này?");

    if (!confirmDelete) return;

    try {
      await deleteBooking(bookingId);

      // update UI ngay (không cần reload)
      setBookings((prev) =>
        prev.filter((item) => item.id !== bookingId)
      );

      alert("Huỷ phòng thành công");
    } catch (err) {
      console.log(err);
      alert("Huỷ thất bại");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card p-4 shadow-sm text-center">

            {renderAvatar()}

            {isEditing ? (
              <input
                className="form-control mb-2"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            ) : (
              <h4 className="fw-bold">{user.name}</h4>
            )}

            {isEditing ? (
              <input
                className="form-control mb-2"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-muted">{user.email}</p>
            )}

            <hr />

            <div className="text-start">
              <div className="mb-2">
                <strong>📞 </strong>
                {isEditing ? (
                  <input
                    className="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.phone || "Chưa cập nhật"
                )}
              </div>
              <div className="mb-2">
                <strong>🎂 </strong>
                {isEditing ? (
                  <input
                    type="date"
                    className="form-control"
                    name="birthday"
                    value={formData.birthday || ""}
                    onChange={handleInputChange}
                  />
                ) : user.birthday ? (
                  user.birthday.split("-").reverse().join("/")
                ) : (
                  "Chưa cập nhật"
                )}
              </div>

            </div>
            <div className="mt-3 d-flex gap-2">

              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-danger flex-fill"
                  >
                    {saving ? "Đang lưu..." : "Lưu"}
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(user);
                    }}
                    className="btn btn-outline-secondary flex-fill"
                  >
                    Huỷ
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-dark w-100"
                >
                  Chỉnh sửa hồ sơ
                </button>
              )}

            </div>

          </div>
        </div>
        <div className="col-12 col-lg-8">

          <h3 className="fw-bold mb-4">Phòng đã thuê</h3>

          {bookings.length === 0 && (
            <p className="text-muted">Bạn chưa đặt phòng nào</p>
          )}
          <div className="row g-4">
            {bookings.map((item) => (
              <div key={item.id} className="col-12">
                <div className="card shadow-sm d-flex flex-row p-3">
                  <img
                    src={
                      item.phong?.hinhAnh ||
                      "https://via.placeholder.com/150"
                    }
                    style={{
                      width: "200px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="ms-3 flex-grow-1">

                    <h5 className="fw-bold mb-1">
                      {item.phong?.tenPhong || "Tên phòng"}
                    </h5>

                    <p className="text-muted mb-1">
                      {item.phong?.khach} khách · {item.phong?.phongNgu} phòng ngủ
                    </p>

                    <p className="mb-1">
                      📅 {formatDate(item.ngayDen)} → {formatDate(item.ngayDi)}
                    </p>

                    <span className="badge bg-success">
                      Đã đặt
                    </span>

                  </div>

                  {/* PRICE */}
                  <div className="text-end">
                    <h5 className="fw-bold text-danger">
                      ${item.phong?.giaTien}/đêm
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={() => handleCancel(item.id)}
                    >
                      Huỷ phòng
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
