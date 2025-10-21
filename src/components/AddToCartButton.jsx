import React, { useState, useEffect } from "react";

function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Kiểm tra xem sản phẩm đã có trong localStorage chưa
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[product.id]) {
      setAdded(true);
    }
  }, [product.id]);

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};

      if (cart[product.id]) {
        // Nếu đã có trong giỏ, tăng số lượng
        cart[product.id].quantity += 1;
      } else {
        // Thêm mới
        cart[product.id] = {
          id: product.id,
          name: product.name,
          price: product.price.regular,
          currency: product.price.currency,
          quantity: 1,
          image_url: product.image_url,
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);

      // Log thông tin sản phẩm vừa thêm
      console.log("Added to cart:", {
        id: product.id,
        name: product.name,
        price: `${product.price.currency} ${product.price.regular}`,
        quantity: cart[product.id].quantity,
      });

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button
      className={`btn mt-auto ${product.stock_status === "Members Only" ? "btn-secondary" : "btn-warning"}`}
      style={{ fontWeight: "bold" }}
      onClick={handleAddToCart}
      disabled={product.stock_status === "Members Only"}
    >
      {product.stock_status === "Members Only" ? "Members Only" : added ? "Added" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;

