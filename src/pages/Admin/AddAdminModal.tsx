import { useState } from "react";
import { createAdmin } from "../../api/api";
import type { CreateAdminPayload } from "../../types/api.type";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const AddAdminModal = ({ onClose, onSuccess }: Props) => {

  const [form, setForm] = useState<CreateAdminPayload>({
    name: "",
    email: "",
    phone: "",
    password: "",
    birthday: "",
    gender: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "gender" ? value === "true" : value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.birthday
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      await createAdmin(form);

      alert("Tạo admin thành công 🎉");
      onSuccess();
      onClose();

    } catch (err: any) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Tạo thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
    >
      <div className="bg-white p-4 rounded" style={{ width: 500 }}>
        <h4 className="mb-4">THÊM QUẢN TRỊ VIÊN</h4>

        <div className="row g-3">

          <div className="col-6">
            <input
              name="name"
              placeholder="Tên"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="phone"
              placeholder="Số điện thoại"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              type="date"
              name="birthday"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <select
              name="gender"
              className="form-control"
              onChange={handleChange}
            >
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>

        </div>

        <div className="d-flex justify-content-end mt-4 gap-2">

          <button className="btn btn-secondary" onClick={onClose}>
            Huỷ
          </button>

          <button
            className="btn btn-danger"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Thêm"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;