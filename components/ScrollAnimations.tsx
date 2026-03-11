"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // 1. أنيميشن العناصر العامة (scroll-reveal)
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 150);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".scroll-reveal")
      .forEach((el) => itemObserver.observe(el));

    // 2. أنيميشن الخط العمودي للتايم لاين
    const timeline = document.getElementById("timeline-section");
    if (timeline) {
      const lineObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeline.classList.add("line-visible");
          }
        },
        { threshold: 0.1 }
      );
      lineObserver.observe(timeline);

      return () => {
        itemObserver.disconnect();
        lineObserver.disconnect();
      };
    }

    return () => itemObserver.disconnect();
  }, []);

  return null;
}