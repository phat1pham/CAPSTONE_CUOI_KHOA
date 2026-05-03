import React from 'react';

export default function News() {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Trang tin tức</h1>
      <div className="row">
        <div className="col-md-8">
          <p className="lead">Cập nhật tin tức mới nhất từ Airbnb</p>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tin tức và cập nhật mới nhất</h5>
              <p className="card-text">Theo dõi những tin tức, sự kiện và cập nhật mới nhất từ Airbnb và cộng đồng của chúng tôi.</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Báo chí & Tài nguyên truyền thông</h5>
              <p className="card-text">Tìm hiểu thêm về lịch sử Airbnb, các bài viết báo chí và tài nguyên truyền thông.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
