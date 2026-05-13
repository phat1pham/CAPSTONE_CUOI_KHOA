import { Link } from "react-router-dom";

const onlineExperiences = [
  {
    id: 1,
    title: "Nấu ăn cùng đầu bếp Ý",
    host: "Marco",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    price: 25,
  },
  {
    id: 2,
    title: "Yoga thư giãn tại nhà",
    host: "Sophia",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    price: 18,
  },
  {
    id: 3,
    title: "Workshop chụp ảnh online",
    host: "David",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    price: 30,
  },
  {
    id: 4,
    title: "Thiền chữa lành",
    host: "Emma",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    price: 20,
  },
  {
    id: 5,
    title: "Làm bánh cùng chuyên gia",
    host: "Anna",
    image:
      "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0",
    price: 22,
  },
  {
    id: 6,
    title: "Học vẽ digital art",
    host: "Lucas",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    price: 35,
  },
];

const OnlineExperience = () => {
  return (
    <div className="container py-5">

      <div
        className="
          text-center
          mb-5
          animate__animated
          animate__fadeInDown
        "
      >
        <h1 className="fw-bold display-4">
          Trải nghiệm trực tuyến
        </h1>

        <p className="text-muted fs-5">
          Tham gia workshop và hoạt động online
          từ bất cứ đâu
        </p>
      </div>

      <div className="row g-4">

        {onlineExperiences.map((item, index) => (
          <div
            className="col-12 col-sm-6 col-lg-4"
            key={item.id}
          >
            <div
              className="
                card
                border-0
                shadow-sm
                h-100
                animate__animated
                animate__fadeInUp
              "
              style={{
                overflow: "hidden",
                borderRadius: "20px",
                transition: "0.35s",
                cursor: "pointer",
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "";
              }}
            >

              <div
                style={{
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{
                    height: "280px",
                    objectFit: "cover",
                    transition: "0.5s",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                  }}
                >
                  <span className="badge bg-danger px-3 py-2">
                    ONLINE
                  </span>
                </div>

              </div>

              <div className="card-body">

                <h5 className="fw-bold">
                  {item.title}
                </h5>

                <p className="text-muted">
                  Host bởi {item.host}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">

                  <span className="fw-bold text-danger">
                    ${item.price}
                  </span>

                  <button className="btn btn-dark rounded-pill px-4">
                    Tham gia
                  </button>

                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default OnlineExperience;