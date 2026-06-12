"use client";

import { useEffect, useRef } from "react";
import styles from "./Services.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger animation for section header
    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (titleRef.current && subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        ).fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Card entrance animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, []);

  // Card mouse movement border effect (dynamic gradients)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      {/* Background radial soft glows */}
      <div className={styles.bgGlow1} aria-hidden></div>
      <div className={styles.bgGlow2} aria-hidden></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <p ref={subtitleRef} className={styles.sectionLabel}>
            Core Competencies
          </p>
          <h2 ref={titleRef} className={styles.sectionTitle}>
            How I Bring <span className="gradient-text">Value</span> To Projects
          </h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {/* Card 1: Front-End Apps (Large) */}
          <div
            className={`${styles.card} ${styles.largeCard}`}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>High-Performance Web Apps</h3>
                <p className={styles.cardText}>
                  Engineering fast, scaleable, and SEO-optimized web applications with 
                  <strong> React, Next.js</strong>, and <strong>TypeScript</strong>. I specialize in building solid client-side architectures that scale to millions of users while maintaining clean codebases.
                </p>
                <div className={styles.techChips}>
                  <span>React</span>
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>SSR / ISR</span>
                  <span>Hydration Tuning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Performance Audit (Medium) */}
          <div className={styles.card} onMouseMove={handleMouseMove}>
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Speed &amp; Web Vitals</h3>
                <p className={styles.cardText}>
                  Achieving top-tier scores by eliminating layout shifts, optimizing images, code splitting, and implementing intelligent caching strategies.
                </p>
                <div className={styles.techChips}>
                  <span>Lighthouse</span>
                  <span>Core Web Vitals</span>
                  <span>Code Splitting</span>
                  <span>Image Optimization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Responsive UI (Medium) */}
          <div className={styles.card} onMouseMove={handleMouseMove}>
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Responsive Architecture</h3>
                <p className={styles.cardText}>
                  Designing interfaces that adapt gracefully across all devices. Clean layouts using CSS Grid, Flexbox, and Tailwind CSS.
                </p>
                <div className={styles.techChips}>
                  <span>Mobile-First</span>
                  <span>TailwindCSS</span>
                  <span>CSS Grid / Flexbox</span>
                  <span>Cross-Browser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: State & APIs (Small) */}
          <div className={styles.card} onMouseMove={handleMouseMove}>
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>State &amp; API Integration</h3>
                <p className={styles.cardText}>
                  Integrating secure, RESTful APIs and WebSockets. Proficient in Redux Toolkit, Zustand, and React Query for clean data fetching.
                </p>
                <div className={styles.techChips}>
                  <span>Redux</span>
                  <span>Zustand</span>
                  <span>React Query</span>
                  <span>REST / GraphQL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Animations (Large) */}
          <div
            className={`${styles.card} ${styles.largeCard}`}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 21l8.982-11.795m-8.982 6.691 6.691-8.364m-6.691 6.691H3.75A1.125 1.125 0 0 1 2.625 15V9.75M21.75 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H1.5"
                  />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Interactive UI &amp; Motion</h3>
                <p className={styles.cardText}>
                  Adding custom micro-animations that make pages feel alive. Utilizing **GSAP, CSS transitions, and SVG manipulation** to create stunning, storytelling visual layouts that engage users.
                </p>
                <div className={styles.techChips}>
                  <span>GSAP</span>
                  <span>ScrollTrigger</span>
                  <span>SVG Motion</span>
                  <span>Micro-interactions</span>
                  <span>Keyframe Choreography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
