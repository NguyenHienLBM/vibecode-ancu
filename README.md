# HIENCANON

Website giới thiệu sản phẩm và thiết bị, sử dụng HTML/CSS/JavaScript thuần.

## Bắt đầu
Mở `index-lbm.html` bằng trình duyệt hoặc dùng Live Server trong VS Code. Cần Internet để tải các tài nguyên bên ngoài. Không cần cài thư viện hoặc chạy build.

## Tài liệu
- [Tài liệu dự án](docs/DOCUMENT-DU-AN.md)
- [Kiến trúc và cấu trúc thư mục](.codex/architecture.md)
- [Quy tắc phát triển](.codex/rules.md)
- [Hướng dẫn dành cho Codex](AGENTS.md)

`assets/` dành cho tài nguyên cục bộ mới; `scripts/` dành cho tiện ích và `tests/` dành cho kiểm thử khi cần. Các thư mục này chưa được tích hợp vào trang hiện tại.

Phiên bản trong `lbm-landing/dist/` là bản độc lập. Hosting hiện có phục vụ bản đó; xem tài liệu kiến trúc trước khi triển khai.

## Repository

Mã nguồn: https://github.com/NguyenHienLBM/vibecode-ancu

Sau khi sửa và lưu tệp, dùng `git add <tệp>`, `git commit -m "Mô tả thay đổi"` và `git push` để đồng bộ lên nhánh `main`. Thư mục `lbm-landing` giữ repository cục bộ độc lập; repository gốc lưu các tệp của phiên bản này, không lưu thư mục `.git` bên trong. Ảnh kiểm tra trong `artifacts/` và PDF học tập ở gốc không được đưa lên repository.
## Triển khai An Cư trên Vercel

Repository GitHub: `NguyenHienLBM/vibecode-ancu`, nhánh production `main`, Root Directory là gốc repository. `vercel.json` dùng preset Other; lệnh `node scripts/build-vercel.mjs` sao chép hai trang An Cư/Lâm An và `assets/` vào `public/`. Chỉ thư mục này được xuất bản; tài liệu và phiên bản HIENCANON/LBM không nằm trong bản triển khai. Đường dẫn `/` được rewrite tới `index (1).html` mà không đổi tên tệp nguồn. Tên project và domain yêu cầu là `vibecode-ancu` / `vibecode-ancu.vercel.app`; cần xác nhận trên Vercel khi tạo project, chưa xem là đã triển khai.