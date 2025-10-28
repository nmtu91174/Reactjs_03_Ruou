import { useEffect, useRef, useState } from "react";
import "../css/FadeInBlock.css";

export default function FadeInBlock({ children, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const fadeTimeout = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fadeTimeout.current);
          setIsVisible(true); // fade-in ngay khi thấy
        } else {
          // chỉ fade-out nếu thực sự ra ngoài > 300ms
          fadeTimeout.current = setTimeout(() => setIsVisible(false), 300);
        }
      },
      { threshold: 0.35, rootMargin: "-60px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fadeTimeout.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fadeInUp ${isVisible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
