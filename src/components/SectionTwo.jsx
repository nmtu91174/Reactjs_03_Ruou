import { useEffect, useState } from "react";
import "../css/SectionTwo.css";

export default function SectionTwo() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fade-in animation
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

  const [index, setIndex] = useState(0);

  const items = [
    { type: "video", src: "/assets/video1.mp4", title: "Maxwell Fine Dining", desc: "South Australian Restaurant of the Year, awarded by Gourmet Traveller." },
    { type: "image", src: "/assets/tasting.jpg", title: "Maxwell Wine Tasting", desc: "Choose your wine flight. Add snacks for a decadent experience." },
    { type: "image", src: "/assets/mead.jpg", title: "Maxwell Mead Tasting", desc: "A mead for all occasions. Taste Australia’s finest meads." },
    { type: "image", src: "/assets/tour.jpg", title: "Winery Heritage Tour & Tasting", desc: "Discover the history and heritage of Maxwell Estate." },
    { type: "image", src: "/assets/dining.jpg", title: "Helicopter Flight & Fine Dining", desc: "A 30-minute scenic flight followed by a fine-dining lunch." },
    { type: "image", src: "/assets/picnic.jpg", title: "Maxwell Maze & Picnic", desc: "Relax with wine while the kids explore the maze." },
    { type: "image", src: "/assets/sustain.jpg", title: "Vineyard Sustainability Tour", desc: "A unique opportunity to explore Maxwell Estate." },
    { type: "video", src: "/assets/video2.mp4", title: "Winery Experience", desc: "Immerse yourself in the heart of McLaren Vale." },
  ];

  const next = () => setIndex((prev) => Math.min(prev + 1, items.length - 4));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));


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
        <img src="/assets/hp-sec2/Sec2.webp" alt="Maxwell Restaurant" />
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

      {/* ===== SECOND 50/50 IMAGE SECTION ===== */}
      <div className="full-border"></div>
      <div className="two-cols fadeInUp">

        {/* LEFT: CAROUSEL SLIDE TRACK */}
        <div className="col left">
          <div className="carousel-track">
            <div
              className="carousel-inner"
              style={{
                width: "200%", // ✅ tổng chiều rộng 2 ảnh
                transform: `translateX(-${activeIndex * 50}%)`, // ✅ trượt đúng nửa khung mỗi lần
              }}
            >
              <img src="/assets/hp-sec2/Sec2-1.webp" alt="Shop Wine" />
              <img src="/assets/hp-sec2/Sec2-2.webp" alt="Shop Mead" />
            </div>
          </div>

          <div className="content-overlay">
            {/* TEXT CÓ FADE */}
            <div key={activeIndex} className="text-block fade-anim">
              <h2>{activeIndex === 0 ? "Shop Wine" : "Shop Mead"}</h2>
              <p>
                {activeIndex === 0
                  ? "Estate grown on our limestone ridge. McLaren Vale favourites Shiraz and Grenache, along with Nero D’Avola, Grenache Blanc, and more."
                  : "An ancient craft, honed by Maxwell to become Australia’s favourite honey wine. A mead for all occasions."}
              </p>
              <button className="btn-hoverline">SHOP NOW →</button>
            </div>

            {/* DOTS CỐ ĐỊNH KHÔNG BỊ FADE */}
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
          <img src="/assets/hp-sec2/Sec2-3.webp" alt="Our Story" />
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
      </div>
    </section>
  );
}
