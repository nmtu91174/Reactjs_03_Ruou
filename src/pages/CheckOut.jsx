import React, { useState } from "react";
import { useCartStorage } from "../hooks/useCartStorage";
import { useOrderStorage } from "../hooks/useOrderStorage";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Truck,
  Mail,
  Gift,
  ShoppingBag,
  Lock,
  ShieldCheck,
} from "lucide-react";
import "../css/Checkout.css";

function CheckOut() {
  const { cartItems, subtotal, total, clearCart, createOrderData } = useCartStorage();
  const { saveOrder } = useOrderStorage();
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    district: "",
    ward: "",
    postcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentOrderData = {
      id: `MW-${Date.now()}`,
      customer: formData,
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      // total: getTotal(), // Lấy total từ hook nếu đã tính sẵn
      total: total, // Sử dụng total từ useCartStorage
      discount,
      // currency: "AUD",
      date: new Date().toLocaleString(),
      status: "Processing",
    };

    localStorage.setItem("lastOrder", JSON.stringify(currentOrderData));
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    history.unshift(currentOrderData);
    localStorage.setItem("orderHistory", JSON.stringify(history));
    localStorage.removeItem("cart"); // Xóa giỏ hàng
    window.dispatchEvent(new Event("cartUpdated")); // Cập nhật UI

    // Chuyển trang
    navigate("/chucmung");
  };

  return (
    <section className="checkout-container two-column">
      {/* LEFT SIDE - CUSTOMER INFO */}
      <div className="checkout-left checkout-fade">
        <h2>
          <ShoppingBag size={22} /> Checkout
        </h2>

        {/* CONTACT + DELIVERY FORM */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>
            <Mail size={18} /> Contact Information
          </h3>

          <div className="express-checkout">
            <button type="button" className="express-btn express-apple">
              <span>Apple Pay</span>
            </button>
            <button type="button" className="express-btn express-google">
              <span>Google Pay</span>
            </button>
            <button type="button" className="express-btn express-paypal">
              <span>PayPal</span>
            </button>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="checkbox">
            <input type="checkbox" /> Keep me up to date on news and offers
          </label>

          <h3>
            <Truck size={18} /> Delivery Details
          </h3>
          <div className="flex-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <div className="flex-row">
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ward"
              placeholder="Ward"
              value={formData.ward}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* 🛡️ Privacy & Refund Policy Section */}
          <div className="policy-info">
            <h4>
              <ShieldCheck size={18} style={{ color: "#7b1e26" }} /> Privacy &
              Refund Policy
            </h4>
            <p>
              We value your privacy — your personal information is securely
              stored and never shared with third parties. All transactions are
              encrypted to ensure your data remains safe. Refunds and exchanges
              are available within <strong>14 days</strong> of purchase,
              provided the items remain unopened, unused, and in their original
              packaging.
            </p>
            <p>
              If you receive a damaged or incorrect item, please contact our
              support team within <strong>7 days</strong> of delivery, and we’ll
              arrange a prompt replacement or full refund. Our goal is to make
              sure every purchase meets your expectations.
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - ORDER SUMMARY + PAYMENT */}
      <div className="checkout-right-wrapper">
        <div className="checkout-right">
          <h3>
            <Gift size={20} /> Order Summary
          </h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-main">
                  <img src={item.image_url} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <small>× {item.qty}</small>
                  </div>
                  <span>
                    {/* {item.currency} */}$
                    {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}

          <div className="order-totals">
            <div className="line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="line">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="line">
              <span>Taxes (10%)</span>
              <span>${(subtotal * 0.1).toFixed(2)}</span>
            </div>
            <hr />
            <div className="line total">
              <strong>Total</strong>
              {/* 🟢 NHẬT: thay getTotal() bằng total từ useCartStorage */}
              <strong>${total}</strong>
            </div>

            <div className="discount">
              <Gift size={16} style={{ color: "#7b1e26" }} />
              <input
                type="text"
                placeholder="Discount code"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <button type="button">Apply</button>
            </div>
          </div>

          {/* PAYMENT METHOD SECTION */}
          <div className="payment-section">
            <h3>
              <CreditCard size={18} /> Payment Method
            </h3>

            <div className="payment-options">
              <label className="radio">
                <input type="radio" name="payment" defaultChecked />
                Credit / Debit Card
              </label>
              <label className="radio">
                <input type="radio" name="payment" />
                PayPal
              </label>
              <label className="radio">
                <input type="radio" name="payment" />
                Cash on Delivery
              </label>
            </div>

            <div className="card-form">
              <input type="text" placeholder="Cardholder Name" required />
              <input
                type="text"
                placeholder="Card Number"
                maxLength="19"
                required
              />
              <div className="flex-row">
                <input type="text" placeholder="MM/YY" maxLength="5" required />
                <input type="text" placeholder="CVV" maxLength="3" required />
              </div>
            </div>

            {/* 👉 CHỈNH NÚT PAY NOW GỌI SUBMIT FORM */}
            <button type="submit" className="pay-now-btn" onClick={handleSubmit}>
              <Lock size={18} /> Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
