import React, { useState } from "react";
import { useCartStorage } from "../hooks/useCartStorage"; // ✅ dùng hook chung
import "../css/Checkout.css";

function CheckOut() {
  const {
    cartItems,
    subtotal,
    updateQty,
    removeItem,
  } = useCartStorage();

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTotal = () => subtotal.toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
  };

  return (
    <section className="section-checkout">
      <div className="checkout-page">
        {/* LEFT: Billing & Order Summary */}
        <div className="checkout-left">
          <h2>Complete your order</h2>

          <div className="returning-customer">
            <p>
              Returning customer? <a href="#">Click here to login</a>
            </p>
          </div>

          <div className="coupon">
            <p>
              Have a coupon? <a href="#">Click here to enter your code</a>
            </p>
          </div>

          <h3>Billing Details</h3>
          <form className="billing-form">
            <input type="text" placeholder="First Name *" required />
            <input type="text" placeholder="Last Name *" required />
            <input type="email" placeholder="Email Address *" required />
            <input type="tel" placeholder="Phone" />
            <input
              type="text"
              placeholder="House number and street name *"
              required
            />
            <input
              type="text"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
            <input type="text" placeholder="Town / City *" required />
            <input type="text" placeholder="State / County" />
            <input type="text" placeholder="Postcode *" required />
            <div>
              <label>
                <input type="checkbox" /> Sign me up to receive email updates and
                news
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> Create an account?
              </label>
            </div>
          </form>

          <h3>Your Order</h3>
          <div className="order-summary">
            {cartItems.length === 0 ? (
              <p>No items in your cart.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="checkout-item"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="item-summary">
                    <img src={item.image_url} alt={item.name} />
                    <div>
                      <p>
                        {item.name} × {item.qty}
                      </p>
                      <p>
                        {item.currency} {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {expandedItems[item.id] && (
                    <div className="item-details">
                      <div className="qty-control1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQty(item.id, item.qty - 1);
                          }}
                        >
                          −
                        </button>
                        <span className="quantity">{item.qty}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQty(item.id, item.qty + 1);
                          }}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <p>
                        Subtotal: {(item.price * item.qty).toFixed(2)}{" "}
                        {item.currency}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
            <hr />
            <p>
              <strong>Total:</strong> {getTotal()} €
            </p>
          </div>
        </div>

        {/* RIGHT: Shipping & Payment */}
        <div className="checkout-right">
          <h2>Payment & Shipping</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h4>Shipping Method</h4>
            <label>
              <input type="radio" name="shipping" defaultChecked /> Royal Mail
              (Free)
            </label>

            <h4>Payment</h4>
            <label>
              <input type="radio" name="payment" defaultChecked /> Credit /
              Debit Card
            </label>
            <div>
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="MM / YY" />
              <input type="text" placeholder="CVC" />
            </div>
            <label>
              <input type="radio" name="payment" /> PayPal
            </label>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
