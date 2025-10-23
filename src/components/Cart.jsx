import React, { useState, useEffect } from "react";
import productsData from "../data/maxwell_wines_products.json";
import "../css/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    const allProducts = productsData.products || [];

    // Ghép thông tin chi tiết từ cart + JSON sản phẩm
    const detailed = Object.entries(storedCart)
      .map(([id, qty]) => {
        const product = allProducts.find((p) => p.id === id);
        if (!product) return null;
        return {
          id,
          name: product.name,
          image_url: product.image_url,
          price: product.price.regular,
          currency: product.price.currency,
          quantity: qty,
        };
      })
      .filter(Boolean);

    setCartItems(detailed);
  }, []);

  const saveCart = (updated) => {
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = JSON.parse(localStorage.getItem("cart")) || {};
    delete updated[id];
    saveCart(updated);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementQty = (id) => {
    const updated = JSON.parse(localStorage.getItem("cart")) || {};
    updated[id] = (updated[id] || 0) + 1;
    saveCart(updated);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    const updated = JSON.parse(localStorage.getItem("cart")) || {};
    if (updated[id] > 1) updated[id] -= 1;
    else delete updated[id];
    saveCart(updated);
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      {/* LEFT: Cart items */}
      <div className="cart-left">
        <h2>Cart ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <div className="item-list">
            {cartItems.map((item) => (
              <div key={item.id} className="item-card">
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
                <img src={item.image_url} alt={item.name} />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p className="price">
                    {item.currency || "$"} {Number(item.price).toFixed(2)}
                  </p>
                  <div className="qty-control">
                    <button onClick={() => decrementQty(item.id)}>&lt;</button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => incrementQty(item.id)}>&gt;</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>

      {/* RIGHT: Promo Slider */}
      <div className="cart-right">
        <PromoSlider />
      </div>
    </div>
  );
}

/* -------------------------------
   PromoSlider Component
-------------------------------- */
function PromoSlider() {
  const promoSlides = [
    {
      img: "https://www.thespruceeats.com/thmb/RRt94B04rqexveGo09-4FIfKt54=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/red-wine-in-wine-glass--bunch-of-dark-purple-grapes-615395214-5ac5375030371300375622c8.jpg",
      title: "Join the Maxwell Wine Club",
      desc: "Enjoy exclusive discounts, early access to new vintages, and member-only events.",
      btn: "JOIN NOW →",
    },
    {
      img: "https://letitwine.com/uploads/2018/10/the-difference-between-table-grapes-and-wine-grapes.jpg",
      title: "Free Shipping Over $100",
      desc: "Get complimentary delivery on all orders above $100 — no code needed!",
      btn: "SHOP NOW →",
    },
    {
      img: "https://vinocruz.com/wp-content/uploads/2021/11/red-wine-club.jpg",
      title: "Limited Reserve Wines",
      desc: "Discover our premium limited-edition wines only available this season.",
      btn: "EXPLORE →",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="promo-slider">
      {promoSlides.map((slide, index) => (
        <div
          key={index}
          className={`promo-slide ${index === current ? "active" : ""}`}
        >
          <img src={slide.img} alt={slide.title} draggable="false" />
          <div className="promo-text">
            <h3>{slide.title}</h3>
            <p>{slide.desc}</p>
            <button className="wine-club-btn">{slide.btn}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;