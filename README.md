# EcomChat — Nền tảng Chat & Quản lý Khách Hàng (CRM) Zalo Đa Luồng

Hệ thống chuyên nghiệp giúp quản lý tập trung nhiều tài khoản Zalo cá nhân trên một giao diện web duy nhất. Hướng tới mô hình kinh doanh B2B SaaS với thiết kế **Flat Minimalist**, EcomChat cung cấp tính năng Chat real-time, phễu khách hàng (Pipeline CRM), lịch hẹn tự động, báo cáo phân tích, cùng hệ thống API & Webhook mở rộng mạnh mẽ.

## ✨ Tính năng nổi bật

- 🎨 **Giao diện B2B SaaS Hiện đại** — Thiết kế Dark/Light mode chuẩn Flat Minimalist, tối ưu không gian làm việc chuyên nghiệp (sử dụng *Plus Jakarta Sans*).
- 🔗 **Quản lý Đa tài khoản Zalo** — Quét mã QR đăng nhập một lần, tự động kết nối lại (Auto-reconnect), lưu phiên đăng nhập vĩnh viễn hạn chế checkpoint.
- 💬 **Chat Real-time Tốc độ cao** — Trải nghiệm nhắn tin mượt mà với khách hàng/nhóm chat. Hỗ trợ gửi ảnh, file, tài liệu, sticker.
- 📊 **CRM & Phễu Khách Hàng (Pipeline)** — Quản lý vòng đời khách hàng theo luồng: `Mới → Đã liên hệ → Quan tâm → Chuyển đổi → Hủy/Mất`.
- 📅 **Quản lý Lịch hẹn thông minh** — Tạo, theo dõi và nhắc báo tự động các lịch hẹn chốt sale / chăm sóc khách hàng hàng ngày.
- 🛡️ **Hệ thống Phân Quyền Chặt Chẽ** — Cấp bậc Owner / Admin / Member. Cho phép chỉ định nhân viên cụ thể được quản lý/trả lời những tài khoản Zalo nào.
- ⚡ **API & Webhook Tự Thời Gian Thực** — Tích hợp dễ dàng với hệ thống nội bộ (ERP, CRM bên thứ 3) với hệ REST API bảo mật qua API key và Webhook events (`message.received`, `contact.created`, v.v.).
- 🤖 **Bảo vệ Tài khoản Zalo (Anti-block)** — Tự động throttle tin nhắn, cảnh báo gửi liên tục, giới hạn 200 tin/ngày bảo vệ tài khoản khỏi thuật toán Zalo.
- 📈 **Báo Cáo & KPI Dashboard** — Trực quan hóa dữ liệu qua biểu đồ tin nhắn, hiệu suất sale, nguồn khách hàng, và chuyển đổi phễu CRM. Có thể xuất Excel dễ dàng.

## 💻 Yêu cầu Hệ thống

Hệ thống được thiết kế tối giản, chạy 100% qua Container (Docker) để dễ dàng scale và quản trị trên mọi môi trường.

| Thành phần | Cấu hình Tối thiểu | Khuyến nghị (Production) |
|-----------|----------|------------|
| CPU | 1 vCore | 2 - 4 vCore |
| RAM | 2 GB | 4 GB |
| Ổ cứng | 10 GB SSD | 20 GB SSD |
| Hệ điều hành | Ubuntu 20.04+ / Linux / Windows | Ubuntu 22.04 LTS |
| Phụ thuộc | Docker & Docker Compose | Docker Engine 24+ |

## 🚀 Cài đặt & Triển khai nhanh

> 📘 Xem tài liệu chi tiết hơn tại: [HUONG-DAN-CAI-DAT.md](HUONG-DAN-CAI-DAT.md)

**1. Clone mã nguồn về máy / máy chủ:**
```bash
git clone https://github.com/vigstudio/EcomChat.git
cd EcomChat
```

**2. Cấu hình môi trường (Environment)**
```bash
cp .env.example .env
# Chỉnh sửa file .env để đổi lại JWT Secrets và Port mong muốn nếu cần
```

**3. Build và Khởi chạy với Docker**
```bash
docker compose up -d --build
```

**4. Khởi tạo & Trải nghiệm**
- Truy cập vào **http://localhost:3080** (hoặc IP-server:3080)
- Hệ thống sẽ hiển thị màn hình cài đặt Admin cho lần chạy đầu tiên.

## 🛠 Tech Stack (Ngăn xếp Công nghệ)

EcomChat được xây dựng từ những công nghệ xử lý Node.js tiên tiến và tối ưu tài nguyên nhất hiện tại:

| Lớp (Layer) | Công nghệ cốt lõi |
|-----------|----------|
| **Backend** | Node.js 20, Fastify v5, Prisma ORM 5.x |
| **Frontend** | Vue 3 (Composition API), Vuetify 3 (SaaS Theme), Pinia, Chart.js |
| **Cơ sở dữ liệu** | PostgreSQL 16 (Relational Database) |
| **Giao tiếp Real-time**| Socket.IO (WebSockets) |
| **Zalo Client Protocol** | ZCA-js 2.x (Ngôn ngữ đảo ngược Web Zalo API) |
| **Triển khai (Deploy)** | Đóng gói 100% bằng Docker và Multi-stage Dockerfile |

## 🔌 API & Webhook (Cho nhà phát triển)

### Xác thực API HTTP
Mọi API Endpoint nội bộ (ngoài Web) đều yêu cầu Header xác thực như sau:
```http
Header: X-API-Key: your-api-key-here
```

### Các Endpoint chính
| HTTP Method | URL Path | Chức năng mô tả |
|------------|----------|-------|
| `GET` | `/api/public/contacts` | Lấy danh sách khách hàng đang có |
| `POST` | `/api/public/contacts` | Import / Tạo mới khách hàng từ bên ngoài |
| `POST` | `/api/public/messages/send`| Bắn tin nhắn tự động từ tài khoản Zalo |
| `GET` | `/api/public/appointments` | Trích xuất toàn bộ dữ liệu lịch hẹn CSKH |

### Webhook Events (Gửi Event qua Server của bạn)
Khi sự kiện diễn ra trên EcomChat, Server sẽ lập tức POST payload sang Webhook URL bạn cấu hình:
- `message.received`: Khách hàng nhắn tin tới một Zalo.
- `message.sent`: Tin nhắn (Từ bạn hoặc kịch bản auto) được gửi đi.
- `contact.created`: Khách hàng mới được thêm vào hệ thống / Mới làm quen.
- `zalo.connected`: Một tài khoản cá nhân Zalo đăng nhập thành công.
- `zalo.disconnected`: Tài khoản Zalo bị rớt session / bị logout.

## 📜 Giấy phép & Bản quyền
Dự án được phân phối dưới giấy phép **MIT**. Hoàn toàn miễn phí sử dụng cho cả mục đích thương mại và cá nhân. Mọi Pull Request đóng góp đều được hoan nghênh.
