import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CartContext } from "../App"; // ✅ import CartContext
import productsData from "../data/maxwell_wines_products.json";
import "../css/ShopPage.css";

export default function ShopPage() {
    // ✅ Lấy hàm addToCart từ Context
    const { addToCart } = useContext(CartContext);
    // ===== STATE QUẢN LÝ =====
    const [products, setProducts] = useState([]); // tất cả sản phẩm
    const [filteredProducts, setFilteredProducts] = useState([]); // sản phẩm sau khi lọc

    // State cho các bộ lọc
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedVariety, setSelectedVariety] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedVintage, setSelectedVintage] = useState("");

    // ===== LOAD DỮ LIỆU BAN ĐẦU =====
    useEffect(() => {
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
    }, []);

    // ===== LẤY DANH SÁCH DUY NHẤT =====
    // Lấy tất cả variety (loại rượu) duy nhất
    const varieties = [...new Set(products.map((p) => p.variety))].sort();

    // Lấy tất cả region (vùng) duy nhất
    const regions = [...new Set(products.map((p) => p.region))].sort();

    // Lấy tất cả vintage (năm) duy nhất
    const vintages = [...new Set(products.map((p) => p.vintage))].sort();

    // ===== HÀM LỌC SẢN PHẨM =====
    useEffect(() => {
        let result = [...products];

        // Lọc theo từ khóa tìm kiếm (tên hoặc mô tả)
        if (searchTerm) {
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo loại rượu
        if (selectedVariety) {
            result = result.filter((p) => p.variety === selectedVariety);
        }

        // Lọc theo vùng
        if (selectedRegion) {
            result = result.filter((p) => p.region === selectedRegion);
        }

        // Lọc theo khoảng giá
        result = result.filter(
            (p) =>
                p.price.regular >= priceRange.min && p.price.regular <= priceRange.max
        );

        // Lọc theo năm
        if (selectedVintage) {
            result = result.filter((p) => p.vintage === selectedVintage);
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedVariety, selectedRegion, priceRange, selectedVintage, products]);

    // ===== HÀM XÓA TẤT CẢ BỘ LỌC =====
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedVariety("");
        setSelectedRegion("");
        setPriceRange({ min: 0, max: 1000 });
        setSelectedVintage("");
    };

    return (
        <div className="shop-page">
            <Container fluid>
                <Row>
                    {/* ===== CỘT TRÁI: BỘ LỌC ===== */}
                    <Col lg={3} md={4} className="filter-sidebar">
                        <div className="filter-container">
                            <div className="filter-header">
                                <h3>Filters</h3>
                                <Button variant="link" onClick={clearFilters} className="clear-btn">
                                    Clear All
                                </Button>
                            </div>

                            {/* TÌM KIẾM THEO TỪ KHÓA */}
                            <div className="filter-section">
                                <h5>Search</h5>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* LỌC THEO LOẠI RƯỢU */}
                            <div className="filter-section">
                                <h5>Variety (Loại)</h5>
                                <Form.Select
                                    value={selectedVariety}
                                    onChange={(e) => setSelectedVariety(e.target.value)}
                                >
                                    <option value="">All Varieties</option>
                                    {varieties.map((variety) => (
                                        <option key={variety} value={variety}>
                                            {variety}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>

                            {/* LỌC THEO VÙNG */}
                            <div className="filter-section">
                                <h5>Region (Vùng)</h5>
                                <Form.Select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                >
                                    <option value="">All Regions</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>

                            {/* LỌC THEO NĂM */}
                            <div className="filter-section">
                                <h5>Vintage (Năm)</h5>
                                <Form.Select
                                    value={selectedVintage}
                                    onChange={(e) => setSelectedVintage(e.target.value)}
                                >
                                    <option value="">All Vintages</option>
                                    {vintages.map((vintage) => (
                                        <option key={vintage} value={vintage}>
                                            {vintage}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>

                            {/* LỌC THEO GIÁ */}
                            <div className="filter-section">
                                <h5>Price Range</h5>
                                <div className="price-inputs">
                                    <Form.Control
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) =>
                                            setPriceRange({ ...priceRange, min: Number(e.target.value) })
                                        }
                                    />
                                    <span>-</span>
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

                            {/* HIỂN THỊ SỐ KẾT QUẢ */}
                            <div className="filter-results">
                                <p>
                                    Showing <strong>{filteredProducts.length}</strong> of{" "}
                                    <strong>{products.length}</strong> products
                                </p>
                            </div>
                        </div>
                    </Col>

                    {/* ===== CỘT PHẢI: DANH SÁCH SẢN PHẨM ===== */}
                    <Col lg={9} md={8}>
                        <div className="products-header">
                            <h2>Our Wines</h2>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="no-results">
                                <p>No products found matching your filters.</p>
                                <Button onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        ) : (
                            <Row>
                                {filteredProducts.map((product) => (
                                    <Col lg={4} md={6} sm={12} key={product.id} className="mb-4">
                                        <Card className="product-card">
                                            <div className="product-image-wrapper">
                                                <Card.Img
                                                    variant="top"
                                                    src={product.image_url}
                                                    alt={product.name}
                                                />
                                                {product.stock_status === "In Stock" && (
                                                    <span className="stock-badge">In Stock</span>
                                                )}
                                            </div>

                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text className="product-info">
                                                    <small>
                                                        {product.variety} • {product.region} • {product.vintage}
                                                    </small>
                                                </Card.Text>
                                                <Card.Text className="product-description">
                                                    {product.description.substring(0, 80)}...
                                                </Card.Text>

                                                <div className="product-footer">
                                                    <div className="price-section">
                                                        <span className="price-regular">
                                                            ${product.price.regular}
                                                        </span>
                                                        {product.price.wine_club && (
                                                            <span className="price-club">
                                                                Club: ${product.price.wine_club}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Button variant="dark" className="add-to-cart-btn">
                                                        Add to Cart
                                                    </Button>
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
    );
}