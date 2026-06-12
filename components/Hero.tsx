"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import gsap from "gsap";
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
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
      if (imageWrap)
        imageWrap.style.transform = `perspective(1000px) rotateY(${xPct * 0.3}deg) rotateX(${-yPct * 0.3}deg)`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);
    // GSAP Animation for Name
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    if (firstNameRef.current && lastNameRef.current) {
      tl.from(firstNameRef.current, { y: 50, opacity: 0 })
        .from(lastNameRef.current, { y: 50, opacity: 0 }, "-=0.5"); // overlap
    }
  }, []);


  return (
    <>    <section id="hero" className={styles.hero} ref={heroRef}>

      {/* 🎥 Background Video */}
      <video
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* Animated background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      {/* Grid overlay */}
      <div className={styles.gridOverlay}></div>

      {/* Noise texture */}
      <div className={styles.noise}></div>

      <div className={styles.heroContainer}>
        {/* LEFT CONTENT */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            <span className={styles.badgeDot}></span>
            Available for new opportunities
          </div>

          <h1 className={styles.heroTitle}>
            <span ref={firstNameRef} className={styles.firstName}>Shaheryar</span>
            <span ref={lastNameRef} className={styles.lastName}>Khan</span>
          </h1>

          <div className={styles.roleRow}>
            <span className={styles.roleText}>Front-End Engineer</span>
            <span className={styles.roleDivider}>/</span>
            <span className={styles.roleText}>JavaScript Developer</span>
          </div>

          <p className={styles.heroDesc}>
            5+ years crafting pixel-perfect, high-performance web experiences
            with <strong>React</strong>, <strong>Next.js</strong>, and{" "}
            <strong>TypeScript</strong>.
          </p>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>Years Exp.</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>20+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>MSc</span>
              <span className={styles.statLabel}>NED Univ.</span>
            </div>
          </div>

          {/* CTA */}
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
              href="/SHAHERYAR-KHAN-FRONTEND-DEVELOPER.pdf"
              download="Shaheryar_Khan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnResume}
            >
              Resume
            </a>
          </div>

          {/* Tech Stack */}
          <div className={styles.techStack}>
            {["React", "Next.js", "TypeScript", "Tailwind" ,"django","fastapi","nest.js"].map((tech) => (
              <span key={tech} className={styles.techChip}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.heroImageWrap}>
          <div className={styles.imageGlow}></div>

          <div className={styles.imageBorder}>
            <Image
              src="/profile2.png"
              alt="Profile"
              width={420}
              height={420}
              className={styles.profileImage}
              priority
            />
          </div>

          {/* Floating cards */}
          <div className={styles.floatCard1}>
            ⚡Javascript Expert
          </div>

          <div className={styles.floatCard2}>
            🎓 MSc Graduate
          </div>

          <div className={styles.floatCard3}>
            🚀 Open to Work
          </div>
        </div>
      </div>

      {/* Scroll */}
      <button
        className={styles.scrollCue}
        onClick={() => handleScroll("#about")}
      >
        Scroll ↓
      </button>
    </section>

    </>

  );
}