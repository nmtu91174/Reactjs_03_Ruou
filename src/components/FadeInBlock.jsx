import { useEffect, useRef, useState } from "react";
import "../css/FadeInBlock.css";

/**
 * FadeInBlock — dành riêng cho Lenis Smooth Scroll
 * ------------------------------------------------
 * - Hỗ trợ fadeIn, fadeOut, và fadeIn lại khi quay ngược
 * - Tương thích hoàn toàn với Lenis (transform-based scroll)
 */
export default function FadeInBlock({
  children,
  className = "",
  fadeOut = true,
  once = false, // nếu muốn chỉ fade 1 lần
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);
  const scrollY = useRef(0);
  const scrollDir = useRef("down"); // theo dõi hướng cuộn

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lenis = window.lenis;

    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const inView = rect.top < vh * 0.85 && rect.bottom > vh * 0.1;

      // FadeIn
      if (inView && !isVisible) {
        setIsVisible(true);
      }

      // FadeOut
      if (!inView && fadeOut && !once && isVisible) {
        // fadeOut chỉ khi phần tử thật sự rời viewport
        if (rect.bottom < 0 || rect.top > vh) {
          setIsVisible(false);
        }
      }

      ticking.current = false;
    };

    const handleScroll = (e) => {
      const currentY = lenis ? lenis.scroll : window.scrollY;
      scrollDir.current = currentY > scrollY.current ? "down" : "up";
      scrollY.current = currentY;

      if (!ticking.current) {
        requestAnimationFrame(checkVisibility);
        ticking.current = true;
      }
    };

    // Lenis event hoặc fallback
    if (lenis) lenis.on("scroll", handleScroll);
    else window.addEventListener("scroll", handleScroll);

    // initial check
    checkVisibility();

    return () => {
      if (lenis) lenis.off("scroll", handleScroll);
      else window.removeEventListener("scroll", handleScroll);
    };
  }, [fadeOut, once, isVisible]);

  return (
    <div
      ref={ref}
      className={`fadeInBlock ${isVisible ? "fadeInBlock--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
