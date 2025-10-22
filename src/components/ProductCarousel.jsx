import { useCartStorage } from "../hooks/useCartStorage"; // ✅ dùng chung hook
import "../css/ProductGrid.css";
import productsData from "../data/maxwell_wines_products.json";
import { useState, useRef, useEffect, useMemo } from "react";


export default function ProductGrid({ mode = "carousel", title }) {
  const allProducts = productsData.products || [];
  const products = useMemo(() => {
    if (mode === "carousel") {
      return allProducts.filter((p) => p.image2_url?.trim()).slice(0, 7);
    } else if (mode === "recommendation") {
      return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
      return allProducts;
    }
  }, [mode, allProducts]);

  // === TITLE ===
  const sectionTitle =
    title ||
    (mode === "recommendation"
      ? "CELLAR DOOR RECOMMENDATIONS"
      : "Estate Favourites");

  // === CAROUSEL STATE ===
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const trackRef = useRef(null);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    if (mode !== "carousel" && mode !== "recommendation") return;
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mode]);

  useEffect(() => {
      if ((mode !== "carousel" && mode !== "recommendation") || !trackRef.current) return;
    const firstItem = trackRef.current.querySelector(".product-card");
    if (firstItem) {
      const itemWidth = firstItem.offsetWidth + 20;
      setTranslate(-index * itemWidth);
    }
  }, [index, visibleCount, mode]);

  const step = 1;
  const maxIndex = Math.max(products.length - visibleCount, 0);

  const next = () => setIndex((prev) => (prev < maxIndex ? prev + step : 0));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - step : maxIndex));

  // === NORMAL GRID ===
  if (mode !== "carousel" && mode !== "recommendation") {
    return (
      <section className={`productgrid-section mode-${mode}`}>
        <h2 className="productgrid-title">
          {sectionTitle.split(" ")[0]}{" "}
          <em>{sectionTitle.split(" ").slice(1).join(" ")}</em>
        </h2>

        <div className="productgrid-container">
          {products.map((p, i) => (
            <ProductCard key={p.id || i} product={p} index={i} mode={mode} />
          ))}
        </div>
      </section>
    );
  }


  // === CAROUSEL MODE ===
  return (
    
    <section
        className={`productgrid-section ${
          mode === "recommendation" ? "mode-recommendation" : "mode-carousel"
        }`}
      >
      <div className="carousel-header">
        <h2
          className={`productgrid-title ${
            mode === "recommendation"
              ? "title-recommendation"
              : "title-estate"
          }`}
        >
          {sectionTitle.split(" ")[0]}{" "}
          <em>{sectionTitle.split(" ").slice(1).join(" ")}</em>
        </h2>

        <div className="experience-arrows">
          <button onClick={prev}>&larr;</button>
          <button onClick={next}>&rarr;</button>
        </div>
      </div>

      {/* wrapper giữ grid bên trong */}
      <div className="carousel-viewport" style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{
            transform: `translateX(${translate}px)`,
            transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          <div className="productgrid-container">
          {products.map((p, i) => (
            <ProductCard product={p} index={i} mode={mode} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === COMPONENT CON PRODUCT CARD ===
function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStorage(); // ✅ gọi hook dùng chung
  const [added, setAdded] = useState(false);

  // ✅ kiểm tra xem sản phẩm đã có trong cart chưa
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[product.id]) setAdded(true);
  }, [product.id]);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* === Hình ảnh === */}
      <div className="product-img">
        <img
          src={product.image_url}
          alt={product.name}
          className={`base-img ${!product.image2_url ? "no-hover" : ""}`}
          draggable="false"
        />
        <img
          src={product.image2_url || product.image_url}
          alt={product.name}
          className={`hover-img ${hovered ? "visible" : ""}`}
          draggable="false"
        />
      </div>

      {/* === Nội dung + nút === */}
      <div className="product-info-wrapper">
        <div className="product-info">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <div className="price-row">
            <span>${product.price.regular}</span>
            <span className="club">
              | ${product.price.wine_club} Wine Club
            </span>
          </div>
        </div>

        {/* === Hành động (chạm đáy card) === */}
        <div className="bottom-actions">
          <div className="qty-control">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button
            className={`btn-add ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "ADDED" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}
