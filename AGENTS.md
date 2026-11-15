# Hướng dẫn làm việc với dự án HIENCANON

Trước khi chỉnh sửa, đọc:
1. `.codex/rules.md` — quy tắc phát triển và kiểm tra.
2. `.codex/architecture.md` — kiến trúc, đường dẫn và ranh giới các phiên bản.
3. `docs/DOCUMENT-DU-AN.md` — bối cảnh và yêu cầu dự án.

Khi đổi cấu trúc hoặc cách vận hành, cập nhật các tài liệu liên quan trong cùng lần thay đổi.

## Lệnh tạo trang `/tao-page`

Khi người dùng nhập `/tao-page` (có hoặc không kèm mô tả), áp dụng skill `tao-page` tại `C:/Users/THINKPAD/.codex/skills/tao-page/SKILL.md`. Phần sau lệnh là yêu cầu tạo trang; bỏ qua dấu `\` kết thúc nếu có. Đây là quy ước lệnh bằng văn bản trong dự án, không phải đăng ký menu slash của ứng dụng. Có thể gọi skill trực tiếp bằng `$tao-page`.

Skill phải tạo mã nguồn thực tế, bố cục responsive gồm banner, thông tin nổi bật, giá trị/tiện ích và CTA/liên hệ phù hợp, kèm JavaScript cho các tương tác cần thiết. Nếu không có mô tả, dùng bối cảnh HIENCANON trong tài liệu. Giữ đúng ranh giới các phiên bản và không tự ghi đè trang chủ khi yêu cầu chỉ là tạo trang mới.
