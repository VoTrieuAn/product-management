* req thông điệp của người dùng gửi cho máy chủ
* res thông của máy chủ trả về cho phía người dùng
* req.query trả ra một object key=value sau dấu ? (gọi là query)
* req.params lấy ra các giá trị động (gọi là params) => ví dụ: /:status/ 

* Sử dụng phương thức GET khi cập nhật thông tin dễ bị lỗ hỏng khi có người cố tình truy cập vào đường dẫn đó nếu họ biết được (GET chỉ lấy ra)