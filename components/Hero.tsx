"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax effect on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
      const xPct = (clientX / width - 0.5) * 20;
      const yPct = (clientY / height - 0.5) * 20;

      const orb1 = hero.querySelector(`.${styles.orb1}`) as HTMLElement;
      const orb2 = hero.querySelector(`.${styles.orb2}`) as HTMLElement;
      const orb3 = hero.querySelector(`.${styles.orb3}`) as HTMLElement;
      const imageWrap = hero.querySelector(`.${styles.heroImageWrap}`) as HTMLElement;

      if (orb1) orb1.style.transform = `translate(${xPct * 1.2}px, ${yPct * 1.2}px)`;
      if (orb2) orb2.style.transform = `translate(${-xPct * 0.8}px, ${-yPct * 0.8}px)`;
      if (orb3) orb3.style.transform = `translate(${xPct * 0.5}px, ${yPct * 1.5}px)`;
      if (imageWrap) imageWrap.style.transform = `perspective(1000px) rotateY(${xPct * 0.3}deg) rotateX(${-yPct * 0.3}deg)`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      {/* Animated background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      {/* Grid overlay */}
      <div className={styles.gridOverlay}></div>

      {/* Noise texture */}
      <div className={styles.noise}></div>

      <div className={styles.heroContainer}>
        {/* ── LEFT CONTENT ── */}
        <div className={styles.heroContent}>

          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            <span className={styles.badgeDot}></span>
            Available for new opportunities
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.firstName}>Shaheryar</span>

            <span className={styles.lastName}>Khan</span>
          </h1>

          <div className={styles.roleRow}>
            <span className={styles.roleText}>Front-End Engineer</span>
            <span className={styles.roleDivider}>/</span>
            <span className={styles.roleText}>JavaScript Developer</span>
          </div>

          <p className={styles.heroDesc}>
            4+ years crafting pixel-perfect, high-performance web experiences
            with <strong>React</strong>, <strong>Next.js</strong>, and{" "}
            <strong>TypeScript</strong>. MSc Computer Science — NED University.
          </p>

          {/* Stat pills */}
          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <span className={styles.statNum}>4+</span>
              <span className={styles.statLabel}>Years Exp.</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>30+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>MSc</span>
              <span className={styles.statLabel}>NED Univ.</span>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <button
              className={styles.btnPrimary}
              onClick={() => handleScroll("#projects")}
            >
              <span className={styles.btnInner}>View My Work</span>
              <span className={styles.btnArrow}>↓</span>
              <span className={styles.btnGlow}></span>
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => handleScroll("#contact")}
            >
              Get in Touch
            </button>
            <a
              href="/resume.pdf"
              download="Shaheryar_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnResume}
            >
              <span className={styles.btnResumeIcon}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1v9M8 10l-3-3M8 10l3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 13h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Resume
            </a>
          </div>

          {/* Tech stack chips */}
          <div className={styles.techStack}>
            {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
              <span key={tech} className={styles.techChip}>{tech}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className={styles.heroImageWrap}>
          {/* <div className={styles.imageRing}></div> */}
          <div className={styles.imageGlow}></div>
          <div className={styles.imageBorder}>
            <Image
              src="/profile2.png"
              alt="Shaheryar Khan – Front-End Developer"
              width={420}
              height={420}
              className={styles.profileImage}
              priority
            />
            <div className={styles.imageShimmer}></div>
          </div>

          {/* Floating cards */}
          <div className={styles.floatCard1}>
            <span className={styles.floatIcon}>⚡</span>
            <div className={styles.floatText}>
              <strong>React &amp; Next.js</strong>
              <span>Expert</span>
            </div>
          </div>
          <div className={styles.floatCard2}>
            <span className={styles.floatIcon}>🎓</span>
            <div className={styles.floatText}>
              <strong>MSc Graduate</strong>
              <span>NED University</span>
            </div>
          </div>
          <div className={styles.floatCard3}>
            <span className={styles.floatIcon}>🚀</span>
            <div className={styles.floatText}>
              <strong>Open to Work</strong>
              <span>Remote / On-site</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        className={styles.scrollCue}
        onClick={() => handleScroll("#about")}
        aria-label="Scroll to about"
      >
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollLine}></span>
      </button>
    </section>
  );
}