import { useState, useEffect } from "react";
import productsData from "../data/maxwell_wines_products.json";

/**
 * Hook quản lý giỏ hàng dùng LocalStorage
 * -----------------------------------------
 * - Lưu dữ liệu dạng ngắn gọn: { id: quantity }
 * - Hỗ trợ add, update, remove
 * - Tự động sync với ProductCarousel, Navbar, CartPage,...
 * - Không cần Context, chỉ cần import và gọi
 */

export function useCartStorage() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || {};
  });

  // === Lấy danh sách sản phẩm đầy đủ từ JSON ===
  const allProducts = productsData.products || [];

  // === Chuyển từ {id: qty} sang mảng đầy đủ thông tin ===
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = allProducts.find((p) => p.id === id);
      if (!product) return null;
      return {
        id,
        name: product.name,
        image_url: product.image_url,
        price: product.price.regular,
        currency: product.price.currency,
        qty,
      };
    })
    .filter(Boolean);

  // === Tính toán tổng tiền và tổng số lượng ===
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // === Hàm cập nhật LocalStorage và state ===
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated")); // sync toàn app
  };

  // === Các hành động chính ===
  const addItem = (product, qty = 1) => {
    const updated = { ...cart };
    updated[product.id] = (updated[product.id] || 0) + qty;
    saveCart(updated);
  };

  const updateQty = (id, newQty) => {
    const updated = { ...cart };
    if (newQty <= 0) delete updated[id];
    else updated[id] = newQty;
    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = { ...cart };
    delete updated[id];
    saveCart(updated);
  };

  // === Lắng nghe event cartUpdated để đồng bộ realtime giữa các component ===
  useEffect(() => {
    const syncCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || {};
      setCart(stored);
    };
    window.addEventListener("cartUpdated", syncCart);
    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);

  return {
    cart,
    cartItems,
    subtotal,
    totalCount,
    addItem,
    updateQty,
    removeItem,
  };
}
