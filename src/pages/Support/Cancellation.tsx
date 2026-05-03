import React from 'react';

export default function Cancellation() {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Tùy chọn hủy</h1>
      <div className="row">
        <div className="col-md-8">
          <p className="lead">Hiểu rõ hơn về các chính sách hủy và cách chúng ảnh hưởng đến việc hoàn lại tiền của bạn.</p>
          
          <h3 className="mt-4">Chính sách hủy linh hoạt</h3>
          <p>Chủ nhà có thể chọn chính sách hủy linh hoạt, cho phép khách hủy gần đến ngày nhận phòng và nhận hoàn lại tiền đầy đủ.</p>
          
          <h3 className="mt-4">Chính sách hủy vừa phải</h3>
          <p>Chủ nhà có thể chọn chính sách hủy vừa phải, cho phép khách hủy trước một khoảng thời gian nhất định để nhận hoàn lại tiền đầy đủ.</p>
          
          <h3 className="mt-4">Chính sách hủy chặt chẽ</h3>
          <p>Chủ nhà có thể chọn chính sách hủy chặt chẽ, cho phép khách hủy trước một khoảng thời gian dài để nhận hoàn lại tiền một phần.</p>
          
          <h3 className="mt-4">Hủy hoàn toàn miễn phí</h3>
          <p>Khách có thể hủy hoàn toàn miễn phí cho đến 24 giờ sau khi đặt phòng, miễn là thời gian này diễn ra trước 7 ngày khi đến.</p>
        </div>
      </div>
    </div>
  );
}
