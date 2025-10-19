import { useState } from "react";
import "../css/Carousel.css";

export default function Carousel({ slides = [], height = 460 }) {
  const [active, setActive] = useState(0);

  const goTo = (i) => setActive(i);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        <div
          className="carousel-inner"
          style={{
            transform: `translate3d(-${active * 100}%, 0, 0)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="carousel-item"
              style={{ height: `${height}px` }}
            >
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="carousel-media"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={`Slide ${i}`}
                  className="carousel-media"
                  draggable="false"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots-inline static-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${active === i ? "active" : ""}`}
            onClick={() => goTo(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
