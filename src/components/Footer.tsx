import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5 py-5">
      <div className="container-lg">
        <div className="row mb-4">
          {/* About */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Giới thiệu</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-muted text-decoration-none">Airbnb hoạt động như thế nào</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Trang tin tức</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Nhà đầu tư</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Cơ hội nghề nghiệp</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Cộng đồng</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-muted text-decoration-none">Đa dạng & Sự thuộc về</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Khả năng tiếp cận</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Đối tác</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Thẻ quà tặng</Link></li>
            </ul>
          </div>

          {/* Host */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Đón tiếp khác</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-muted text-decoration-none">Cho thuê nhà</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Tổ chức trải nghiệm</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Cho thuê có trách nhiệm</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Trung tâm Tài nguyên</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Hỗ trợ</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-muted text-decoration-none">Trung tâm trợ giúp</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Thông tin an toàn</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Tùy chọn hủy</Link></li>
              <li><Link to="#" className="text-muted text-decoration-none">Báo cáo vấn đề</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-top pt-4">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="text-muted small mb-0">© 2024 Airbnb, Inc. All rights reserved</p>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end gap-3">
                <i className="fab fa-facebook-f" style={{ fontSize: '1.2rem' }} ></i>
                <i className="fab fa-twitter" style={{ fontSize: '1.2rem' }} ></i>
                <i className="fab fa-instagram" style={{ fontSize: '1.2rem' }} ></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}