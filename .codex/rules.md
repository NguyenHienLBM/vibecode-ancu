# Quy tắc phát triển

## Phạm vi
- Bản đang phát triển: `index-lbm.html`, thương hiệu HIENCANON.
- Dùng HTML, CSS và JavaScript thuần; chỉ thêm framework hoặc công cụ build khi có yêu cầu cụ thể.
- Đọc kiến trúc trước khi sửa; không tự đồng bộ hai bản HTML độc lập.

## Mã nguồn và tài nguyên
- Lưu văn bản UTF-8; tài liệu viết bằng tiếng Việt.
- Đặt tên file mới bằng chữ thường, phân cách bằng dấu gạch ngang.
- CSS mới tách vào `assets/css/`, JavaScript vào `assets/js/` khi phù hợp; cập nhật tham chiếu HTML trong cùng thay đổi.
- Ảnh mới dùng `assets/images/`, font cục bộ dùng `assets/fonts/`.
- Ưu tiên HTML có ngữ nghĩa, ảnh có alt phù hợp, điều khiển dùng được bằng bàn phím và bố cục responsive.
- Không đưa khóa API, mật khẩu, token hoặc dữ liệu cá nhân vào mã nguồn và tài liệu.
- Không tự thay thông tin doanh nghiệp bằng dữ liệu phỏng đoán.

## Bảo toàn dự án
- Không di chuyển hoặc xóa tài liệu học tập, ảnh gốc và các phiên bản hiện có nếu chưa được yêu cầu.
- Không sửa `lbm-landing/dist/` để thực hiện yêu cầu chỉ dành cho bản HIENCANON ở thư mục gốc.
- Khi đổi đường dẫn tài nguyên, rà soát các liên kết tương đối và cấu hình hosting liên quan.
- Không tự xuất bản website khi nhiệm vụ chỉ yêu cầu chỉnh sửa cục bộ.

## Kiểm tra và bàn giao
- Với JavaScript được sửa, kiểm tra cú pháp bằng `node --check <đường-dẫn-file>` nếu có Node.js.
- Với thay đổi giao diện, kiểm tra desktop/mobile, menu, liên kết, ảnh và lỗi console khi có công cụ trình duyệt.
- Ghi rõ kiểm tra đã thực hiện và phần chưa thể kiểm tra; không ghi nhận kiểm tra chưa chạy là thành công.
- Cập nhật tài liệu kiến trúc khi thay đổi điểm vào, cấu trúc hoặc cách triển khai.
