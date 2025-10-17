import { useEffect } from "react";
import "../css/SectionTwo.css";

export default function SectionTwo() {
  useEffect(() => {
    const els = document.querySelectorAll(".fadeInUp");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.5 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-two">
      {/* ===== TOP TEXT AREA ===== */}
      <div className="section-top fadeInUp">
        <div className="text-left">
          <h2>
            A Family Estate,<br />
            <em>Crafted By Generations.</em>
          </h2>
        </div>
        <div className="text-right">
          <p>
            Maxwell Wines crafts premium wines that celebrate the limestone 
            character of the estate. From bold Shiraz to vibrant whites and the 
            estate’s iconic meads, every bottle reflects a commitment to 
            sustainability and meticulous winemaking.
          </p>
          <button className="btn-darkline">SHOP WINE & MEAD →</button>
        </div>
      </div>

      {/* ===== IMAGE OVERLAY SECTION ===== */}
      <div className="section-image">
        <img src="/assets/Sec2.webp" alt="Maxwell Restaurant" />
        <div className="overlay">
          <div className="overlay-top-left">MAXWELL RESTAURANT</div>
          <div className="overlay-bottom-right">
            <p>
              A hidden gem in McLaren Vale, the Maxwell Restaurant sets the 
              highest standards in regional fine dining.<br />
              <em>‘South Australian Restaurant of the Year’ – Gourmet Traveller</em>
            </p>
            <button className="btn-lightline">MAKE A RESERVATION →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
