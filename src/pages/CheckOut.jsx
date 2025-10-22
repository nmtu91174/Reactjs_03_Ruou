import React, { useEffect, useState } from "react";
import productsData from "../data/maxwell_wines_products.json";
import "../css/Checkout.css";

function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    const allProducts = productsData.products || [];

    const detailed = Object.entries(storedCart)
      .map(([id, qty]) => {
        const product = allProducts.find((p) => p.id === id);
        if (!product) return null;
        return {
          id,
          name: product.name,
          price: product.price.regular,
          currency: product.price.currency,
          quantity: qty,
          image_url: product.image_url,
        };
      })
      .filter(Boolean);

    setCartItems(detailed);
  }, []);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      {/* LEFT: Billing & Order Summary */}
      <div className="checkout-left">
        <h2>Complete your order</h2>

        <div className="returning-customer">
          <p>Returning customer? <a href="#">Click here to login</a></p>
        </div>

        <div className="coupon">
          <p>Have a coupon? <a href="#">Click here to enter your code</a></p>
        </div>

        <h3>Billing Details</h3>
        <form className="billing-form">
          <input type="text" placeholder="First Name *" required />
          <input type="text" placeholder="Last Name *" required />
          <input type="email" placeholder="Email Address *" required />
          <input type="tel" placeholder="Phone" />
          <input type="text" placeholder="House number and street name *" required />
          <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
          <input type="text" placeholder="Town / City *" required />
          <input type="text" placeholder="State / County" />
          <input type="text" placeholder="Postcode *" required />
          <div>
            <label>
              <input type="checkbox" /> Sign me up to receive email updates and news
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
              <div key={item.id} className="checkout-item" onClick={() => toggleExpand(item.id)}>
                <div className="item-summary">
                  <img src={item.image_url} alt={item.name} />
                  <div>
                    <p>{item.name} × {item.quantity}</p>
                    <p>{item.currency} {item.price.toFixed(2)}</p>
                  </div>
                </div>
                {expandedItems[item.id] && (
                  <div className="item-details">
                    <p>Subtotal: {(item.price * item.quantity).toFixed(2)} {item.currency}</p>
                  </div>
                )}
              </div>
            ))
          )}
          <hr />
          <p><strong>Total:</strong> {getTotal().toFixed(2)} €</p>
        </div>
      </div>

      {/* RIGHT: Shipping & Payment */}
      <div className="checkout-right">
        <h2>Payment & Shipping</h2>
        <form className="checkout-form">
          <h4>Shipping Method</h4>
          <label>
            <input type="radio" name="shipping" checked /> Royal Mail (Free)
          </label>

          <h4>Payment</h4>
          <label>
            <input type="radio" name="payment" checked /> Credit / Debit Card
          </label>
          <div>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM / YY" />
            <input type="text" placeholder="CVC" />
          </div>
          <label>
            <input type="radio" name="payment" /> PayPal
          </label>

          <button type="submit" className="place-order-btn">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;
