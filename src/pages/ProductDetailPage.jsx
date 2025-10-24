// src/pages/ProductDetailPage.jsx

import { useState, useEffect } from "react";
import {
    useParams,
    useNavigate,
    Link,
    useLocation,
} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Accordion,
} from "react-bootstrap";
import { useCartStorage } from "../hooks/useCartStorage";
import productsData from "../data/maxwell_wines_products.json";
import ProductCarousel from "../components/ProductCarousel";
import "../css/ProductDetailPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ProductDetailPage() {
    const { productId } = useParams(); // Lấy 'productId' từ URL
    const navigate = useNavigate();
    const location = useLocation();

    const { addItem, cartItems } = useCartStorage();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeImage, setActiveImage] = useState("");

    // 1. Tìm sản phẩm khi component mount hoặc productId thay đổi
    useEffect(() => {
        const foundProduct = productsData.products.find((p) => p.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
            setActiveImage(foundProduct.image_url); // Đặt ảnh chính
        } else {
            // Nếu không tìm thấy, quay về trang shop
            navigate("/shop");
        }
    }, [productId, navigate]);

    // 2. Cuộn lên đầu trang khi chuyển sản phẩm
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // 3. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    useEffect(() => {
        if (product) {
            const isInCart = cartItems.some((item) => item.id === product.id);
            setAdded(isInCart);
        }
    }, [product, cartItems]);

    // 4. Xử lý Thêm vào giỏ
    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
    };

    // 5. Xử lý tăng/giảm số lượng
    const updateQuantity = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    // Nếu không có sản phẩm (đang tải), hiển thị loading
    if (!product) {
        return <div>Loading...</div>;
    }

    // --- Lấy hình ảnh cho gallery (1 lớn, 3 nhỏ) ---
    // Chúng ta sẽ dùng image_url và image2_url (nếu có), và lặp lại để đủ 3 ảnh nhỏ
    const thumbImages = [
        product.image_url,
        product.image2_url || product.image_url, // Ảnh 2 nếu có, nếu không dùng lại ảnh 1
        product.image_url, // Dùng lại ảnh 1
    ];

    return (
        <div className="product-detail-page">
            <Container>
                <Row className="g-5">
                    {/* ====== CỘT TRÁI: HÌNH ẢNH ====== */}
                    {/* ====== CỘT TRÁI: HÌNH ẢNH (ĐÃ CẬP NHẬT) ====== */}
                    <Col lg={6}>
                        <div className="product-gallery">
                            <Row className="g-3">
                                {/* === CỘT ẢNH NHỎ (BÊN TRÁI) === */}
                                <Col xs={3} sm={2} lg={3}>
                                    <div className="thumbnail-images-left">
                                        {thumbImages.map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                className={`thumb-img ${img === activeImage ? "active" : ""
                                                    }`}
                                                onClick={() => setActiveImage(img)}
                                            />
                                        ))}
                                    </div>
                                </Col>

                                {/* === CỘT ẢNH LỚN (BÊN PHẢI) === */}
                                <Col xs={9} sm={10} lg={9}>
                                    <div className="main-image-wrapper">
                                        <Image
                                            src={activeImage}
                                            alt={product.name}
                                            className="main-image"
                                            fluid
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* ====== CỘT PHẢI: THÔNG TIN & MUA HÀNG ====== */}
                    <Col lg={6}>
                        <div className="product-info">
                            {/* Nút Back */}
                            <Link to="/shop" className="back-to-shop">
                                &larr; Back to Shop
                            </Link>

                            {/* Tên sản phẩm */}
                            <h1>{product.name}</h1>

                            {/* Thông tin cơ bản */}
                            <p className="product-meta">
                                {product.variety} • {product.region} • {product.vintage}
                            </p>

                            {/* Giá */}
                            <div className="product-price-row">
                                <span className="price-regular">
                                    ${product.price.regular.toFixed(2)}
                                </span>
                                {product.price.wine_club && (
                                    <span className="price-club">
                                        ${product.price.wine_club.toFixed(2)} Wine Club
                                    </span>
                                )}
                            </div>

                            {/* Mô tả ngắn */}
                            <p className="product-description">{product.description}</p>

                            {/* Thêm vào giỏ hàng */}
                            <div className="add-to-cart-section">
                                <div className="dt-qty-control">
                                    <button onClick={() => updateQuantity(-1)}>−</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => updateQuantity(1)}>+</button>
                                </div>
                                <Button
                                    className={`dt-btn-add-detail ${added ? "added" : ""}`}
                                    onClick={handleAddToCart}
                                    disabled={added}
                                >
                                    {added ? "Added to Cart ✓" : "Add to Cart"}
                                </Button>
                            </div>

                            {/* Thông tin chi tiết (Accordion) */}
                            <div className="product-details-accordion">
                                <Accordion defaultActiveKey="0" alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Tasting Notes</Accordion.Header>
                                        <Accordion.Body>{product.tasting_notes}</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Product Details</Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                <li>
                                                    <strong>ID:</strong> {product.id}
                                                </li>
                                                <li>
                                                    <strong>Volume:</strong> {product.volume}
                                                </li>
                                                <li>
                                                    <strong>Stock:</strong> {product.stock_status}
                                                </li>
                                                <li>
                                                    <strong>Region:</strong> {product.region}
                                                </li>
                                                <li>
                                                    <strong>Variety:</strong> {product.variety}
                                                </li>
                                                <li>
                                                    <strong>Vintage:</strong> {product.vintage}
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Phần sản phẩm gợi ý */}
            <ProductCarousel mode="recommendation" />
        </div>
    );
}