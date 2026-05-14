import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocation } from "../api/roomApi";
import type { Location } from "../types/room.type";

const ExperienceViews = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation()
      .then((res) => {
        setLocations(
          (res.data.content || []).slice(0, 8)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Đang tải trải nghiệm...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div
        className="
          text-center
          mb-5
          animate__animated
          animate__backInDown
        "
      >
      </div>

      <div className="row g-4">

        {locations.map((item, index) => (
          <div
            className="col-12 col-sm-6 col-lg-3"
            key={item.id}
          >
            <Link
              to={`/roomList/${item.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
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
                    src={item.hinhAnh}
                    alt={item.tenViTri}
                    className="card-img-top"
                    style={{
                      height: "280px",
                      objectFit: "cover",
                      transition: "0.5s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1)";
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 15,
                      left: 15,
                      color: "white",
                    }}
                  >
                    <h4 className="fw-bold mb-0">
                      {item.tenViTri}
                    </h4>
                  </div>
                </div>

                <div className="card-body">

                  <p className="text-muted mb-3">
                    {item.tinhThanh} - {item.quocGia}
                  </p>

                </div>

              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ExperienceViews;