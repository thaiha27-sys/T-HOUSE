# T-House Villa — app quản lý booking

Ứng dụng web tạo xác nhận đặt phòng (ảnh JPEG / PDF / tin nhắn Zalo) cho các căn villa
T-House ở Sonasea Vân Đồn, và ghi thẳng vào sổ theo dõi trên Google Sheets.

Cài lên màn hình chính điện thoại được như một app thật (PWA).

## Nội dung thư mục

| File | Vai trò |
|---|---|
| `index.html` | Toàn bộ ứng dụng trong 1 file (đã gói sẵn React). |
| `manifest.webmanifest` | Khai báo tên, màu, icon để điện thoại cài được lên màn hình chính. |
| `sw.js` | Service worker — giữ vỏ ứng dụng trong máy để mở được khi mạng chập chờn. |
| `icon-*.png`, `apple-touch-icon.png` | Bộ icon. |
| `.nojekyll` | Bắt buộc, để GitHub Pages không bỏ qua file nào. |

## Không có mật khẩu nào trong thư mục này

Đường dẫn Google Apps Script **không** nằm trong mã nguồn. Mỗi người mở app lần đầu sẽ
tự dán đường dẫn đó vào, máy nhớ lại cho lần sau. Nhờ vậy repo để công khai vẫn an toàn.

Đưa đường dẫn cho người thứ hai bằng tin nhắn riêng, đừng đăng lên nhóm chat hay commit vào repo.

## Đăng lên GitHub Pages

```bash
git init
git add .
git commit -m "T-House booking app"
git branch -M main
git remote add origin https://github.com/<tên-tài-khoản>/<tên-repo>.git
git push -u origin main
```

Rồi vào repo trên GitHub → **Settings** → **Pages** → mục *Build and deployment*:
- Source: **Deploy from a branch**
- Branch: **main**, thư mục **/ (root)** → **Save**

Đợi 1–2 phút, địa chỉ sẽ là `https://<tên-tài-khoản>.github.io/<tên-repo>/`

## Khi sửa app

Mã nguồn thật là `../villa-booking-app.jsx`. Sửa xong phải đóng gói lại `index.html`
(xem mục «Bẫy kỹ thuật» trong `../HANDOFF.md`), rồi **tăng số `PHIEN_BAN` trong `sw.js`**
— nếu không, máy đã cài app sẽ vẫn chạy bản cũ đã lưu trong bộ nhớ.
