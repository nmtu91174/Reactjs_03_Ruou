import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStorage } from "../hooks/useCartStorage"; // ✅ Hook quản lý giỏ hàng
import ProductCarousel from "../components/ProductCarousel";
import "../css/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeItem, subtotal, totalCount } = useCartStorage();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="section-cart">
      <div className="cart-page">
        {/* LEFT: Cart items */}
        <div className="cart-left">
          <h2>Cart ({totalCount})</h2>

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
                      {/* {item.currency || "$"}  */}
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <div className="qty-control1">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>
                        &lt;
                      </button>
                      <span className="quantity">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </div>
        </div>

        {/* RIGHT: Promo Slider */}
        <div className="cart-right1">
          <PromoSlider />
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      <ProductCarousel mode="recommendation" />
    </section>
  );
}

/* -------------------------------
   PromoSlider Component
-------------------------------- */
function PromoSlider() {
  const promoSlides = [
    {
      img: "Reactjs_03_Ruou/assets/Grape-Regions-Of-Austria.jpg",
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

  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
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
