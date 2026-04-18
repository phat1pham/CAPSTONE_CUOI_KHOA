import React from "react";
import SearchBar from "../components/SearchBar";

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
          <SearchBar/>
        </div>
      </div>

      <div className="container-lg py-5">
        <h2 className="display-5 fw-bold mb-4">Khám phá nhưng điểm đến gần đây</h2>
      </div>

      <div className="bg-light py-5">
        <div className="container-lg">
          <h2 className="display-5 fw-bold mb-4">Ở bất cứ đâu</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fs-5">🏠 Toàn bộ ngôi nhà</h5>
                  <p className="card-text text-muted">Những ngôi nhà riêng tư tiện nghi, thoải mái với đầy đủ mọi thứ bạn cần.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fs-5">👥 Cùng người dân địa phương</h5>
                  <p className="card-text text-muted">Ở cùng một chủ nhà đang háo hức giới thiệu thế giới của họ cho bạn</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fs-5">🌍 Khám phá những nơi ở độc đáo</h5>
                  <p className="card-text text-muted">Những ngôi nhà trên nước, nhà trong cây, và nhiều hơn nữa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
