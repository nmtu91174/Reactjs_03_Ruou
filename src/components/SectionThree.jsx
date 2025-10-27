import { useState, useRef, useEffect } from "react";
import FadeInBlock from "../components/FadeInBlock";
import ProductCarousel from "../components/ProductCarousel";
import "../css/SectionThree.css";

export default function SectionThree() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  const items = [
    { type: "video", src: "/assets/hp-sec2/1.mp4", title: "Maxwell Fine Dining", desc: "South Australian Restaurant of the Year, awarded by Gourmet Traveller." },
    { type: "image", src: "/assets/hp-sec2/2.webp", title: "Maxwell Wine Tasting", desc: "Choose your wine flight. Add snacks for a decadent experience." },
    { type: "image", src: "/assets/hp-sec2/3.webp", title: "Maxwell Mead Tasting", desc: "A mead for all occasions. Taste Australia’s finest meads." },
    { type: "image", src: "/assets/hp-sec2/4.webp", title: "Winery Heritage Tour & Tasting", desc: "Discover the history and heritage of Maxwell Estate." },
    { type: "image", src: "/assets/hp-sec2/5.webp", title: "Winery Heritage Tour, Tasting & Fine Dining", desc: "A behind-the-scenes tour of our winery with an exclusive tasting." },
    { type: "image", src: "/assets/hp-sec2/6.webp", title: "Helicopter Flight & Fine Dining", desc: "A once-in-a-lifetime experience with a scenic helicopter flight." },
    { type: "image", src: "/assets/hp-sec2/7.webp", title: "Maxwell Maze & Picnic", desc: "Relax with a bottle of wine while the kids explore the maze." },
    { type: "video", src: "/assets/hp-sec2/8.mp4", title: "Maxwell Estate Exploration", desc: "A unique and intimate opportunity to explore the Maxwell Estate." },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const step = 1;
  const maxIndex = items.length - visibleCount;

  const next = () => setIndex((prev) => (prev < maxIndex ? prev + step : 0));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - step : maxIndex));

  const [translate, setTranslate] = useState(0);
  useEffect(() => {
    if (!trackRef.current) return;
    const firstItem = trackRef.current.querySelector(".experience-item");
    if (firstItem) {
      const itemWidth = firstItem.offsetWidth + 20;
      // Smooth easing transition
      requestAnimationFrame(() => {
        setTranslate(-index * itemWidth);
      });
    }
  }, [index, visibleCount]);

  // === Auto-slide (pause on hover) ===
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, index]);

  return (
    <section className="section-three">
      <FadeInBlock>
        <div className="experience-header">
          <h3>EXPERIENCE MAXWELL WINES</h3>
          <div className="experience-arrows">
            <button onClick={prev}>&larr;</button>
            <button onClick={next}>&rarr;</button>
          </div>
        </div>
      </FadeInBlock>

      <FadeInBlock>
        <div
          className="experience-container"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="experience-track"
            style={{
              transform: `translate3d(${translate}px, 0, 0)`,
              transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="experience-item fade-slide">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="media"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="media"
                    loading="lazy"
                  />
                )}
                <div className="item-overlay">
                  <div className="item-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <button className="btn-lightline">MAKE A RESERVATION →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInBlock>

      <FadeInBlock>
        <ProductCarousel />
      </FadeInBlock>
    </section>
  );
}
