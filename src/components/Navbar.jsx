import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App";
import "../css/Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import productsData from "../data/maxwell_wines_products.json";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQty, removeFromCart } = useContext(CartContext);

  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const recRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // ✅ State cho toast notification
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const shuffled = [...productsData.products].sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 10));
  }, []);

  // ✅ Wrapper function CÓ Ý NGHĨA - thêm logic hiển thị thông báo
  const handleAddToCart = (item) => {
    addToCart(item);

    // Hiển thị toast
    setToast({
      show: true,
      message: `${item.name} đã được thêm vào giỏ hàng!`
    });

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleScrollRec = (dir) => {
    if (!recRef.current) return;
    const card = recRef.current.querySelector(".recommend-card");
    if (!card) return;
    const gap = 12;
    const moveBy = card.offsetWidth * 2 + gap;
    recRef.current.scrollBy({
      left: dir === "left" ? -moveBy : moveBy,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "auto";
  }, [menuOpen, cartOpen]);

  const iconColor = scrolled || hovered ? "#111" : "#fff";

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`maxwell-header ${scrolled || hovered ? "scrolled" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <nav className="maxwell-nav">
          <div className="nav-left mobile-only">
            <img
              src={scrolled || hovered ? "/assets/icon-menu.png" : "/assets/icon-menu2.png"}
              alt="menu"
              onClick={() => setMenuOpen(true)}
            />
          </div>

          <ul className="nav-links desktop-only">
            <li>RESTAURANT</li>
            <li onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>SHOP</li>
            <li>VISIT</li>
            <li>CLUB</li>
            <li>EVENTS</li>
            <li>ABOUT</li>
          </ul>

          <div className="nav-logo">
            <Link to="/">
              <img
                src={scrolled || hovered ? "/assets/logo-black.webp" : "/assets/logo-white.webp"}
                alt="Maxwell Logo"
                className="logo"
              />
            </Link>
          </div>

          <div className="nav-actions">
            <button className="btn-reserve desktop-only">RESERVATIONS</button>
            <i className="bi bi-person desktop-only" style={{ color: iconColor, fontSize: "24px" }}></i>
            <i
              className="bi bi-search desktop-only"
              style={{ color: iconColor, fontSize: "18px", cursor: "pointer" }}
              onClick={() => setSearchOpen(true)}
            ></i>
            <div className="bag-icon" onClick={() => setCartOpen(true)} style={{ position: "relative" }}>
              <i className="bi bi-bag" style={{ color: iconColor, fontSize: "20px" }}></i>
              <span className="cart-count">{totalCount}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* ✅ Toast Notification */}
      {toast.show && (
        <div className="toast-notification">
          <i className="bi bi-check-circle"></i>
          <span>{toast.message}</span>
        </div>
      )}

      {searchOpen && (
        <div className={`search-overlay ${scrolled ? "scrolled" : ""}`}>
          <div className="search-bar">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search our wines..." />
            <i
              className="bi bi-x-lg"
              onClick={() => {
                const overlay = document.querySelector(".search-overlay");
                if (overlay) {
                  overlay.classList.add("fade-out");
                  setTimeout(() => setSearchOpen(false), 350);
                } else {
                  setSearchOpen(false);
                }
              }}
            ></i>
          </div>
        </div>
      )}

      <div className={`sidebar left ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <i className="bi bi-x-lg" onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }}></i>
          <img src="/assets/logo-black.webp" alt="Logo" className="sidebar-logo" />
        </div>

        <ul className="sidebar-links">
          <li><span>Restaurant</span></li>
          <li className="has-arrow" onClick={() => handleNavigate('/shop')}>
            <span>Shop</span>
          </li>
          <li className="has-arrow"><span>Visit</span></li>
          <li><span>Club</span></li>
          <li className="has-arrow"><span>Events</span></li>
          <li className="has-arrow"><span>About</span></li>
        </ul>

        <div className="sidebar-search">
          <input type="text" placeholder="Search" />
          <i className="bi bi-search"></i>
        </div>

        <div className="sidebar-book">
          <img src="/assets/sitebar.webp" alt="Book a Table" />
          <div className="book-info">
            <h4>Book a Table</h4>
            <button>Learn More →</button>
          </div>
        </div>
      </div>

      <div className={`sidebar right cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <i className="bi bi-x-lg" onClick={() => setCartOpen(false)}></i>
          <h2>Cart</h2>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <i className="bi bi-x" onClick={() => removeFromCart(item.id)}></i>
                  <img src={item.image_url} alt={item.name} className="cart-thumb" />
                  <div className="cart-info">
                    <h5>{item.name}</h5>
                  </div>
                  <div className="cart-right">
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    <div className="qty-box">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-recommend">
            <div className="recommend-header">
              <h4>We Recommend</h4>
              <div className="arrows">
                <i className="bi bi-arrow-left" onClick={() => handleScrollRec("left")}></i>
                <i className="bi bi-arrow-right" onClick={() => handleScrollRec("right")}></i>
              </div>
            </div>

            <div className="recommend-list" ref={recRef}>
              {recommended.map((rec) => (
                <div className="recommend-card" key={rec.id}>
                  <img src={rec.image_url} alt={rec.name} />
                  <div className="recommend-content">
                    <h5>{rec.name}</h5>
                    <p>${rec.price.regular.toFixed(2)}</p>
                    {/* ✅ Giờ dùng handleAddToCart có ý nghĩa */}
                    <button className="add-btn" onClick={() => handleAddToCart(rec)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <div className="subtotal-row">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>I confirm that I am over 18 years of age</span>
          </label>
          <button
            className="btn-cartcheck"
            disabled={!confirmed}
            style={{
              opacity: confirmed ? 1 : 0.8,
              cursor: confirmed ? "pointer" : "not-allowed",
            }}
          >
            CHECKOUT
          </button>
        </div>
      </div>

      {(menuOpen || cartOpen) && (
        <div
          className="backdrop"
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
          }}
        ></div>
      )}
    </>
  );
}