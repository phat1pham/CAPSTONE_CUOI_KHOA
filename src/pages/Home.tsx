import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RoomCard from "../components/RoomCard";
// import { RoomList } from '../types/type';

export default function Home() {
  return (
    <div className="min-vh-100">
      <div className="hero-section py-5">
        <div className="container-lg">
          <h1 className="display-4 fw-bold mb-3">
            Tìm kỳ nghỉ tiếp theo của bạn
          </h1>
          <p className="text-muted fs-5 mb-4">
            Khám phá những ngôi nhà trên khắp Việt Nam
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="container-lg py-5">
        <h2 className="display-5 fw-bold mb-4">
          Khám phá nhưng điểm đến gần đây
        </h2>
        <RoomCard />
      </div>

      <div className="bg-light py-5">
        <div className="container-lg">
          <h2 className="display-5 fw-bold mb-4">Ở bất cứ đâu</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="/img/hinh-anh-ngoi-nha-17.jpg"
                  className="card-img-top"
                  alt="Toàn bộ ngôi nhà"
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-5">Toàn bộ ngôi nhà</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="/img/homestay-o-ha-giang.jpg"
                  className="card-img-top"
                  alt="Chỗ ở độc đáo"
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-5">Chỗ ở độc đáo</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="/img/Co-To-Island-Beach-Village-Homestay-1-1.jpg"
                  className="card-img-top"
                  alt="Trạng thái với thiên nhiên"
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    Trạng thái với thiên nhiên
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="/img/11-buc-hinh-nen-thu-cung-dang-yeu-3.jpg.webp"
                  className="card-img-top"
                  alt="Cho phép mang theo thú cưng"
                  style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    Cho phép mang theo thú cưng
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
