import React, { useState, useEffect } from "react";
import { useCartStorage } from "../hooks/useCartStorage"; // ✅ import hook dùng chung

function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStorage(); // ✅ dùng logic giỏ hàng thống nhất

  // ✅ Kiểm tra nếu sản phẩm đã có trong localStorage khi load
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[product.id]) setAdded(true);
  }, [product.id]);

  // ✅ Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    try {
      addItem(product, 1); // ✅ dùng hook — tự lưu localStorage + bắn event "cartUpdated"
      setAdded(true);

      // Log ra console cho dễ debug
      console.log("Added to cart:", {
        id: product.id,
        name: product.name,
        price: `${product.price.currency} ${product.price.regular}`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Giao diện nút
  const isMembersOnly = product.stock_status === "Members Only";
  return (
    <button
      className={`btn mt-auto ${isMembersOnly ? "btn-secondary" : "btn-warning"}`}
      style={{ fontWeight: "bold" }}
      onClick={handleAddToCart}
      disabled={isMembersOnly}
    >
      {isMembersOnly
        ? "Members Only"
        : added
        ? "Added"
        : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;
