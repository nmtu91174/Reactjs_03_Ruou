import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

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

  return (
    <BrowserRouter>
      {/* Bọc app bằng CartContext.Provider */}
      <CartContext.Provider value={cartContextValue}>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;