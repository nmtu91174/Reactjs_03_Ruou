import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Table, Image, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useCartStorage } from "../hooks/useCartStorage";
import productsData from "../data/maxwell_wines_products.json";
import "../css/OrderDetailPage.css"; // We will create this file

export default function OrderDetailPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const { addItem } = useCartStorage();

    useEffect(() => {
        // 1. Load all products for "Buy Again"
        setAllProducts(productsData.products || []);

        // 2. Load all history
        const history = JSON.parse(localStorage.getItem("orderHistory")) || [];

        // 3. Find the specific order
        const foundOrder = history.find((o) => o.id === orderId);

        if (foundOrder) {
            setOrder(foundOrder);
        } else {
            // 4. If not found, go back to history
            navigate("/order-history");
        }
    }, [orderId, navigate]);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [orderId]);

    // 5. Handle "Buy Again"
    const handleBuyAgain = (item) => {
        const productToAdd = allProducts.find(p => p.id === item.id);
        if (productToAdd) {
            addItem(productToAdd, 1);
        }
    };

    // 6. Status badge helper
    const getStatusBadge = (status) => {
        const statusLower = status?.toLowerCase() || "";
        let variant = "secondary";
        if (statusLower === "processing") variant = "warning";
        if (statusLower === "shipped") variant = "info";
        if (statusLower === "delivered") variant = "success";
        if (statusLower === "cancelled") variant = "danger";

        return <Badge bg={variant} className="detail-status-badge">{status || "Unknown"}</Badge>;
    };

    if (!order) {
        return (
            <Container className="order-detail-page text-center">
                <h2>Loading Order...</h2>
            </Container>
        );
    }

    // Mock-up shipping and tax
    const shipping = 5.00;
    const tax = order.subtotal * 0.10;

    return (
        <div className="order-detail-page">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={11} xl={10}>
                        {/* === 1. Page Header === */}
                        <div className="detail-page-header">
                            <Link to="/order-history" className="back-link">
                                &larr; Back to Your Orders
                            </Link>
                            <h2>
                                Order Details
                            </h2>
                            <div className="header-meta">
                                <span>Ordered on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="meta-divider">|</span>
                                <span>Order # {order.id}</span>
                            </div>
                        </div>

                        {/* === 2. Main Content Card === */}
                        <Card className="detail-card shadow-sm border-0">
                            <Row className="g-0">
                                {/* --- Left Column: Items & Shipping --- */}
                                <Col lg={8} className="detail-main-col">
                                    <Card.Body className="p-4 p-md-5">
                                        <h4 className="detail-section-title">
                                            {order.status === "Delivered" ? "Delivered" : "Processing"}
                                        </h4>
                                        <p className="text-muted mb-4">Your order is being prepared.</p>

                                        {/* Item List */}
                                        <div className="product-list">
                                            {order.items.map((item) => (
                                                <Row className="product-item-detail g-3" key={item.id}>
                                                    <Col xs={3} sm={2}>
                                                        <img src={item.image_url} alt={item.name} className="product-image" />
                                                    </Col>
                                                    <Col xs={9} sm={10}>
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <Link to={`/product/${item.id}`} className="product-name-link">
                                                                    {item.name}
                                                                </Link>
                                                                <div className="product-meta">
                                                                    Qty: {item.qty}
                                                                </div>
                                                                <div className="product-price">
                                                                    ${(item.price * item.qty).toFixed(2)}
                                                                </div>
                                                            </div>
                                                            {/* --- Buy Again Button (Styled) --- */}
                                                            <Button
                                                                variant="dark"
                                                                size="sm"
                                                                className="btn-buy-again align-self-start"
                                                                onClick={() => handleBuyAgain(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faShoppingBag} size="xs" />
                                                                <span>Buy it again</span>
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Col>

                                {/* --- Right Column: Summary & Info --- */}
                                <Col lg={4} className="detail-sidebar-col">
                                    <Card.Body className="p-4 p-md-5">
                                        {/* Payment Summary */}
                                        <h5 className="detail-sidebar-title">Payment Summary</h5>
                                        <div className="summary-row">
                                            <span>Subtotal:</span>
                                            <span>${Number(order.subtotal).toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Shipping:</span>
                                            <span>${shipping.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Taxes (10%):</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <hr className="summary-divider" />
                                        <div className="summary-row total">
                                            <span>Total:</span>
                                            <span>${Number(order.total).toFixed(2)}</span>
                                        </div>

                                        <hr />

                                        {/* Shipping Info */}
                                        <h5 className="detail-sidebar-title">Shipping Information</h5>
                                        <div className="shipping-info">
                                            <strong>{order.customer.firstName} {order.customer.lastName}</strong>
                                            <p>{order.customer.address}</p>
                                            <p>{order.customer.ward}, {order.customer.district}</p>
                                            <p>{order.customer.city}</p>
                                            <p>Phone: {order.customer.phone}</p>
                                        </div>

                                        <hr />
                                        {/* Order Info */}
                                        <h5 className="detail-sidebar-title">Order Information</h5>
                                        <div className="summary-row">
                                            <span>Status:</span>
                                            <span>{getStatusBadge(order.status)}</span>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

