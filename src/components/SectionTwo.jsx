import { useState } from "react";
import FadeInBlock from "../components/FadeInBlock";
import "../css/SectionTwo.css";

export default function SectionTwo() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-two">
      {/* ===== TOP TEXT AREA ===== */}
      <div className="section-top">
        <FadeInBlock className="text-left">
          <h2>
            A Family Estate,<br />
            <em>Crafted By Generations.</em>
          </h2>
        </FadeInBlock>

        <FadeInBlock className="text-right">
          <p>
            Maxwell Wines crafts premium wines that celebrate the limestone
            character of the estate. From bold Shiraz to vibrant whites and the
            estate’s iconic meads, every bottle reflects a commitment to
            sustainability and meticulous winemaking.
          </p>
          <button className="btn-darkline">SHOP WINE & MEAD →</button>
        </FadeInBlock>
      </div>

      {/* ===== IMAGE OVERLAY SECTION ===== */}
      <div className="section-image">
        <img
          src="assets/hp-sec2/Sec2.webp"
          alt="Maxwell Restaurant"
          draggable="false"
        />
        <div className="overlay">
          <FadeInBlock className="overlay-top-left">
            MAXWELL RESTAURANT
          </FadeInBlock>

          <FadeInBlock className="overlay-bottom-right">
            <div className="overlay-text">
              <p>
                A hidden gem in McLaren Vale, the Maxwell Restaurant sets the
                highest standards in regional fine dining.<br />
                <em>
                  ‘South Australian Restaurant of the Year’ – Gourmet Traveller
                </em>
              </p>
              <button className="btn-lightline">
                MAKE A RESERVATION →
              </button>
            </div>
          </FadeInBlock>
        </div>
      </div>

      {/* ===== SECOND 50/50 IMAGE SECTION ===== */}
      <div className="full-border"> </div>

      <FadeInBlock className="two-cols">
        {/* LEFT: CAROUSEL SLIDE TRACK */}
        <div className="col left">
          <div className="carousel-track">
            <div
              className="carousel-inner"
              style={{
                width: "200%",
                transform: `translateX(-${activeIndex * 50}%)`,
              }}
            >
              <img src="assets/hp-sec2/Sec2-1.webp" alt="Shop Wine" />
              <img src="assets/hp-sec2/Sec2-2.webp" alt="Shop Mead" />
            </div>
          </div>

          <div className="content-overlay">
            <div key={activeIndex} className="text-block fade-anim">
              <h2>{activeIndex === 0 ? "Shop Wine" : "Shop Mead"}</h2>
              <p>
                {activeIndex === 0
                  ? "Estate grown on our limestone ridge. McLaren Vale favourites Shiraz and Grenache, along with Nero D’Avola, Grenache Blanc, and more."
                  : "An ancient craft, honed by Maxwell to become Australia’s favourite honey wine. A mead for all occasions."}
              </p>
              <button className="btn-hoverline">SHOP NOW →</button>
            </div>

            <div className="carousel-dots-inline static-dots">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  className={`dot ${activeIndex === i ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: STATIC IMAGE */}
        <div className="col right">
          <img src="assets/hp-sec2/Sec2-3.webp" alt="Our Story" />
          <div className="content-overlay">

            <div className="text-block">
              <h2>Our Story</h2>
              <p>
                With a legacy spanning decades, the Maxwell family continues
                to shape the estate’s story.
              </p>
              <div className="overlay-bottom-row">
                <button className="btn-hoverline">LEARN MORE →</button>
              </div>
            </div>
          </div>
        </div>
      </FadeInBlock>
    </section>
  );
}
