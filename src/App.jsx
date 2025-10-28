import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
<<<<<<< HEAD

// ✅ Tạo Context để chia sẻ giỏ hàng giữa các component
export const CartContext = createContext();

function App() {
  // State giỏ hàng chung cho toàn bộ app
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        // Nếu đã có trong giỏ, tăng số lượng
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới với qty = 1
        return [
          ...prev,
          {
            ...product,
            price: product.price.regular,
            qty: 1,
          },
        ];
      }
    });
  };

  // Hàm cập nhật số lượng
  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Giá trị được chia sẻ cho tất cả component con
  const cartContextValue = {
    cartItems,
    addToCart,
    updateQty,
    removeFromCart,
  };
=======
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut.jsx";
import ChucMung from "./pages/ChucMung.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetail from "./pages/ProductDetail.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import "./App.css";

>>>>>>> nmtu

  return (
<<<<<<< HEAD
    <BrowserRouter>
      {/* Bọc app bằng CartContext.Provider */}
      <CartContext.Provider value={cartContextValue}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
=======
    <Router>
      <Navbar />
      {/* THÊM WRAPPER <main>
        Chúng ta bọc <Routes> trong một thẻ <main> với className
        để cho nó biết "đây là nội dung chính" và nó cần co dãn.
      */}
      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/chucmung" element={<ChucMung />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/order-detail/:orderId" element={<OrderDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
>>>>>>> nmtu
  );
}

export default App;