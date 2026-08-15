/*  Service worker: giữ vỏ ứng dụng trong máy để mở được cả khi mạng chập chờn.
    KHÔNG bao giờ cache lời gọi Google Apps Script — dữ liệu booking phải luôn lấy mới.
    Đổi PHIEN_BAN mỗi lần deploy bản mới để máy người dùng tự cập nhật.  */
const PHIEN_BAN = "thouse-v2";
const VO_UNG_DUNG = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(PHIEN_BAN)
      .then((c) => c.addAll(VO_UNG_DUNG))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ten) => Promise.all(ten.filter((t) => t !== PHIEN_BAN).map((t) => caches.delete(t))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Dữ liệu từ Google Sheets và thư viện ngoài: luôn đi thẳng ra mạng
  if (url.hostname !== self.location.hostname) return;

  // Trang HTML: ưu tiên bản mới, hỏng mạng thì lấy bản đã lưu
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => {
          const ban_sao = r.clone();
          caches.open(PHIEN_BAN).then((c) => c.put("./index.html", ban_sao));
          return r;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Ảnh, manifest…: lấy trong máy trước cho nhanh
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((r) => {
      if (r && r.status === 200 && r.type === "basic") {
        const ban_sao = r.clone();
        caches.open(PHIEN_BAN).then((c) => c.put(req, ban_sao));
      }
      return r;
    }).catch(() => cached))
  );
});
