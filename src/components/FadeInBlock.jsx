import { useEffect, useRef } from "react";
import "../css/FadeInBlock.css";

export default function FadeInBlock({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 🔹 Vào khung nhìn
        if (entry.isIntersecting) {
          el.classList.add("visible");
        } 
        // 🔹 Ra khỏi khung nhìn → reset lại
        else {
          el.classList.remove("visible");
        }
      },
      {
        threshold: 0.25, // chỉ cần 25% là bắt đầu animation
        rootMargin: "-80px 0px -80px 0px", // không bị trigger sớm
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fadeInUp ${className}`}>
      {children}
    </div>
  );
}
