/*  Đường dẫn Apps Script RIÊNG cho checklist quản gia và đánh giá khách.

    Đây KHÔNG phải đường dẫn của app quản lý. Script này chỉ ghi được checklist
    và đánh giá của đúng một mã booking — không đọc được doanh thu, giá phòng
    hay danh sách khách. Vì vậy để lộ cũng không mất dữ liệu kinh doanh.

    Dán URL /exec của project "T-House chất lượng" vào giữa hai dấu nháy: */

window.API_CHATLUONG = "https://script.google.com/macros/s/AKfycbwLFBanRfiZjMSvsyHWb7cScfB9eLQrGvqzpw_JJmG6P9YNRU1tZeAn4HMrfYE64HH2ow/exec";

/*  Ví dụ:
    window.API_CHATLUONG = "https://script.google.com/macros/s/AKfy…rất dài…/exec";

    Chưa điền thì 2 trang checklist.html và danhgia.html sẽ báo
    "Chưa cấu hình đường dẫn trong file cauhinh.js".                              */
