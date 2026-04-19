import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomDetail } from "../api/roomApi";
import type { Room } from "../types/room.type";
import { getCommentByRoom } from "../api/roomApi";
import type { Comment } from "../types/room.type";
import { addComment } from "../api/roomApi";

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [noiDung, setNoiDung] = useState("");
    const [sao, setSao] = useState(5);

    useEffect(() => {
        if (!id) return;
        
        getRoomDetail(Number(id))
            .then((res) => {
                setRoom(res.data.content);
            })
            .catch((err) => console.log(err));

    }, [id]);

    useEffect(() => {
        if (!id) return;

        getCommentByRoom(Number(id))
            .then((res) => {
                setComments(res.data.content);
            })
            .catch((err) => console.log(err));

    }, [id]);

    const handleComment = () => {
        const data = {
            maPhong: Number(id),
            maNguoiBinhLuan: 1, // tạm để cứng
            ngayBinhLuan: new Date().toISOString(),
            noiDung: noiDung,
            saoBinhLuan: sao
        };

        addComment(data)
            .then(() => {

                getCommentByRoom(Number(id)).then((res) => {
                    setComments(res.data.content);
                });

                setNoiDung("");
                setSao(5);

            })
            .catch((err) => console.log(err));
    };

    if (!room) return <div>Loading...</div>;

    return (
        <div className="container mt-4">

            <div className="row">
                <h2>{room.tenPhong}</h2>

                <img
                    src={room.hinhAnh}
                    alt={room.tenPhong}
                    className="img-fluid rounded mb-4"
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover"
                    }}
                />

                {/* LEFT */}
                <div className="col-lg-8">

                    <p className="text-muted">
                        {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong} giường · {room.phongTam} phòng tắm
                    </p>

                    <hr />

                    <div className="mb-3">
                        <p>🏠 Toàn bộ nhà</p>
                        <p>🧹 Vệ sinh tăng cường</p>
                        <p>🔑 Nhận phòng dễ dàng</p>
                        <p>❌ Miễn phí huỷ trong 48 giờ</p>
                    </div>

                    <hr />

                    <h5>Mô tả</h5>

                    <p>
                        {showMore
                            ? room.moTa
                            : room.moTa?.slice(0, 150)}
                    </p>

                    <button
                        className="btn btn-link p-0"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "Thu gọn" : "Hiển thị thêm"}
                    </button>

                    <hr />

                    <h4>Tiện nghi</h4>

                    <div className="row">

                        {room.wifi && (
                            <div className="col-md-6 mb-2">
                                📶 Wifi
                            </div>
                        )}

                        {room.dieuHoa && (
                            <div className="col-md-6 mb-2">
                                ❄️ Điều hoà
                            </div>
                        )}

                        {room.tivi && (
                            <div className="col-md-6 mb-2">
                                📺 TV
                            </div>
                        )}

                        {room.bep && (
                            <div className="col-md-6 mb-2">
                                🍳 Bếp
                            </div>
                        )}

                        {room.doXe && (
                            <div className="col-md-6 mb-2">
                                🚗 Đỗ xe
                            </div>
                        )}

                        {room.hoBoi && (
                            <div className="col-md-6 mb-2">
                                🏊 Hồ bơi
                            </div>
                        )}

                    </div>

                    <hr />

                    <h4>Bình luận</h4>

                    <div className="card p-3 mb-4">

                        <textarea
                            className="form-control mb-2"
                            placeholder="Nhập bình luận..."
                            value={noiDung}
                            onChange={(e) => setNoiDung(e.target.value)}
                        />

                        <select
                            className="form-select mb-2"
                            value={sao}
                            onChange={(e) => setSao(Number(e.target.value))}
                        >
                            <option value="5">⭐⭐⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="1">⭐</option>
                        </select>

                        <button
                            className="btn btn-danger"
                            onClick={handleComment}
                        >
                            Gửi bình luận
                        </button>

                    </div>

                    {comments.length === 0 && (
                        <p>Chưa có bình luận</p>
                    )}

                    {comments.map((item) => (
                        <div key={item.id} className="mb-3 border-bottom pb-3">

                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src={item.avatar || "https://i.pravatar.cc/40"}
                                    alt=""
                                    className="rounded-circle me-2"
                                    style={{ width: "40px", height: "40px" }}
                                />

                                <div>
                                    <strong>{item.tenNguoiBinhLuan}</strong>
                                    <div className="text-muted" style={{ fontSize: "14px" }}>
                                        {item.ngayBinhLuan}
                                    </div>
                                </div>

                            </div>

                            <div>
                                ⭐ {item.saoBinhLuan}
                            </div>

                            <p>{item.noiDung}</p>

                        </div>
                    ))}

                </div>

                <div className="col-lg-4">

                    <div
                        className="card shadow p-3"
                        style={{
                            position: "sticky",
                            top: "100px"
                        }}
                    >
                        <h4>${room.giaTien} / đêm</h4>
                        <input
                            type="date"
                            className="form-control mb-2"
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Số khách"
                            className="form-control mb-3"
                        />
                        <button className="btn btn-danger w-100">
                            Đặt phòng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;