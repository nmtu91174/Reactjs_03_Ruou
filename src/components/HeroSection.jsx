import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero position-relative">

      {/* === VIDEO === */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/homepage.mp4" type="video/mp4" />
      </video>

      {/* ✅ CHỈ CẦN DI CHUYỂN OVERLAY XUỐNG SAU VIDEO */}
      <div className="overlay"></div>

      {/* === NỘI DUNG HERO === */}
      <div className="container-fluid position-absolute bottom-0 start-0 end-0 text-white z-2 py-5 px-5">
        <div className="row align-items-end justify-content-between">
          <div className="col-md-7">
            <h1 className="fw-bold display-6 lh-1 mb-3 c">
              GROUNDED IN <br /> LIMESTONE & LEGACY
            </h1>
            <p className="lead mb-0 a" style={{ maxWidth: "580px" }}>
              Rooted in the heart of McLaren Vale, Maxwell Wines is a
              family-owned estate where tradition meets innovation.
            </p>
          </div>

          <div className="col-md-4 d-flex justify-content-end gap-3 mt-4 mt-md-0">
            <button className="btn btn-dark rounded-pill px-4 py-2">
              PLAN YOUR VISIT
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
