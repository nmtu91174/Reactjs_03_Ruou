import { useState } from "react";
import "../css/ProductGrid.css";
import productsData from "../data/maxwell_wines_products.json";

export default function ProductGrid() {
  const allProducts = productsData.products || [];

  return (
    <section className="productgrid-section">
      <div className="productgrid-container">
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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

      <div className="product-info">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="price-row">
          <span>${product.price.regular}</span>
          <span className="club">| ${product.price.wine_club} Wine Club</span>
        </div>
      </div>

      <div className="bottom-actions">
          <div className="qty-control">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button className="btn-add">ADD TO CART</button>
      </div>
    </div>
  );
}
