import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Nav,
    Dropdown,
    Alert,
    Pagination
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartStorage } from "../hooks/useCartStorage";
import productsData from "../data/maxwell_wines_products.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingBag,
    faStar,
    faTimes,
    faEllipsisH,
    faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import "../css/OrderHistoryPage.css";

/**
 * Component Sidebar "Send us a message"
 * This matches the right column in image_89ca21.png
 */
function MessageSidebar() {
    return (
        <Card className="order-sidebar-card shadow-sm border-0">
            <Card.Body>
                <FontAwesomeIcon icon={faCommentDots} className="sidebar-chat-icon" />
                <Card.Title as="h5">Send us a message</Card.Title>
                <Card.Text className="text-muted">
                    If you are unable to find an answer,
                    please describe your issue. We'll find
                    solutions within the next...
                </Card.Text>
                <Button variant="dark" className="w-100 rounded-pill sidebar-send-btn">
                    Send us a message
                </Button>
            </Card.Body>
        </Card>
    );
}

/**
 * Pagination Component
 */
function PaginationComponent({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => onPageChange(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination className="justify-content-center pagination-container">
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {items}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
    );
}


/**
 * Main Order History Page Component
 */
export default function OrderHistoryPage() {
    const [orderHistory, setOrderHistory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("Orders");
    const [timeFilter, setTimeFilter] = useState("Past 3 Months");
    const [bannerVisibility, setBannerVisibility] = useState({});

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3; // <-- SỐ LƯỢNG ĐƠN HÀNG MỖI TRANG

    const { addItem } = useCartStorage();

    useEffect(() => {
        // 1. Load order history
        const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
        setOrderHistory(history);

        // 2. Load all products
        setAllProducts(productsData.products || []);

        // 3. Initialize banner visibility
        const initialVisibility = {};
        history.forEach(order => {
            initialVisibility[order.id] = true;
        });
        setBannerVisibility(initialVisibility);
    }, []);

    // 4. Handle filtering logic
    const filteredOrders = orderHistory.filter(order => {
        if (activeTab === "Not Yet Shipped") {
            return order.status?.toLowerCase() === "processing";
        }
        if (activeTab === "Cancelled Orders") {
            return order.status?.toLowerCase() === "cancelled";
        }
        return true;
    });

    // 5. Handle "Buy Again"
    const handleBuyAgain = (item) => {
        const productToAdd = allProducts.find(p => p.id === item.id);
        if (productToAdd) {
            addItem(productToAdd, 1);
            console.log(`${item.name} added to cart`);
        } else {
            console.warn(`Product ${item.id} not found in current product list.`);
        }
    };

    // 6. Handle closing banner
    const handleBannerClose = (orderId) => {
        setBannerVisibility(prev => ({
            ...prev,
            [orderId]: false
        }));
    };

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    return (
        <div className="order-history-page">
            {/* === VIDEO BACKGROUND & OVERLAY === */}
            <video
                className="video-background"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="Reactjs_03_Ruou/assets/Maxwellwine.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>

            <Container className="page-content">
                <Row className="g-4">
                    {/* ====== MAIN CONTENT (Left Column) ====== */}
                    <Col lg={8}>
                        {/* === 1. Header === */}
                        <div className="order-history-header">
                            <div className="title-group">
                                <h2>Your Orders</h2>
                                <Badge pill bg="light" text="dark" className="order-count-badge">
                                    {filteredOrders.length}
                                </Badge>
                            </div>

                            <div className="filter-group">
                                <Nav
                                    variant="tabs"
                                    activeKey={activeTab}
                                    onSelect={(k) => {
                                        setActiveTab(k);
                                        setCurrentPage(1); // Reset to page 1 on filter change
                                    }}
                                    className="order-tabs"
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Orders">Orders</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Not Yet Shipped">Not Yet Shipped</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Cancelled Orders">Cancelled Orders</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Dropdown onSelect={(k) => setTimeFilter(k)} className="time-filter-dropdown">
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-time-filter">
                                        {timeFilter}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Past 3 Months">Past 3 Months</Dropdown.Item>
                                        <Dropdown.Item eventKey="Past 6 Months">Past 6 Months</Dropdown.Item>
                                        <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
                                        <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        {/* === 2. Order List === */}
                        <div className="order-list-container">
                            {currentOrders.length === 0 ? (
                                <Card className="text-center p-5 shadow-sm border-0">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faShoppingBag} size="3x" className="mb-3 text-muted" />
                                        <h4>No orders found</h4>
                                        <p className="text-muted">There are no orders matching your filters.</p>
                                        <Button as={Link} to="/shop" variant="dark" className="rounded-pill px-4">
                                            Start Shopping
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ) : (
                                currentOrders.map((order) => (
                                    <Card className="order-card-item shadow-sm border-0" key={order.id}>
                                        {/* --- Order Header --- */}
                                        <Card.Header className="order-card-header">
                                            <div className="header-col">
                                                <span>ORDER PLACED</span>
                                                <div>{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                            </div>
                                            <div className="header-col">
                                                <span>TOTAL</span>
                                                <div>${Number(order.total).toFixed(2)}</div>
                                            </div>
                                            <div className="header-col">
                                                <span>SHIP TO</span>
                                                <div>{order.customer.firstName} {order.customer.lastName}</div>
                                            </div>
                                            <div className="header-col order-id-col">
                                                <span>ORDER # {order.id}</span>
                                                <div>
                                                    <Link to={`/order-detail/${order.id}`} className="order-details-link">
                                                        View order details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card.Header>

                                        {/* --- Rating Banner (Conditional) --- */}
                                        {bannerVisibility[order.id] && (
                                            <Alert
                                                variant="warning"
                                                onClose={() => handleBannerClose(order.id)}
                                                dismissible
                                                className="order-alert-banner"
                                            >
                                                <FontAwesomeIcon icon={faStar} className="me-2" />
                                                Please rate your experience with the seller
                                            </Alert>
                                        )}

                                        {/* --- Order Body (Items) --- */}
                                        <Card.Body className="order-card-body">
                                            <h5 className="order-status-title">
                                                Delivered {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                            </h5>
                                            <p className="delivery-note text-muted">
                                                Your package was delivered. It was handed directly to a resident.
                                            </p>

                                            {order.items.map((item) => (
                                                <Row className="order-product-item g-3" key={item.id}>
                                                    <Col xs={3} sm={2} className="product-image-col">
                                                        <img src={item.image_url} alt={item.name} className="product-image" />
                                                    </Col>

                                                    <Col xs={9} sm={10} className="product-details-col">
                                                        <Link to={`/product/${item.id}`} className="product-name-link">
                                                            {item.name}
                                                        </Link>
                                                        <small className="product-return-policy text-muted">
                                                            Return or replace items: Eligible through 30 days
                                                        </small>
                                                        <div className="product-action-buttons">
                                                            <Button
                                                                variant="dark"
                                                                size="sm"
                                                                className="btn-buy-again"
                                                                onClick={() => handleBuyAgain(item)}
                                                            >
                                                                <FontAwesomeIcon icon={faShoppingBag} size="xs" />
                                                                <span>Buy it again</span>
                                                            </Button>
                                                            <Button as={Link} to={`/product/${item.id}`} variant="outline-secondary" size="sm" className="btn-view-item">
                                                                View your item
                                                            </Button>
                                                            <Button variant="outline-secondary" size="sm" className="btn-track-package">
                                                                Track package
                                                            </Button>
                                                            <Button variant="outline-secondary" size="sm" className="btn-icon-only">
                                                                <FontAwesomeIcon icon={faEllipsisH} />
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* === 3. Pagination Component === */}
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />

                    </Col>

                    {/* ====== SIDEBAR (Right Column) ====== */}
                    <Col lg={4}>
                        <MessageSidebar />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

