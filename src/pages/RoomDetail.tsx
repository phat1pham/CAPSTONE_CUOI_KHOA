import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomDetail } from "../api/roomApi";
import type { Room } from "../types/room.type";
import { getCommentByRoom } from "../api/roomApi";
import type { Comment } from "../types/room.type";
import { addComment } from "../api/roomApi";
import { useNavigate } from "react-router-dom";
import { bookingRoom, getAllBooking } from "../api/roomApi";
import type { Booking } from "../types/room.type";
import type { User } from "../types/type";

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [noiDung, setNoiDung] = useState("");
    const [sao, setSao] = useState(5);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();
    const [ngayDen, setNgayDen] = useState("");
    const [ngayDi, setNgayDi] = useState("");
    const [soLuongKhach, setSoLuongKhach] = useState(1);
    const [loadingComment, setLoadingComment] = useState(false);
    const [commentPage, setCommentPage] = useState(1);
    const pageSize = 5;
    const user: User | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!) as User
        : null;

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
                setComments(
                    res.data.content.sort(
                        (a: Comment, b: Comment) =>
                            new Date(b.ngayBinhLuan).getTime() -
                            new Date(a.ngayBinhLuan).getTime()
                    )
                );
            })
            .catch((err) => console.log(err));

    }, [id]);

    const handleComment = async () => {

        if (!user) {
            alert("Vui lòng đăng nhập");
            navigate("/login");
            return;
        }

        if (!noiDung.trim()) {
            alert("Vui lòng nhập nội dung");
            return;
        }

        try {
            setLoadingComment(true);

            const payload = {
                maPhong: Number(id),
                maNguoiBinhLuan: user.id,
                ngayBinhLuan: new Date().toISOString(),
                noiDung: noiDung.trim(),
                saoBinhLuan: sao
            };

            await addComment(payload);

            const res = await getCommentByRoom(Number(id));

            setComments(
                res.data.content.sort(
                    (a: Comment, b: Comment) =>
                        new Date(b.ngayBinhLuan).getTime() -
                        new Date(a.ngayBinhLuan).getTime()
                )
            );

            setNoiDung("");
            setSao(5);

        } catch (err) {
            console.log(err);
        } finally {
            setLoadingComment(false);
        }
    };

    const totalPage = Math.ceil(comments.length / pageSize);

    const paginatedComments = comments.slice(
        (commentPage - 1) * pageSize,
        commentPage * pageSize
    );

    const getPages = () => {
        const pages: (number | string)[] = [];

        let start = Math.max(1, commentPage - 2);
        let end = Math.min(totalPage, commentPage + 2);

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPage) {
            if (end < totalPage - 1) pages.push("...");
            pages.push(totalPage);
        }

        return pages;
    };


    if (!room) return <div>Loading...</div>;
    const data = {
        tenPhong: room.tenPhong || "Chưa có tên phòng",
        hinhAnh: room.hinhAnh || "https://via.placeholder.com/800x400",
        moTa: room.moTa || "Chưa có mô tả",
        khach: room.khach ?? 0,
        phongNgu: room.phongNgu ?? 0,
        giuong: room.giuong ?? 0,
        phongTam: room.phongTam ?? 0,
        giaTien: room.giaTien ?? 0,
    };
    const averageRating =
        comments.length > 0
            ? (
                comments.reduce(
                    (total, item) =>
                        total + item.saoBinhLuan,
                    0
                ) / comments.length
            ).toFixed(1)
            : 0;
    const handleBooking = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Vui lòng đăng nhập");
            navigate("/login");
            return;
        }

        if (!ngayDen || !ngayDi) {
            alert("Vui lòng chọn ngày");
            return;
        }

        if (new Date(ngayDi) <= new Date(ngayDen)) {
            alert("Ngày trả phòng phải lớn hơn ngày nhận phòng");
            return;
        }

        if (!user) return;

        try {

            const res = await getAllBooking();
            const bookings = res.data.content || [];


            const isBooked = isRoomBooked(
                bookings,
                Number(id),
                ngayDen,
                ngayDi
            );

            if (isBooked) {
                alert("Phòng đã có người đặt trong khoảng thời gian này");
                return;
            }

            await bookingRoom({
                maPhong: Number(id),
                ngayDen,
                ngayDi,
                soLuongKhach,
                maNguoiDung: user.id,
            });

            alert("Đặt phòng thành công 🎉");
            navigate("/profile");

        } catch (err) {
            console.log(err);
            alert("Lỗi khi đặt phòng");
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const isRoomBooked = (
        bookings: Booking[],
        maPhong: number,
        ngayDen: string,
        ngayDi: string
    ) => {
        return bookings.some((item) => {
            if (item.maPhong !== maPhong) return false;

            const start = new Date(item.ngayDen).getTime();
            const end = new Date(item.ngayDi).getTime();

            const newStart = new Date(ngayDen).getTime();
            const newEnd = new Date(ngayDi).getTime();

            // check overlap
            return newStart < end && newEnd > start;
        });
    };

    const colors = [
        "#0d6efd",
        "#198754",
        "#dc3545",
        "#ffc107",
        "#6f42c1",
        "#fd7e14",
    ];

    const renderAvatar = (item: Comment) => {
        if (item.avatar) {
            return (
                <img
                    src={item.avatar}
                    className="rounded-circle me-2"
                    style={{ width: 40, height: 40, objectFit: "cover" }}
                    alt="avatar"
                />
            );
        }

        const firstChar =
            item.tenNguoiBinhLuan?.charAt(0)?.toUpperCase() || "?";

        const color = colors[item.id % colors.length];

        return (
            <div
                className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: color,
                    color: "#fff",
                    fontWeight: "bold",
                }}
            >
                {firstChar}
            </div>
        );
    };

    return (
        <div className="container mt-4">

            <div className="row g-4">
                <h2>{room.tenPhong}</h2>

                <img
                    src={data.hinhAnh || undefined}
                    alt={data.tenPhong}
                    className="img-fluid rounded mb-4"
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover"
                    }}
                />
                <div className="col-12 col-lg-8">
                    <p className="text-muted">
                        {data.khach} khách · {data.phongNgu} phòng ngủ · {data.giuong} giường · {data.phongTam} phòng tắm
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
                            ? data.moTa
                            : data.moTa.slice(0, 150)}
                    </p>

                    {data.moTa.length > 150 && (
                        <button
                            className="btn btn-link p-0"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Thu gọn" : "Hiển thị thêm"}
                        </button>
                    )}
                    <hr />
                    <h4>Tiện nghi</h4>
                    <div className="row g-4">

                        {room.wifi && <div className="col-md-6">📶 Wifi</div>}
                        {room.dieuHoa && <div className="col-md-6">❄️ Điều hoà</div>}
                        {room.tivi && <div className="col-md-6">📺 TV</div>}
                        {room.bep && <div className="col-md-6">🍳 Bếp</div>}
                        {room.doXe && <div className="col-md-6">🚗 Đỗ xe</div>}
                        {room.hoBoi && <div className="col-md-6">🏊 Hồ bơi</div>}

                    </div>
                    <hr />
                    <h4 className="mb-4">
                        ⭐ {averageRating} · {comments.length} đánh giá
                    </h4>

                    <div className="card p-3 mb-4">
                        <textarea className="form-control mb-3" rows={3} value={noiDung} onChange={(e) => setNoiDung(e.target.value)} />
                        <div className="d-flex justify-content-between"> <div> {[1, 2, 3, 4, 5].map((star) =>
                            (<span key={star} style={{ fontSize: 24, cursor: "pointer", color: star <= (hover || sao) ? "#ffc107" : "#ccc" }} onClick={() => setSao(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} >★</span>))}
                        </div>
                            <button className="btn btn-danger" onClick={handleComment} disabled={loadingComment}>
                                {loadingComment ? "Đang gửi..." : "Gửi"}
                            </button>
                        </div>
                    </div>

                    {comments.length === 0 && (
                        <p>Chưa có bình luận</p>
                    )}

                    {paginatedComments.map((item) => (
                        <div key={item.id} className="mb-3 border-bottom pb-3">

                            <div className="d-flex align-items-center mb-2">
                                {renderAvatar(item)}

                                <div>
                                    <strong>{item.tenNguoiBinhLuan}</strong>
                                    <div className="text-muted" style={{ fontSize: "14px" }}>
                                        {formatDate(item.ngayBinhLuan)}
                                    </div>
                                </div>

                            </div>

                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} style={{
                                        color: star <= item.saoBinhLuan ? "#ffc107" : "#e4e5e9"
                                    }}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            <p>{item.noiDung}</p>

                        </div>
                    ))}
                    <div className="d-flex justify-content-center">
                        <ul className="pagination">
                            <li className={`page-item ${commentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setCommentPage(commentPage - 1)}> Prev </button>
                            </li> {getPages().map((p, i) => (<li key={i} className={`page-item ${commentPage === p ? "active" : ""} ${p === "..." ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => typeof p === "number" && setCommentPage(p)}> {p} </button>
                            </li>))} <li className={`page-item ${commentPage === totalPage ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setCommentPage(commentPage + 1)}> Next </button>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="col-12 col-lg-4">
                    <div className="booking-card card shadow p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">
                                ${data.giaTien || 0}
                                <span className="fs-6 text-muted"> / đêm</span>
                            </h4>
                            <div>
                                ⭐ 4.8 (18 đánh giá)
                            </div>
                        </div>
                        <div className="border rounded mb-3">

                            <div className="row g-0">

                                <div className="col-6 border-end p-2">
                                    <label className="small text-muted">
                                        Nhận phòng
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control border-0 p-0"
                                        value={ngayDen}
                                        onChange={(e) => setNgayDen(e.target.value)}
                                    />
                                </div>

                                <div className="col-6 p-2">
                                    <label className="small text-muted">
                                        Trả phòng
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control border-0 p-0"
                                        value={ngayDi}
                                        onChange={(e) => setNgayDi(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="border-top p-2">
                                <label className="small text-muted">
                                    Khách
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    className="form-control border-0 p-0"
                                    value={soLuongKhach}
                                    onChange={(e) => setSoLuongKhach(Math.max(1, Number(e.target.value)))}
                                />
                            </div>

                        </div>
                        <button
                            className="btn btn-danger w-100"
                            onClick={handleBooking}
                        >
                            Đặt phòng
                        </button>

                        <div className="text-center text-muted mb-3">
                            Bạn vẫn chưa bị trừ tiền
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>${room.giaTien} x 5 đêm</span>
                            <span>$220</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Phí dịch vụ</span>
                            <span>$31</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold">
                            <span>Tổng</span>
                            <span>$252</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;