# 🍷 MAXWELL WINES — E-COMMERCE REACT PROJECT

## 🧭 Giới thiệu

**Maxwell Wines Website** là một dự án thương mại điện tử mô phỏng hệ thống đặt rượu vang cao cấp, được phát triển bằng **React + Vite**.  
Website được thiết kế theo phong cách sang trọng, tối giản và mang trải nghiệm cao cấp — tập trung vào **UI/UX**, hiệu ứng mượt mà và giao diện trực quan.

---

## 👥 Thành viên & Vai trò

| Thành viên | Vai trò | Phụ trách chính |
|-------------|----------|-----------------|
| **🧑‍💻 Dương Quang Nhật** | 🧠 **UI/UX Frontend Developer** | Thiết kế & lập trình **Homepage**, **Product Detail Page**, **Header**, **Footer**, tối   ưu hiệu ứng & responsive toàn bộ website |
| **💳 Điều Chỉnh Đức** | ⚙️ **Frontend Developer** | Phát triển **Cart System** và **Checkout Page**, xử lý localStorage, đồng bộ dữ liệu thanh toán và trang xác nhận đơn hàng |
| **🛍️ Nguyễn Mạnh Tú (Chu)** | 🧩 **Frontend Developer** | Xây dựng **Shop Page**, chức năng **Filter**, xử lý dữ liệu từ **JSON sản phẩm** |
| **📦 Nguyễn Trí Việt** | 💡 **Frontend Developer** | Phát triển **Chi tiết đơn hàng** và **Trang cảm ơn (Chúc mừng)**, hoàn thiện logic sau thanh toán |

---

## 🧩 Công nghệ & Thư viện sử dụng

| Công nghệ | Mô tả |
|------------|--------|
| ⚛️ **React.js** | Framework chính để xây dựng giao diện component-based |
| ⚡ **Vite** | Công cụ build siêu nhanh thay thế Create React App |
| 🧭 **React Router DOM** | Quản lý định tuyến giữa các trang (Home, Shop, Product Detail, Cart, Checkout, v.v.) |
| 🎨 **Bootstrap 5** | Framework CSS giúp responsive nhanh chóng |
| 🧿 **Lucide React** | Bộ icon hiện đại, sắc nét, nhẹ và đồng nhất (thay thế Bootstrap Icons) |
| 🎉 **React Confetti** | Hiệu ứng pháo hoa mừng thanh toán thành công |
| 💾 **LocalStorage API** | Lưu & đồng bộ dữ liệu giỏ hàng, đơn hàng |
| 🧠 **Custom Hooks (useCartStorage)** | Hook quản lý giỏ hàng realtime trên toàn ứng dụng |
| 💅 **Custom CSS / Animation** | Hiệu ứng hover, fade, blur, transition mượt mà, tinh chỉnh thủ công bởi nhóm |

---

## ⚙️ Cài đặt & Chạy Dự án

### 🪜 1️⃣ Clone repository
```bash
git clone https://github.com/nmtu91174/Reactjs_03_Ruou
cd Reactjs_03_Ruou
```

---

### ⚙️ 2️⃣ Cài đặt các thư viện cần thiết
Chạy lần lượt các lệnh sau trong terminal:

```bash
npm install
npm install bootstrap
npm install react-router-dom
npm install react-confetti
npm install lucide-react
```

---

### 🚀 3️⃣ Chạy dự án
```bash
npm run dev
```

Mở trình duyệt và truy cập địa chỉ:
```
http://localhost:5173
```

---

## 📁 Cấu trúc thư mục chính

```
maxwell-wines/
│
├── public/
│   ├── assets/              # Hình ảnh, video hero, ảnh sản phẩm
│   └── pdfs/                # File tasting notes (.pdf)
│
├── src/
│   ├── components/          # Navbar, Footer, ProductGrid, FadeInBlock, v.v.
│   ├── css/                 # Các file CSS tùy chỉnh
│   ├── data/
│   │   └── maxwell_wines_products.json  # Dữ liệu sản phẩm chính
│   ├── hooks/
│   │   └── useCartStorage.js            # Hook quản lý giỏ hàng & localStorage
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Checkout.jsx
│   │   ├── ChucMung.jsx
│   │   └── CartPage.jsx
│   └── main.jsx                         # Điểm khởi chạy chính
│
└── README.md
```

---

## 🧾 Mẫu dữ liệu sản phẩm (JSON)

```json
{
  "id": "01",
  "name": "CDX Fresca 2024",
  "variety": "Grenache",
  "price": {
    "regular": 35,
    "wine_club": 30,
    "currency": "$"
  },
  "description": "Bright, delicious & limited Grenache — light & juicy, early-drinking style.",
  "tasting_notes": "Vibrant red fruits, rose petal and cherry aromas.",
  "image_url": "/assets/fresca_main.jpg",
  "image2_url": "/assets/fresca_alt.jpg"
}
```

---

## 🧠 Ghi chú kỹ thuật

- 🧩 `useCartStorage.js` lưu dữ liệu giỏ hàng dưới dạng `{ id: quantity }`, đồng bộ **realtime** giữa tất cả component (Navbar, Cart, Checkout).  
- 💾 Khi thanh toán, Checkout tự động tạo đơn hàng (`lastOrder`) và lưu vào localStorage cùng thời gian đặt (`timestamp`).  
- 🎨 Giao diện được tối ưu theo **responsive design**, hoạt động mượt trên cả PC, tablet và mobile.  
- ⚡ Animation sử dụng cubic-bezier và GPU acceleration cho cảm giác “luxury smooth”.  

---

## ✨ Các trang chính

| Trang | Mô tả |
|--------|--------|
| 🏠 **Homepage** | Hero video, giới thiệu thương hiệu, section sản phẩm nổi bật |
| 🍇 **Shop Page** | Lọc sản phẩm, phân loại theo dòng rượu, sắp xếp theo giá |
| 🍷 **Product Detail Page** | Hiển thị chi tiết sản phẩm, tasting notes, file PDF, sidebar động |
| 🛒 **Cart Page** | Hiển thị sản phẩm đã thêm vào giỏ, chỉnh số lượng realtime |
| 💳 **Checkout Page** | Form thanh toán + thông tin giao hàng |
| 🎉 **Chúc Mừng Page** | Hiệu ứng pháo hoa với **React Confetti** khi hoàn tất đơn hàng |

---

## 🧭 Các bước hoạt động của người dùng

1. **Chọn sản phẩm** tại Shop hoặc Homepage  
2. **Xem chi tiết** để đọc mô tả và tasting notes  
3. **Thêm vào giỏ hàng (Add to Cart)**  
4. **Kiểm tra giỏ hàng** — có thể thay đổi số lượng hoặc xóa sản phẩm  
5. **Thanh toán tại Checkout**  
6. **Xác nhận đơn hàng & trang cảm ơn** 🎊  

---

## 💡 Tips cho Dev khác khi clone project

- Nếu trang bị **trắng khi clone về**, kiểm tra:
  - ✅ File `maxwell_wines_products.json` có tồn tại trong `/src/data`
  - ✅ Import đúng đường dẫn hình ảnh (đặt trong `/public/assets`)
  - ✅ Chạy đúng lệnh `npm install` trước `npm run dev`
  - ✅ Không sửa `useCartStorage.js` — đây là hook trung tâm để sync dữ liệu realtime

---

## ❤️ Lời cảm ơn

Dự án **Maxwell Wines** là kết quả của sự phối hợp ăn ý và tinh thần trách nhiệm cao giữa các thành viên.  
Cảm ơn cả nhóm đã cùng nhau hoàn thiện dự án với tinh thần học hỏi và niềm đam mê sáng tạo trong lập trình.

> *Made with 🍷 passion and teamwork — Group 3 Maxwell Wines Team, 2025.*
