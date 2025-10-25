import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/Footer.css";
import logo from "../assets/logo-footer.webp";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer bg-light text-dark pt-4">
      {/* ===== PHẦN 1 ===== */}
      <div className="container-fluid px-5 pb-5 part1">
        <div className="row align-items-start justify-content-between g-4">
          {/* Cột trái (logo) */}
          <div className="col-md-3">
            <img

              src={logo}
              alt="Maxwell Logo"

              className="footer-logo mb-3"
              style={{ width: "70px" }}
            />
          </div>

          {/* Cột phải (subscribe + menu) */}
          <div className="col-md-8 d-flex flex-wrap justify-content-end gap-5">
            {/* Subscribe */}
            <div className="subscribe-block">
              <h5 className="fw-semibold mb-3">Subscribe to our list</h5>
              <div className="d-flex pb-1 mail">
                <input
                  type="email"
                  className="form-control border-0 bg-transparent text-dark shadow-none p-0"
                  placeholder="Email"
                />
                <button className="btn btn-sm text-dark">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Menus */}
            <div className="d-flex gap-5 text-end menu">
              <div className="menu-left d-flex flex-column">
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Restaurant
                </a>
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Careers
                </a>
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Trade & Media
                </a>
              </div>
              <div className="menu-right d-flex flex-column">
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Our Story
                </a>
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Sustainability
                </a>
                <a href="#" className="text-decoration-none text-dark mb-1">
                  News
                </a>
                <a href="#" className="text-decoration-none text-dark mb-1">
                  Contact
                </a>
                <Link to="/order-history" className="text-decoration-none text-dark mb-1">
                  Order History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 2 ===== */}
      <div className="container-fluid py-5 px-5 part2">
        <div className="row align-items-center justify-content-between text-center text-md-start">
          <div className="col-md-3">
            <p className="mb-1">Olivers Rd McLaren Vale</p>
            <p className="mb-1">South Australia 5171</p>
            <p className="mb-0">
              Phone: <a href="tel:+61883238200" className="text-dark">+61 8 8323 8200</a>
            </p>
          </div>

          <div className="col-md-6 text-center my-3 my-md-0 maxwell">
            <h2 className="fw-bold display-6 m-0" style={{ letterSpacing: "0.05em" }}>
              MAXWELL–MADE
            </h2>
          </div>

          <div className="col-md-3 d-flex justify-content-md-end justify-content-center gap-3 ic">
            <a href="#" className="text-dark fs-4">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-dark fs-4">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 3 ===== */}
      <div className="container-fluid py-3 px-5 text-secondary small t">
        <div className="row justify-content-between align-items-center text-center text-md-start ">
          <div className="col-md-9 text">
            <p className="mb-0">
              © Maxwell Wines 2025 &nbsp;
            </p>
            <p className="mb-0">
              SA Liquor Licensing Act 1997, Section 113.
              Liquor Licence Number: 57005946 Producer’s Licence 57600699.
              Liquor Must Not Be Supplied To Persons Under 18.
            </p>
          </div>
          <div className="col-md-3 d-flex justify-content-md-end justify-content-center gap-3 mt-3 mt-md-0">
            <a href="#" className="text-decoration-none text-secondary">Privacy Policy</a>
            <a href="#" className="text-decoration-none text-secondary">Terms</a>
            <a href="#" className="text-decoration-none text-secondary">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
