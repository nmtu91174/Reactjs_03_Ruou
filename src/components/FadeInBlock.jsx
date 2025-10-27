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
          setIsVisible(true);
        } else {
          fadeTimeout.current = setTimeout(() => setIsVisible(false), 400);
        }
      },
      { threshold: 0.25, rootMargin: "-80px 0px -22.22px 0px" }
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
      className={`fadeInBlock ${isVisible ? "fadeInBlock--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
