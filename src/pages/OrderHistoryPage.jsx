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
    Pagination,
    Modal
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Confetti from "react-confetti"; // <-- 1. IMPORT CONFETTI
import { useCartStorage } from "../hooks/useCartStorage";
import productsData from "../data/maxwell_wines_products.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingBag,
    faStar,
    faTimes,
    faEllipsisH,
    faCommentDots,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import "../css/OrderHistoryPage.css";

// (Component MessageSidebar không thay đổi)
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

// (Component PaginationComponent không thay đổi)
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
    // ... (các state cũ: orderHistory, allProducts, activeTab, v.v...)
    const [orderHistory, setOrderHistory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("Orders");
    const [timeFilter, setTimeFilter] = useState("Past 3 Months");
    const [bannerVisibility, setBannerVisibility] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // --- 2. State cho Hiệu ứng Confetti ---
    const [showConfetti, setShowConfetti] = useState(true); // Bắt đầu chạy ngay

    const { addItem } = useCartStorage();

    useEffect(() => {
        // Tải dữ liệu (như cũ)
        const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
        setOrderHistory(history);
        setAllProducts(productsData.products || []);
        const initialVisibility = {};
        history.forEach(order => {
            initialVisibility[order.id] = true;
        });
        setBannerVisibility(initialVisibility);

        // --- 3. Hẹn giờ tắt Confetti ---
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000); // Dừng hiệu ứng sau 10 giây

        // Dọn dẹp timer
        return () => {
            clearTimeout(confettiTimer);
        };
    }, []); // Chỉ chạy 1 lần khi trang tải

    // ... (Tất cả các hàm xử lý: filteredOrders, handleBuyAgain, handleBannerClose, handleDeleteClick, confirmDelete, closeDeleteModal, handlePageChange... giữ nguyên)
    // (Phần code này đã được thu gọn cho dễ đọc)
    const filteredOrders = orderHistory.filter(order => {
        if (activeTab === "Not Yet Shipped") {
            return order.status?.toLowerCase() === "processing";
        }
        if (activeTab === "Cancelled Orders") {
            return order.status?.toLowerCase() === "cancelled";
        }
        return true;
    });
    const handleBuyAgain = (item) => {
        const productToAdd = allProducts.find(p => p.id === item.id);
        if (productToAdd) {
            addItem(productToAdd, 1);
            console.log(`${item.name} added to cart`);
        } else {
            console.warn(`Product ${item.id} not found in current product list.`);
        }
    };
    const handleBannerClose = (orderId) => {
        setBannerVisibility(prev => ({
            ...prev,
            [orderId]: false
        }));
    };
    const handleDeleteClick = (orderId) => {
        setOrderToDelete(orderId);
        setShowDeleteModal(true);
    };
    const confirmDelete = () => {
        if (!orderToDelete) return;
        const newHistory = orderHistory.filter(o => o.id !== orderToDelete);
        setOrderHistory(newHistory);
        localStorage.setItem("orderHistory", JSON.stringify(newHistory));
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };
    // --- (Kết thúc code thu gọn) ---


    return (
        <div className="order-history-page">
            {/* === 4. RENDER CONFETTI === */}
            {/* Thêm `recycle={false}` để pháo giấy rơi xuống và biến mất */}
            {showConfetti && <Confetti recycle={false} />}

            {/* (Video background và overlay giữ nguyên) */}
            <video
                className="video-background"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/assets/Maxwellwine.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>

            <Container className="page-content">
                <Row className="g-4">
                    {/* ====== MAIN CONTENT (Left Column) ====== */}
                    <Col lg={8}>

                        {/* === 5. THÊM THANK YOU HEADER === */}
                        <div className="thank-you-header-box text-center">
                            <h2>
                                <i className="bi bi-heart-fill sparkling-heart"></i>
                                &nbsp;Thank You For Your Support!&nbsp;
                                {/* <i className="bi bi-heart-fill sparkling-heart"></i> */}
                            </h2>
                            <p className="lead">
                                We truly appreciate your purchases. Below is your order history.
                            </p>
                        </div>

                        {/* === Header (Your Orders) === */}
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
                                        setCurrentPage(1);
                                    }}
                                    className="order-tabs"
                                >
                                    <Nav.Item><Nav.Link eventKey="Orders">Orders</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="Not Yet Shipped">Not Yet Shipped</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="Cancelled Orders">Cancelled Orders</Nav.Link></Nav.Item>
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

                        {/* === Order List (Không thay đổi) === */}
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
                                        {/* (Nội dung Card.Header không thay đổi) */}
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
                                                <div className="d-flex justify-content-end align-items-center">
                                                    <Link to={`/order-detail/${order.id}`} className="order-details-link">
                                                        View order details
                                                    </Link>
                                                    <Button
                                                        variant="link"
                                                        className="order-delete-link"
                                                        onClick={() => handleDeleteClick(order.id)}
                                                        title="Delete this order"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Header>

                                        {/* (Nội dung Banner không thay đổi) */}
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

                                        {/* (Nội dung Card.Body không thay đổi) */}
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

                        {/* (Pagination không thay đổi) */}
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </Col>

                    {/* ====== SIDEBAR (Right Column) (Không thay đổi) ====== */}
                    <Col lg={4}>
                        <MessageSidebar />
                    </Col>
                </Row>
            </Container>

            {/* (Modal Xóa không thay đổi) */}
            <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="delete-modal-body">
                    <FontAwesomeIcon icon={faTrash} size="2x" className="text-danger mb-3" />
                    <p>Are you sure you want to permanently delete this order?</p>
                    <strong>Order ID: {orderToDelete}</strong>
                    <small className="text-muted d-block mt-2">This action cannot be undone.</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
