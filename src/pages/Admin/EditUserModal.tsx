import { useState } from "react";
import type { User } from "../../types/type";
import { updateUser } from "../../api/api";

type Props = {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditUserModal({
  user,
  onClose,
  onSuccess,
}: Props) {

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateUser(user.id, formData);

      alert("Cập nhật thành công");

      onSuccess();
      onClose();

    } catch (err) {
      console.log(err);
      alert("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal d-block"
      style={{
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Chỉnh sửa người dùng
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">

            <div className="mb-3">
              <label>Tên</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Số điện thoại</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Role</label>

              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">
                  USER
                </option>

                <option value="ADMIN">
                  ADMIN
                </option>
              </select>
            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Huỷ
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Đang lưu..."
                : "Lưu"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}