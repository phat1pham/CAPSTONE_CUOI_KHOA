import React from 'react';

export default function ReportIssue() {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Báo cáo vấn đề</h1>
      <div className="row">
        <div className="col-md-8">
          <p className="lead">Gặp phải một vấn đề? Chúng tôi ở đây để giúp. Hãy báo cáo nó để chúng tôi có thể điều tra.</p>
          
          <h3 className="mt-4">Loại vấn đề</h3>
          <p>Bạn có thể báo cáo các vấn đề như:</p>
          <ul>
            <li>Danh sách không chính xác hoặc giả mạo</li>
            <li>Hành vi không an toàn hoặc x�fensive</li>
            <li>Lừa đảo hoặc gian lận</li>
            <li>Vi phạm bản quyền hoặc sở hữu trí tuệ</li>
            <li>Các vấn đề khác</li>
          </ul>
          
          <h3 className="mt-4">Cách báo cáo</h3>
          <p>Để báo cáo một vấn đề, vui lòng cung cấp thông tin chi tiết về vấn đề và liên hệ với nhóm hỗ trợ của chúng tôi. Chúng tôi sẽ điều tra ngay lập tức.</p>
          
          <h3 className="mt-4">Chúng tôi sẽ làm gì</h3>
          <p>Sau khi bạn báo cáo một vấn đề, nhóm an toàn của chúng tôi sẽ xem xét nó. Nếu chúng tôi xác định rằng có vi phạm chính sách cộng đồng, chúng tôi sẽ thực hiện hành động thích hợp, có thể bao gồm xóa danh sách hoặc đình chỉ tài khoản.</p>
        </div>
      </div>
    </div>
  );
}
