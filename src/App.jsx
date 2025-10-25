import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import ShopPage from "./pages/ShopPage";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut.jsx";
import ChucMung from "./pages/ChucMung.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetail from "./pages/ProductDetail.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import "./App.css";


export default function App() {
  return (
    <Router>
      <Navbar />
      {/* THÊM WRAPPER <main>
        Chúng ta bọc <Routes> trong một thẻ <main> với className
        để cho nó biết "đây là nội dung chính" và nó cần co dãn.
      */}
      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/chucmung" element={<ChucMung />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/order-detail/:orderId" element={<OrderDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
