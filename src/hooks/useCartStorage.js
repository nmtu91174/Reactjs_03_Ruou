import { useState, useEffect } from "react";
import productsData from "../data/maxwell_wines_products.json";

/**
 * Hook quản lý giỏ hàng dùng LocalStorage
 * -----------------------------------------
 * - Lưu dữ liệu dạng gọn: { id: quantity }
 * - Tự động đồng bộ realtime toàn app (Navbar, Cart, Checkout,...)
 * - Có clearCart() và hỗ trợ ghi thời gian đặt hàng khi checkout
 */

export function useCartStorage() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      // ✅ Phòng khi dữ liệu localStorage bị lỗi JSON
      localStorage.removeItem("cart");
      return {};
    }
  });

  // === Dữ liệu sản phẩm từ JSON ===
  const allProducts = productsData.products || [];

  // === Chuyển từ {id: qty} sang mảng chi tiết ===
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

  // === Tính tổng tiền và số lượng ===
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // === Lưu lại vào LocalStorage + phát event sync ===
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // === Các hành động ===
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

  // ✅ Xóa toàn bộ giỏ hàng (dùng khi thanh toán thành công)
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // === Lắng nghe cập nhật realtime ===
  useEffect(() => {
    const syncCart = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("cart")) || {};
        setCart(stored);
      } catch {
        setCart({});
      }
    };
    window.addEventListener("cartUpdated", syncCart);
    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);

  // === Xuất ra để Checkout dùng ghi order có ngày giờ ===
  const createOrderData = (formData, discount, getTotal) => {
    return {
      customer: formData,
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      total: getTotal(),
      discount,
      date: new Date().toLocaleString(), // 🕒 thời gian đọc dễ hiểu
      timestamp: Date.now(), // 🔢 dùng sort / thống kê
    };
  };

  return {
    cart,
    cartItems,
    subtotal,
    totalCount,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    createOrderData, // ✅ thêm hàm helper cho Checkout
  };
}
