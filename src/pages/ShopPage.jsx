import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Offcanvas, // <-- 1. Import Offcanvas
} from "react-bootstrap";
import { useCartStorage } from "../hooks/useCartStorage";
import productsData from "../data/maxwell_wines_products.json";
import "../css/ShopPage.css";
import "../css/HeroSection.css";


export default function ShopPage() {
  const { addItem } = useCartStorage();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVariety, setSelectedVariety] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedVintage, setSelectedVintage] = useState("");

  // --- 2. Thêm state để quản lý việc bật/tắt Offcanvas ---
  const [showFilters, setShowFilters] = useState(false);

  // === SEARCH ===
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearchTerm(keyword);
  }, [location.search]);

  // === INIT DATA ===
  useEffect(() => {
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);

    const initialQty = {};
    const initialAdded = {};
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    productsData.products.forEach((p) => {
      initialQty[p.id] = 1;
      initialAdded[p.id] = !!cart[p.id];
    });

    setQuantities(initialQty);
    setAddedProducts(initialAdded);
  }, []);

  // === WATCH LOCALSTORAGE CHANGES (realtime check) ===
  useEffect(() => {
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || {};
      setAddedProducts((prev) => {
        const updated = { ...prev };
        products.forEach((p) => {
          updated[p.id] = !!cart[p.id];
        });
        return updated;
      });
    };

    const interval = setInterval(checkCart, 400);
    window.addEventListener("storage", checkCart);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkCart);
    };
  }, [products]);

  // === FILTER LOGIC ===
  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedVariety)
      result = result.filter((p) => p.variety === selectedVariety);
    if (selectedRegion)
      result = result.filter((p) => p.region === selectedRegion);
    if (selectedVintage)
      result = result.filter((p) => p.vintage === selectedVintage);

    result = result.filter(
      (p) =>
        p.price.regular >= priceRange.min && p.price.regular <= priceRange.max
    );

    setFilteredProducts(result);
  }, [
    searchTerm,
    selectedVariety,
    selectedRegion,
    priceRange,
    selectedVintage,
    products,
  ]);

  // === FILTER RESET ===
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedVariety("");
    setSelectedRegion("");
    setPriceRange({ min: 0, max: 1000 });
    setSelectedVintage("");
  };

  // === QUANTITY CONTROL ===
  const updateQuantity = (productId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQty),
    }));
  };

  // === ADD TO CART ===
  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addItem(product, qty);

    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  // --- 3. Tạo nội dung cho Sidebar để tái sử dụng ---
  const filterContent = (
    <div className="shop-filter-container">
      <div className="shop-filter-header">
        <h3>Filter</h3>
        <Button
          variant="link"
          onClick={clearFilters}
          className="shop-clear-btn"
        >
          Clear all
        </Button>
      </div>

      {/* SEARCH */}
      <div className="shop-filter-section">
        <h5>Search</h5>
        <Form.Control
          type="text"
          placeholder="Search wines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* VARIETY */}
      <div className="shop-filter-section">
        <h5>Variety</h5>
        <Form.Select
          value={selectedVariety}
          onChange={(e) => setSelectedVariety(e.target.value)}
        >
          <option value="">All varieties</option>
          {[...new Set(products.map((p) => p.variety))].sort().map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Form.Select>
      </div>

      {/* REGION */}
      <div className="shop-filter-section">
        <h5>Region</h5>
        <Form.Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All regions</option>
          {[...new Set(products.map((p) => p.region))].sort().map((r) => (
            <option key={r}>{r}</option>
          ))}
        </Form.Select>
      </div>

      {/* VINTAGE */}
      <div className="shop-filter-section">
        <h5>Vintage</h5>
        <Form.Select
          value={selectedVintage}
          onChange={(e) => setSelectedVintage(e.target.value)}
        >
          <option value="">All vintages</option>
          {[...new Set(products.map((p) => p.vintage))].sort().map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Form.Select>
      </div>

      {/* PRICE RANGE */}
      <div className="shop-filter-section">
        <h5>Price Range</h5>
        <div className="shop-price-inputs">
          <Form.Control
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
          />
          <span>—</span>
          <Form.Control
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="shop-filter-results">
        <p>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>
    </div>
  );

  // === UI ===
  return (
    <>
      {/* ===== 3. THÊM HERO VIDEO MỚI ===== */}
      <section className="hero position-relative shop-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          {/* 4. Đặt đường dẫn video (từ /public) */}
          <source src="Reactjs_03_Ruou/assets/Maxwellwine.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>

        {/* 5. Thêm tiêu đề cho video (Tùy chọn) */}
        <div className="container-fluid position-absolute bottom-0 start-0 end-0 text-white z-2 py-5 px-5 damn">
          <div className="row align-items-end justify-content-between">
            <div className="col-md-7 herotext">
              <h1 className="fw-bold display-6 lh-1 mb-3 c">
                SHOP OUR WINES
              </h1>
            </div>
          </div>
        </div>
      </section>
      <div className="shop-page">
        <Container fluid>
          <Row>
            {/* --- 4. Thay thế Sidebar cũ bằng Offcanvas ---
              Nó sẽ tự động:
              - Hiển thị (static) trên desktop (md, lg, xl)
              - Ẩn (off-canvas) trên mobile (sm, xs)
          */}
            <Col lg={3} md={4}>
              <Offcanvas
                show={showFilters}
                onHide={() => setShowFilters(false)}
                responsive="md" // <-- Đây là key
                placement="start"
                className="shop-filter-sidebar" // Giữ class cũ để áp dụng style
              >
                <Offcanvas.Header closeButton className="d-md-none">
                  <Offcanvas.Title>Filter Products</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>{filterContent}</Offcanvas.Body>
              </Offcanvas>
            </Col>

            {/* PRODUCT GRID */}
            <Col lg={9} md={8}>
              <div className="shop-products-header">
                <h2>All Products</h2>

                {/* --- 5. Thêm nút bật Filter (chỉ hiển thị trên mobile) --- */}
                <Button
                  variant="outline-dark"
                  className="d-md-none" // <-- Ẩn trên desktop (md trở lên)
                  onClick={() => setShowFilters(true)}
                >
                  Filters
                </Button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="shop-no-results">
                  <p>No products match your filters.</p>
                  <Button onClick={clearFilters}>Clear filters</Button>
                </div>
              ) : (
                <Row>
                  {/* 6. Cập nhật Col sản phẩm:
                  - `lg={4}`: 3 cột/hàng (Desktop lớn)
                  - `md={6}`: 2 cột/hàng (Tablet/Desktop nhỏ)
                  - `sm={6}`: 2 cột/hàng (Mobile ngang)
                  - `xs={12}` hoặc không ghi gì: 1 cột/hàng (Mobile dọc)
                  
                  dùng sm={6} để hiển thị 2 cột trên mobile cho đẹp hơn.
                  Nếu muốn 1 cột, dùng `sm={12}`.
                */}
                  {filteredProducts.map((product) => (
                    <Col
                      lg={4}
                      md={6}
                      sm={6} // <-- Hiển thị 2 cột trên mobile
                      key={product.id}
                      className="shop-mb-4"
                    >
                      <Card
                        className="shop-product-card"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="shop-product-image-wrapper">
                          <Card.Img
                            variant="top"
                            src={product.image_url}
                            alt={product.name}
                          />
                          {product.stock_status === "In Stock" && (
                            <span className="shop-stock-badge">In Stock</span>
                          )}
                        </div>

                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Text className="shop-product-info">
                            {product.variety} • {product.region} •{" "}
                            {product.vintage}
                          </Card.Text>
                          <Card.Text className="shop-product-description">
                            {product.description}
                          </Card.Text>

                          <div className="shop-product-footer">
                            <div className="shop-price-section">
                              <span className="shop-price-regular">
                                ${product.price.regular.toFixed(2)}
                              </span>
                              {product.price.wine_club && (
                                <span className="shop-price-club">
                                  ${product.price.wine_club.toFixed(2)} Club
                                </span>
                              )}
                            </div>

                            <div className="shop-bottom-actions">
                              <div className="shop-qty-control">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      product.id,
                                      (quantities[product.id] || 1) - 1
                                    )
                                  }
                                >
                                  −
                                </button>
                                <span>{quantities[product.id] || 1}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      product.id,
                                      (quantities[product.id] || 1) + 1
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>

                              <button
                                className={`shop-btn-add ${addedProducts[product.id] ? "shop-added" : ""
                                  }`}
                                onClick={() => handleAddToCart(product)}
                              >
                                {addedProducts[product.id]
                                  ? "Added ✓"
                                  : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}