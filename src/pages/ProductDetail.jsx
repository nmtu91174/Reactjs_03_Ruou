import { useParams, Link } from "react-router-dom";
import productsData from "../data/maxwell_wines_products.json";
import "../css/ProductDetail.css";
import ProductGrid from "../components/ProductCarousel";
import FadeInBlock from "../components/FadeInBlock";
import { useCartStorage } from "../hooks/useCartStorage";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.products.find((p) => String(p.id) === id);
  const { addItem } = useCartStorage();
  const [qty, setQty] = useState(1);

  // === SIDEBAR STATES ===
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!product) return <div>Product not found.</div>;
  const imageSrc = product.image2_url || product.image_url;

  const handleIncrease = () => setQty((prev) => prev + 1);
  const handleDecrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => addItem(product, qty);

  // === Sidebar controls ===
  const openSidebar = (tab) => {
    if (isSidebarOpen && tab !== activeTab) {
      setIsSidebarOpen(false);
      setTimeout(() => {
        setActiveTab(tab);
        setIsSidebarOpen(true);
      }, 500);
    } else {
      setActiveTab(tab);
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setActiveTab(null), 500);
  };




  return (
    <>
      <section className="productdetail-wrapper">
        {/* === Breadcrumb === */}
        <div className="breadcrumb">
          <div className="breadcrumb-context">
            <Link to="/shop" className="breadcrumb-link">
              ALL PRODUCTS
            </Link>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>

        {/* === Container (Grid) === */}
        <div className="productdetail-container">
          {/* === Left Image === */}
          <div className="productdetail-image">
            <img src={product.image_url} alt={product.name} draggable="false" />
          </div>

          {/* === Right Info === */}
          <div className="productdetail-info">
            <h1 className="productdetail-name">{product.name}</h1>
            <p className="productdetail-price">
              ${product.price.regular} | ${product.price.wine_club} Club Price
            </p>
            <p className="productdetail-variety">{product.variety}</p>

            <div className="productdetail-tabs">
              <div className="tab-item" onClick={() => openSidebar("tasting")}>
                Tasting Notes
              </div>
              <div className="tab-item" onClick={() => openSidebar("technical")}>
                Technical
              </div>
              <div className="tab-item" onClick={() => openSidebar("winemaking")}>
                Winemaking
              </div>
              <div className="tab-item" onClick={() => openSidebar("reviews")}>
                Reviews
              </div>
            </div>

            {/* === ACTIONS === */}
            <div className="productdetail-actions">
              <div className="quantity-selector">
                <button onClick={handleDecrease}>-</button>
                <span>{qty}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              <button className="btn-addcart" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>

            <button className="btn-join">JOIN WINE CLUB & SAVE</button>

            <p className="productdetail-note">
              Maxwell club members receive a range of benefits including <br />
              exclusive wines and favourable prices.{" "}
              <Link to="/club" className="learnmore-link">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* === HERO VIDEO === */}
      <section className="productdetail-hero">
        <video
          className="productdetail-hero-video"
          src="assets/detail.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="productdetail-hero-overlay"></div>
        <FadeInBlock className="productdetail-hero-fade">
          <div className="productdetail-hero-text">
            <p className="hero-subtitle">EXPERTLY REFINED,</p>
            <h1 className="hero-title">MAXWELL–MADE.</h1>
          </div>
        </FadeInBlock>
      </section>

      {/* === JOIN CLUB SECTION === */}
      <section className="pgrid">
        <FadeInBlock className="club-fadein">
          <div className="joinclub-section">
            <div className="joinclub-left">
              <div className="joinclub-left-inner">
                <h2 className="joinclub-title">{product.name}</h2>
                <p className="joinclub-desc">{product.description}</p>
              </div>
            </div>
            <div className="joinclub-right">
              <div className="joinclub-image-container">
                <img src={imageSrc} alt={product.name} />
                <div className="read-overlay">
                  <FadeInBlock>
                    <div className="joinclub-overlay-content">
                      <h2 className="joinclub-overlay-title">
                        Join the Maxwell<br />Clan Wine Club
                      </h2>
                      <button className="read-btn">
                        JOIN NOW <span className="underline"></span>
                      </button>
                    </div>
                  </FadeInBlock>
                </div>
              </div>
            </div>
          </div>
        </FadeInBlock>
      </section>

      <section className="pgrid">
        <FadeInBlock>
          <ProductGrid mode="recommendation" />
        </FadeInBlock>
      </section>

      {/* === SIDEBAR === */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* === SIDEBAR OVERLAY + PANEL === */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={() => {
          setIsSidebarOpen(false);
          setTimeout(() => setActiveTab(null), 400);
        }}
      ></div>

      <div className={`sidebar-panel ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => {
          setIsSidebarOpen(false);
          setTimeout(() => setActiveTab(null), 400);
        }}>
          CLOSE ✕
        </button>

        {activeTab === "tasting" && (
          <div className="sidebar-content">
            <h2>Tasting Notes</h2>
            <table>
              <tbody>
                <tr><td>Color & Aroma</td><td>Vibrant red fruits, rose petal and cherry</td></tr>
                <tr><td>Palate</td><td>Medium bodied, fresh raspberry, cherry and orange peel</td></tr>
                <tr><td>Pairing</td><td>Korean fried chicken with pickled vegetables</td></tr>
                <tr><td>Cellar</td><td>Drink young (and chilled)</td></tr>
              </tbody>
            </table>
            {/* === About / Main note === */}
            <h3>About</h3>
            <p>{product.tasting_notes || "No tasting note available."}</p>

            {/* === PDF Link (tự sinh theo tên sản phẩm) === */}
            {product.name && (
              <a
                href={`/pdfs/Maxwell_${product.name.replace(/[^a-zA-Z0-9]/g, "_")}_Tasting_Note.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Maxwell_{product.name.replace(/[^a-zA-Z0-9]/g, "_")}_Tasting_Note.pdf ↗
              </a>
            )}
          </div>
        )}

        {activeTab === "technical" && (
          <div className="sidebar-content">
            <h2>Technical</h2>
            <table>
              <tbody>
                <tr><td>Varietal</td><td>Grenache</td></tr>
                <tr><td>Region</td><td>McLaren Vale</td></tr>
                <tr><td>Alcohol</td><td>12.5%</td></tr>
                <tr><td>pH</td><td>3.41</td></tr>
                <tr><td>TA</td><td>6.0 g/L</td></tr>
                <tr><td>Residual Sugar</td><td>3.1 g/L</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "winemaking" && (
          <div className="sidebar-content">
            <h2>Winemaking</h2>
            <h3>Vintage Conditions</h3>
            <p>
              The 2023/2024 season began wet & windy; February–March were mild,
              producing beautifully ripe fruit with below-average yields.
            </p>
            <h3>Maker Notes</h3>
            <p>
              Picked early for brightness, matured in stainless steel, bottled early
              for freshness — Joven style wine.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="sidebar-content">
            <h2>Reviews</h2>
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

    </>
  );
}
