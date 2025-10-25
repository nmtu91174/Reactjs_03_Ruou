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

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/chucmung" element={<ChucMung />} />
      </Routes>
      <Footer />
    </Router>
  );
}
