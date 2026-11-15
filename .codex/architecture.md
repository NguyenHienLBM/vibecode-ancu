# Kiến trúc dự án HIENCANON

## Hiện trạng
Dự án là website tĩnh phía trình duyệt, chưa có backend, cơ sở dữ liệu hoặc quy trình thanh toán riêng. Bản chính hiện tại là `index-lbm.html`, chứa HTML và CSS tùy chỉnh, đồng thời sử dụng nhiều tài nguyên bên ngoài.

## Cấu trúc
```text
Buổi 1/
├── AGENTS.md                 # Điểm đọc hướng dẫn cho Codex
├── README.md                 # Hướng dẫn bắt đầu
├── .codex/                   # Quy tắc và kiến trúc
│   ├── README.md
│   ├── rules.md
│   └── architecture.md
├── assets/                   # Tài nguyên mới của bản HIENCANON
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── docs/
│   ├── DOCUMENT-DU-AN.md     # Tài liệu dự án hiện có
│   └── decisions/            # Ghi nhận quyết định kiến trúc
├── scripts/                  # Tiện ích phát triển khi cần
├── tests/                    # Kiểm thử khi có chức năng cần xác minh
├── index-lbm.html            # Điểm vào chính, giữ nguyên đường dẫn
├── index (1).html            # Tệp có sẵn, chưa xác định vai trò
└── lbm-landing/              # Phiên bản landing page độc lập
    ├── .openai/hosting.json
    └── dist/                 # HTML, CSS, JS và assets của bản cũ
```

Các PDF và ảnh học tập ở gốc được giữ nguyên. Các thư mục mới có `.gitkeep` để được lưu trong Git khi chưa có nội dung.

## Luồng hiển thị
Trình duyệt mở `index-lbm.html`, tải CSS, JavaScript và ảnh được tham chiếu trong HTML. Tài nguyên ngoài phụ thuộc Internet và nhà cung cấp. Thư mục `assets/` là nơi dành cho tài nguyên cục bộ mới; mã hiện có chưa được tách hoặc chuyển sang đây.

## Ranh giới phiên bản và triển khai
`index-lbm.html` và `lbm-landing/dist/index.html` hoạt động độc lập. Cấu hình hosting hiện có thuộc `lbm-landing` và trỏ đến `dist`; chỉnh sửa bản gốc không tự cập nhật bản này. Chưa có pipeline build chung. Trước khi triển khai HIENCANON cần chọn đúng thư mục xuất bản và kiểm tra tài nguyên được phục vụ đầy đủ.

## Hướng mở rộng
Chỉ tách CSS/JS hoặc bổ sung build khi có nhu cầu thực tế. Nếu thêm API, quản trị hoặc thanh toán, ghi quyết định vào `docs/decisions/` và cập nhật tài liệu này để phản ánh kiến trúc đã triển khai.

## Trang dự án sinh thái Lâm An

`index (1).html` hiện là trang chủ bất động sản An Cư. Mục `#projects` có liên kết đến `du-an-nghi-duong.html`, là trang giới thiệu ý tưởng khu nghỉ dưỡng minh họa, độc lập với HIENCANON. CSS, JavaScript và phối cảnh SVG lần lượt ở `assets/css/nghi-duong.css`, `assets/js/nghi-duong.js`, `assets/images/lam-an-landscape.svg`. Trang không cần build, không có backend; công cụ soạn/sao chép lời nhắn chỉ chạy cục bộ. Liên kết trở về trỏ đến `index%20(1).html#projects`.

Hai trang An Cư và Lâm An dùng chung `assets/css/page-polish.css` và `assets/js/page-polish.js` cho typography, hiệu ứng và nút về đầu trang. Font Be Vietnam Pro được lưu cục bộ tại `assets/fonts/`, kèm giấy phép `OFL.txt`; không cần Google Fonts. CSS chung được tải sau CSS riêng để điều chỉnh font và responsive. Nội dung vẫn hiển thị khi không có JavaScript; hiệu ứng tôn trọng `prefers-reduced-motion`.

Chạy `node scripts/check-page-layout.mjs` để kiểm tra bố cục/font ở 375, 768, 1440px và các tương tác cơ bản qua Chrome headless. Script dùng Node.js có WebSocket tích hợp và Chrome tại đường dẫn Windows được khai báo trong file; ảnh kiểm tra lưu tại `artifacts/layout-qa/`.

## Triển khai An Cư trên Vercel

Repository GitHub: `NguyenHienLBM/vibecode-ancu`, nhánh production `main`, Root Directory là gốc repository. `vercel.json` dùng preset Other; lệnh `node scripts/build-vercel.mjs` sao chép hai trang An Cư/Lâm An và `assets/` vào `public/`. Chỉ thư mục này được xuất bản; tài liệu và phiên bản HIENCANON/LBM không nằm trong bản triển khai. Đường dẫn `/` được rewrite tới `index (1).html` mà không đổi tên tệp nguồn. Tên project và domain yêu cầu là `vibecode-ancu` / `vibecode-ancu.vercel.app`; cần xác nhận trên Vercel khi tạo project, chưa xem là đã triển khai.