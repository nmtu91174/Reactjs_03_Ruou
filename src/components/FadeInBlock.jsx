import { useEffect, useRef, useState } from "react";
import "../css/FadeInBlock.css";

// ✅ Global observer — chỉ tạo 1 lần duy nhất
let sharedObserver = null;
const observersMap = new WeakMap();

export default function FadeInBlock({ children, className = "", fadeOut = true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!sharedObserver) {
      sharedObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const cb = observersMap.get(entry.target);
            if (cb) cb(entry);
          }
        },
        {
          threshold: 0.2,
          rootMargin: "-100px 0px -100px 0px",
        }
      );
    }

    const handleIntersect = (entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => setIsVisible(true));
      } else if (fadeOut) {
        requestAnimationFrame(() => setIsVisible(false));
      }
    };

    observersMap.set(el, handleIntersect);
    sharedObserver.observe(el);

    return () => {
      sharedObserver.unobserve(el);
      observersMap.delete(el);
    };
  }, [fadeOut]);

  return (
    <div
      ref={ref}
      className={`fadeInBlock ${isVisible ? "fadeInBlock--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
