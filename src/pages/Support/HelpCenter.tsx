import React from 'react';

export default function HelpCenter() {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Trung tâm trợ giúp</h1>
      <div className="row">
        <div className="col-md-8">
          <p className="lead">Tìm câu trả lời cho các câu hỏi phổ biến và nhận hỗ trợ từ Airbnb.</p>
          
          <div className="accordion mb-4" id="helpAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                  Làm cách nào để đặt phòng?
                </button>
              </h2>
              <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Bạn có thể tìm kiếm danh sách bằng cách sử dụng thanh tìm kiếm, lọc theo tiêu chí của bạn, rồi nhấp vào danh sách để xem chi tiết. Sau đó, nhấp vào nút "Đặt" để bắt đầu quá trình đặt phòng.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                  Làm cách nào tôi có thể hủy đơn đặt phòng?
                </button>
              </h2>
              <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Bạn có thể hủy đơn đặt phòng từ trang "Chuyến đi" của bạn. Hãy nhớ rằng chính sách hủy của chủ nhà sẽ ảnh hưởng đến số tiền hoàn lại của bạn.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                  Làm cách nào tôi có thể liên hệ với chủ nhà?
                </button>
              </h2>
              <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                <div className="accordion-body">
                  Một khi đơn đặt phòng của bạn được xác nhận, bạn sẽ có thể gửi tin nhắn trực tiếp đến chủ nhà thông qua ứng dụng hoặc trang web Airbnb.
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="mt-4">Cần thêm sự giúp đỡ?</h3>
          <p>Nếu bạn không tìm thấy câu trả lời, hãy liên hệ với nhóm hỗ trợ của chúng tôi.</p>
        </div>
      </div>
    </div>
  );
}
