import { useState } from "react";
import { createRoom } from "../../api/roomApi";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddRoomModal = ({ onClose, onSuccess }: Props) => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        tenPhong: "",
        khach: 1,
        phongNgu: 1,
        giuong: 1,
        phongTam: 1,
        moTa: "",
        giaTien: 100,
        mayGiat: true,
        banLa: true,
        tivi: true,
        dieuHoa: true,
        wifi: true,
        bep: true,
        doXe: true,
        hoBoi: false,
        banUi: false,
        maViTri: 1,
        hinhAnh: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setForm({
                ...form,
                [name]: e.target.checked,
            });
        } else {
            setForm({
                ...form,
                [name]: [
                    "khach",
                    "phongNgu",
                    "giuong",
                    "phongTam",
                    "giaTien",
                    "maViTri",
                ].includes(name)
                    ? Number(value)
                    : value,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await createRoom(form);

            alert("Thêm phòng thành công");

            onSuccess();
            onClose();
        } catch (err) {
            console.log(err);
            alert("Thêm phòng thất bại");
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
                className="bg-white p-4 rounded overflow-auto"
                style={{
                    width: 700,
                    maxHeight: "90vh",
                }}
            >
                <h3 className="mb-4">THÊM PHÒNG</h3>

                <div className="row g-3">

                    <div className="col-6">
                        <input
                            name="tenPhong"
                            placeholder="Tên phòng"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-6">
                        <input
                            name="giaTien"
                            type="number"
                            placeholder="Giá tiền"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-3">
                        <input
                            name="khach"
                            type="number"
                            placeholder="Khách"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-3">
                        <input
                            name="phongNgu"
                            type="number"
                            placeholder="Phòng ngủ"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-3">
                        <input
                            name="giuong"
                            type="number"
                            placeholder="Giường"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-3">
                        <input
                            name="phongTam"
                            type="number"
                            placeholder="Phòng tắm"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <textarea
                            name="moTa"
                            placeholder="Mô tả"
                            className="form-control"
                            rows={4}
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

                    <div className="col-6">
                        <input
                            name="maViTri"
                            type="number"
                            placeholder="Mã vị trí"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="mt-4">
                    <h5>Tiện ích</h5>

                    <div className="d-flex flex-wrap gap-3">

                        {[
                            { label: "Máy giặt", name: "mayGiat" },
                            { label: "Bàn là", name: "banLa" },
                            { label: "Tivi", name: "tivi" },
                            { label: "Điều hòa", name: "dieuHoa" },
                            { label: "Wifi", name: "wifi" },
                            { label: "Bếp", name: "bep" },
                            { label: "Đỗ xe", name: "doXe" },
                            { label: "Hồ bơi", name: "hoBoi" },
                            { label: "Bàn ủi", name: "banUi" },
                        ].map((item) => (
                            <div key={item.name} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={item.name}
                                    checked={(form as any)[item.name]}
                                    onChange={handleChange}
                                />

                                <label className="form-check-label">
                                    {item.label}
                                </label>
                            </div>
                        ))}

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
                        className="btn btn-danger"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Đang thêm..." : "Thêm phòng"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddRoomModal;