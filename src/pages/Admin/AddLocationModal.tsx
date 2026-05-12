import { useState } from "react";
import { createLocation } from "../../api/roomApi";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const AddLocationModal = ({
  onClose,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.tenViTri ||
      !form.tinhThanh ||
      !form.quocGia
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      await createLocation(form);

      alert("Thêm vị trí thành công");

      onSuccess();
      onClose();

    } catch (err) {
      console.log(err);
      alert("Thêm vị trí thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        zIndex: 999,
      }}
    >
      <div
        className="bg-white p-4 rounded"
        style={{ width: 500 }}
      >
        <h3 className="mb-4">
          THÊM VỊ TRÍ
        </h3>

        <div className="row g-3">

          <div className="col-12">
            <input
              name="tenViTri"
              placeholder="Tên vị trí"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="tinhThanh"
              placeholder="Tỉnh thành"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="quocGia"
              placeholder="Quốc gia"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <input
              name="hinhAnh"
              placeholder="Link hình ảnh"
              className="form-control"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">

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
              ? "Đang thêm..."
              : "Thêm vị trí"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;