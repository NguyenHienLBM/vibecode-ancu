# Tài liệu dự án landing page HIENCANON

Ngày cập nhật: 08/11/2026.

## 1. Tổng quan

Dự án giao diện giới thiệu sản phẩm, thiết bị in ấn và hình ảnh, tham khảo website https://lbm.vn/. Phiên bản đang được chỉnh sửa trong IDE là `index-lbm.html`, đã đổi tông màu sang xanh lá nhạt và thay logo đầu trang bằng chữ **HIENCANON**.

Đây là mã giao diện phía trình duyệt. Dự án chưa có hệ thống quản trị, cơ sở dữ liệu, API bán hàng hoặc xử lý đơn hàng riêng cho HIENCANON.

## 2. Cấu trúc và các phiên bản

```text
Buổi 1/
├── docs/
│   └── DOCUMENT-DU-AN.md      # Tài liệu này
├── index-lbm.html            # Bản đang chỉnh sửa: xanh lá nhạt, logo HIENCANON
├── index (1).html            # Tệp HTML có sẵn, chưa xác định vai trò trong bản hiện tại
└── lbm-landing/
    ├── .openai/
    │   └── hosting.json      # Cấu hình Sites cho bản landing page ban đầu
    └── dist/
        ├── index.html       # Bản landing page được dựng ban đầu
        ├── style.css        # Giao diện của bản trong dist
        ├── app.js           # Bộ lọc và cửa sổ chi tiết sản phẩm
        └── assets/          # Ảnh sản phẩm, logo và banner
```

Hai bản HTML hoạt động độc lập. Thay đổi logo và màu trong `index-lbm.html` không tự cập nhật sang `lbm-landing/dist/index.html`. Cấu hình hosting hiện trỏ đến thư mục `dist`, vì vậy xuất bản cấu hình đó sẽ sử dụng bản trong `dist`, không phải bản HIENCANON ở thư mục gốc.

## 3. Công nghệ

| Thành phần | `index-lbm.html` | `lbm-landing/dist` |
| --- | --- | --- |
| Nội dung | HTML tham khảo từ website LBM | HTML landing page riêng |
| Giao diện | CSS từ website gốc và khối CSS tùy chỉnh nội tuyến | `style.css`, font Be Vietnam Pro từ Google Fonts |
| Tương tác | JavaScript bên ngoài từ website gốc | JavaScript thuần trong `app.js` |
| Hình ảnh | Chủ yếu tải từ các địa chỉ bên ngoài | Ảnh trong `assets/` |
| Công cụ build | Không cần | Không cần |
| Backend riêng | Chưa có | Chưa có |

Việc có đường dẫn và tên tài nguyên WordPress trong HTML không có nghĩa dự án cục bộ đã cài WordPress.

## 4. Các phần giao diện

### Bản HIENCANON đang chỉnh sửa

- Khu vực đầu trang với logo chữ HIENCANON.
- Menu sản phẩm và danh mục thiết bị.
- Khu vực tìm kiếm, giỏ hàng được giữ từ HTML tham khảo.
- Banner, danh sách sản phẩm, hình ảnh và thông tin giá tham khảo.
- Khu vực nội dung giới thiệu, chân trang và liên kết hỗ trợ.

Các liên kết sản phẩm, tìm kiếm, giỏ hàng, hotline và Zalo phần lớn vẫn trỏ tới dịch vụ hoặc thông tin của LBM. Chưa chuyển các chức năng này sang HIENCANON.

### Bản landing page trong `dist`

- Banner giới thiệu, nhóm thương hiệu và danh mục thiết bị.
- Bộ lọc sản phẩm: tất cả, in ấn, hình ảnh, thiết bị khác.
- Cửa sổ thông tin sản phẩm với nút gọi tư vấn.
- Các phần giải pháp, giới thiệu và liên hệ.
- Bố cục có quy tắc responsive cho màn hình nhỏ.

Sản phẩm trong bản này là nội dung minh họa giao diện. Không có quy trình đặt hàng hoặc thanh toán riêng.

## 5. Thiết kế HIENCANON

Khối `<style id="light-green-theme">` nằm trong phần `<head>` của `index-lbm.html` chứa các tùy chỉnh.

| Vai trò | Mã màu |
| --- | --- |
| Xanh lá nhạt chủ đạo | `#c8e6c9` |
| Nền xanh rất nhạt | `#f1f8ef` |
| Màu nhấn xanh lá | `#347a45` |
| Chữ xanh đậm | `#234b2c` |
| Viền xanh | `#9bc89c` |

Logo hiện là chữ HTML, không phải ảnh. Liên kết dùng class `hiencanon-logo`, phần CANON dùng class `hiencanon-logo-accent`. Cỡ chữ co giãn theo màn hình bằng `clamp(20px, 2.4vw, 30px)`. Liên kết logo đưa người dùng về đầu trang.

Các màu trong logo, banner hoặc ảnh sản phẩm bên ngoài không đổi theo CSS giao diện.

## 6. Cách mở và chạy

### Xem nhanh

Mở `index-lbm.html` bằng trình duyệt. Cần kết nối Internet để tải CSS, JavaScript, ảnh và các tài nguyên bên ngoài.

### Phát triển bằng VS Code

1. Mở thư mục dự án trong VS Code.
2. Nếu đã cài Live Server, nhấp phải `index-lbm.html` rồi chọn **Open with Live Server**.
3. Sau khi sửa và lưu tệp, tải lại trang để kiểm tra.

Để xem bản landing page ban đầu, mở `lbm-landing/dist/index.html` thay cho `index-lbm.html`.

## 7. Hướng dẫn chỉnh sửa

### Đổi màu

Tìm `light-green-theme` trong `index-lbm.html`, sau đó sửa các biến `--lbm-green-light`, `--lbm-green-soft`, `--lbm-green` và `--lbm-green-dark`. Các giá trị màu đặt trực tiếp trong quy tắc logo và viền cần sửa tương ứng nếu muốn đồng bộ hoàn toàn.

### Đổi logo

Tìm liên kết có `class="hiencanon-logo"`. Sửa nội dung chữ bên trong. Nếu chuyển sang logo ảnh, thay phần chữ bằng thẻ `<img>` có thuộc tính `alt="HIENCANON"` và điều chỉnh kích thước CSS.

### Đổi sản phẩm và banner

Trong `index-lbm.html`, tìm tên sản phẩm hoặc URL ảnh tương ứng, rồi sửa nội dung, `src`, `alt`, giá và liên kết. Tải ảnh về thư mục tài nguyên cục bộ nếu cần chủ động quản lý.

Trong bản `dist`, dữ liệu danh sách sản phẩm nằm trong mảng `items` của `app.js`; danh mục nằm trong mảng `cats`. Khi thêm ảnh, lưu vào `dist/assets/` và cập nhật đúng tên tệp.

### Đổi thông tin doanh nghiệp

Cập nhật tên doanh nghiệp, hotline, địa chỉ, Zalo, mạng xã hội và các liên kết trong toàn bộ HTML. Logo đã đổi sang HIENCANON nhưng tiêu đề trang, mô tả SEO, canonical, dữ liệu có cấu trúc và nhiều nội dung vẫn mang thông tin LBM.

## 8. Trạng thái kiểm tra

| Hạng mục | Trạng thái |
| --- | --- |
| Chèn khối CSS xanh lá vào `index-lbm.html` | Đã kiểm tra có đúng một khối tùy chỉnh |
| Thay logo đầu trang bằng HIENCANON | Đã kiểm tra mã nguồn |
| Cú pháp `dist/app.js` | Đã chạy `node --check` thành công khi tạo bản ban đầu |
| Kiểm tra trực quan trên trình duyệt | Chưa thực hiện |
| Kiểm tra thao tác trên điện thoại thực tế | Chưa thực hiện |
| Tìm kiếm, giỏ hàng và dịch vụ ngoài | Chưa xác minh hoạt động với bản cục bộ |
| Xuất bản trực tuyến | Chưa hoàn tất |

## 9. Công việc cần làm trước khi đưa vào sử dụng

1. Chọn bản mã nguồn chính để phát triển và triển khai, tránh chỉnh sửa nhầm hai phiên bản.
2. Thay toàn bộ thông tin LBM bằng thông tin thực tế của HIENCANON, gồm cả metadata và liên kết hỗ trợ.
3. Rà soát các script analytics, quảng cáo và API bên ngoài còn giữ từ HTML tham khảo; cấu hình theo tài khoản và nhu cầu của HIENCANON.
4. Xác nhận quyền sử dụng hình ảnh, nội dung và dấu hiệu thương hiệu trước khi phát hành.
5. Xây dựng hoặc tích hợp chức năng tìm kiếm, giỏ hàng và thanh toán nếu cần bán hàng thực tế.
6. Kiểm tra desktop/mobile, menu, ảnh, liên kết, tương phản màu và khả năng thao tác bằng bàn phím.
7. Cấu hình hosting theo đúng bản đã chọn, sau đó kiểm tra trang sau triển khai.

## 10. Bàn giao hiện tại

Tệp chính cho các chỉnh sửa gần nhất là **`index-lbm.html`**. Bản này đã có màu xanh lá nhạt và logo chữ HIENCANON. Không cần cài thư viện hoặc chạy build để mở xem; các tài nguyên ngoài vẫn phụ thuộc kết nối Internet và website cung cấp chúng.

## 11. Trang dự án nghỉ dưỡng sinh thái (15/11/2026)

`index (1).html` là trang chủ bất động sản An Cư, độc lập với HIENCANON. Trang đã có mục điều hướng **Dự án** và thẻ dự án Lâm An, dẫn tới `du-an-nghi-duong.html`. Tab bộ lọc Dự án trong tìm kiếm vẫn giữ chức năng lọc danh sách hiện có.

Trang Lâm An dùng `assets/css/nghi-duong.css`, `assets/js/nghi-duong.js` và phối cảnh SVG cục bộ `assets/images/lam-an-landscape.svg`; mở trực tiếp HTML hoặc qua Live Server, không cần build. Nội dung là ý tưởng minh họa; chưa có vị trí, giá, quy mô hoặc dịch vụ đặt phòng được xác nhận. Công cụ soạn lời nhắn chỉ chạy trên thiết bị, không gửi dữ liệu.

### Cập nhật font và hiệu ứng (15/11/2026)

- Hai trang An Cư/Lâm An dùng Be Vietnam Pro hỗ trợ tiếng Việt, tải từ `assets/fonts/` với giấy phép OFL. Không còn tải font từ Google Fonts.
- CSS và JavaScript chung: `assets/css/page-polish.css`, `assets/js/page-polish.js`. Điều chỉnh khoảng cách dòng, tiêu đề, menu tablet, thẻ trên điện thoại; bổ sung hiệu ứng khi cuộn, hover và nút về đầu trang. Có hỗ trợ chế độ giảm chuyển động.
- Đã kiểm tra bằng Chrome headless tại viewport 375/768/1440px: font cục bộ tải được, không tràn ngang, không có lỗi JavaScript chưa xử lý; menu mobile, lưu tin và soạn lời nhắn hoạt động. Đã xem ảnh chụp trang chủ desktop và hai trang mobile. Đây là kiểm tra mô phỏng trình duyệt, chưa phải thử trên thiết bị vật lý.
