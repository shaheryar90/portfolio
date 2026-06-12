"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile or touch-enabled
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return () => window.removeEventListener("resize", checkMobile);

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    // Center positions
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power3" });

    const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.25, ease: "power3" });
    const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.25, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    // Hover effect handlers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is interactive
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(`[role="button"]`) ||
        target.classList.contains("pj-thumb") ||
        target.closest(".pj-thumb") ||
        target.closest("[onmousemove]"); // custom slider items

      if (isInteractive) {
        gsap.to(cursorRing, {
          scale: 1.8,
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          borderColor: "rgba(59, 130, 246, 0.6)",
          duration: 0.25,
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          backgroundColor: "#3b82f6",
          duration: 0.25,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(`[role="button"]`) ||
        target.classList.contains("pj-thumb") ||
        target.closest(".pj-thumb") ||
        target.closest("[onmousemove]");

      if (isInteractive) {
        gsap.to(cursorRing, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.25,
        });
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: "#ffffff",
          duration: 0.25,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorDotRef} className={styles.cursorDot} />
      <div ref={cursorRingRef} className={styles.cursorRing} />
    </>
  );
}
