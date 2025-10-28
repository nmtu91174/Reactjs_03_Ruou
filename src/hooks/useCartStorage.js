import { useState, useEffect } from "react";
import productsData from "../data/maxwell_wines_products.json";

/**
 * Hook quản lý giỏ hàng dùng LocalStorage
 * -----------------------------------------
 * - Lưu dữ liệu gọn: { id: quantity }
 * - Đồng bộ realtime toàn app (Navbar, Cart, Checkout,…)
 * - Tính sẵn subtotal, tax, shipping, total
 */
export function useCartStorage() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      localStorage.removeItem("cart");
      return {};
    }
  });

  const allProducts = productsData.products || [];

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

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // === Tính thuế & phí vận chuyển ===
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.1;
  const total = (subtotal + shipping + tax).toFixed(2);

  // === Lưu vào LocalStorage & phát event ===
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

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

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    window.dispatchEvent(new Event("cartUpdated"));
  };

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

  // ✅ Helper: tạo dữ liệu order
  const createOrderData = (formData, discount) => {
    return {
      customer: formData,
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      shipping,
      tax: tax.toFixed(2),
      total,
      discount,
      date: new Date().toLocaleString(),
      timestamp: Date.now(),
    };
  };

  return {
    cart,
    cartItems,
    subtotal,
    totalCount,
    shipping,
    tax,
    total,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    createOrderData,
  };
}
