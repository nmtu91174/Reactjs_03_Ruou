import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "../css/ChucMung.css";

function ChucMung() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState(8); // 8s countdown

  useEffect(() => {
    if (!order) return;

    setShowConfetti(true);

    const confettiTimer = setTimeout(() => setShowConfetti(false), 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(confettiTimer);
      clearInterval(countdownInterval);
    };
  }, [order, navigate]);

  if (!order) {
    return (
      <div className="thankyou-container">
        <h2>🛍️ No recent order found</h2>
        <button className="continue-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="thankyou-wrapper">
      {showConfetti && <Confetti />}
      <div className="thankyou-container">
        <h2>🎉 Thank You!</h2>
        <p className="subtext">
          Your order has been successfully placed on <strong>{order.date}</strong>.
        </p>

        <div className="customer-info">
          <p>
            Confirmation email sent to: <strong>{order.customer.email}</strong>
          </p>
          {order.id && (
            <p>
              Order Number: <strong>{order.id}</strong>
            </p>
          )}
        </div>

        <h3>🛍️ Order Summary</h3>
        <ul className="order-summary-list">
          {order.items.map((item) => (
            <li key={item.id}>
              <div className="item-info">
                {item.image && (
                  <img src={item.image} alt={item.name} className="item-image" />
                )}
                <span className="item-name">{item.name} × {item.qty}</span>
              </div>
              <span className="item-price">{item.currency} {(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="total-amount">
          Total: {order.currency} {Number(order.total).toFixed(2)}
        </div>

        <p className="countdown-text">
          Redirecting to homepage in <strong>{countdown}</strong> second{countdown !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}

export default ChucMung;
