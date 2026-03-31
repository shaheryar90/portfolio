"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const defaultProjects = [
  {
    title: "Visit Abu Dhabi",
    category: "Agency Work",
    description:
      "Official tourism website for Abu Dhabi, featuring high-performance landing pages and interactive maps.",
    link: "https://visitabudhabi.ae/en",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    tags: ["Next.js", "React", "State Management", "Performance"],
    year: "2024",
    color: "#C9A84C",
  },
  {
    title: "DET – Dubai Learns",
    category: "Agency Work",
    description:
      "Educational platform for Dubai, providing resources and information for students and educators across the emirate.",
    link: "https://dubailearnsme.ae/",
    image:
      "det.png",
    tags: ["React", "Custom CSS", "Responsive Design"],
    year: "2023",
    color: "#4C8EC9",
  },
  {
    title: "Coral",
    category: "Web App",
    description:
      "A fully functional e-commerce web application designed to enhance user experience and streamline the online shopping process.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    tags: ["E-commerce", "React", "API Integration"],
    year: "2023",
    color: "#C9574C",
  },
  {
    title: "Active Ozone",
    category: "Industrial App",
    description:
      "Facilitates the production cleaning industry with automation cleaning instruction cards in 8 different languages.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["Automation", "Multi-language", "React"],
    year: "2022",
    color: "#4CC97A",
  },
  {
    title: "Invoices for Business",
    category: "Fintech",
    description:
      "An Accounting Web App for Lawyers and clients. Lawyers can assign jobs, charge customers, and create transactions.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tags: ["Fintech", "Next.js", "State Management"],
    year: "2022",
    color: "#9B4CC9",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [projects, setProjects] = useState(defaultProjects);
  // Fetch projects dynamically
  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" }) // always fresh
      .then(res => res.json())
      .then(setProjects)
      .catch(err => console.error(err));
  }, []);

  if (!projects.length) return <p>Loading projects...</p>;
  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setAnimDir(index > active ? "right" : "left");
      setPrev(active);
      setActive(index);
      setTimeout(() => setPrev(null), 600);
    },
    [active]
  );

  const next = useCallback(() => {
    goTo((active + 1) % projects.length);
  }, [active, goTo]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4000);
  }, [next]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handleCardClick = (i: number) => {
    goTo(i);
    startInterval();
  };

  const p = projects[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .pj-root {
          background: #0a0a0a;
          padding: 100px 0 120px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .pj-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .pj-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          pointer-events: none;
          transition: background 0.8s ease, left 0.8s ease, top 0.8s ease;
        }

        .pj-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .pj-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 64px;
        }

        .pj-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .pj-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 7vw, 96px);
          line-height: 0.9;
          color: #fff;
          margin: 0;
          letter-spacing: 0.02em;
        }

        .pj-title em {
          font-style: normal;
          -webkit-text-stroke: 1px #fff;
          color: transparent;
        }

        .pj-counter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 80px;
          color: #1a1a1a;
          line-height: 1;
          user-select: none;
        }

        /* ── SLIDER TRACK ── */
        .pj-track {
          display: flex;
          gap: 16px;
          align-items: stretch;
          height: 480px;
        }

        /* ── CARD ── */
        .pj-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: flex 0.7s cubic-bezier(0.77,0,0.18,1),
                      opacity 0.5s ease,
                      transform 0.5s ease;
          flex: 1;
          min-width: 72px;
        }

        .pj-card.active {
          flex: 5;
          cursor: default;
        }

        .pj-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease, filter 0.5s ease;
          filter: brightness(0.45) saturate(0.8);
        }

        .pj-card.active img {
          filter: brightness(0.55) saturate(1);
          transform: scale(1.02);
        }

        .pj-card:not(.active):hover img {
          filter: brightness(0.6) saturate(1);
          transform: scale(1.05);
        }

        /* color tint overlay */
        .pj-card-tint {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.6s ease;
          mix-blend-mode: color;
        }

        .pj-card.active .pj-card-tint {
          opacity: 0.25;
        }

        /* ── INACTIVE LABEL ── */
        .pj-card-side-label {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          transition: opacity 0.4s ease;
        }

        .pj-card.active .pj-card-side-label {
          opacity: 0;
          pointer-events: none;
        }

        /* ── ACTIVE CONTENT ── */
        .pj-card-content {
          position: absolute;
          inset: 0;
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: 0;
          transition: opacity 0.5s ease 0.15s;
          pointer-events: none;
        }

        .pj-card.active .pj-card-content {
          opacity: 1;
          pointer-events: auto;
        }

        /* gradient scrim */
        .pj-card-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.5) 45%,
            transparent 75%
          );
          z-index: 0;
          border-radius: 20px;
        }

        .pj-card-content > * { position: relative; z-index: 1; }

        .pj-chip-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .pj-chip {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
        }

        .pj-chip.accent {
          border-color: var(--accent);
          color: var(--accent);
        }

        .pj-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 4vw, 56px);
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: 0.04em;
          line-height: 1;
          animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .pj-card.active .pj-card-title {
          animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }

        .pj-card-desc {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          max-width: 480px;
          margin: 0 0 22px;
          animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }

        .pj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
          animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.28s both;
        }

        .pj-tag {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .pj-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: #000;
          background: #fff;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          width: fit-content;
          animation: slideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.35s both;
        }

        .pj-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255,255,255,0.15);
        }

        .pj-btn-arrow {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: transform 0.25s ease;
        }

        .pj-btn:hover .pj-btn-arrow {
          transform: translate(2px, -2px);
        }

        /* ── TOP-RIGHT YEAR BADGE ── */
        .pj-year-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          z-index: 2;
          opacity: 0;
          transition: opacity 0.4s ease 0.3s;
        }

        .pj-card.active .pj-year-badge {
          opacity: 1;
        }

        /* ── BOTTOM NAV ── */
        .pj-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 36px;
        }

        .pj-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .pj-dot {
          border: none;
          background: none;
          padding: 4px;
          cursor: pointer;
        }

        .pj-dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 100px;
          background: #333;
          transition: width 0.4s cubic-bezier(0.77,0,0.18,1), background 0.4s ease;
        }

        .pj-dot.active .pj-dot-inner {
          width: 28px;
          background: #fff;
        }

        .pj-arrows {
          display: flex;
          gap: 12px;
        }

        .pj-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }

        .pj-arrow-btn:hover {
          border-color: #555;
          background: #1a1a1a;
          transform: scale(1.08);
        }

        /* ── PROGRESS BAR ── */
        .pj-progress {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pj-progress-text {
          font-size: 11px;
          font-weight: 500;
          color: #444;
          letter-spacing: 0.08em;
          min-width: 32px;
        }

        .pj-progress-track {
          width: 100px;
          height: 1px;
          background: #222;
          position: relative;
          overflow: hidden;
        }

        .pj-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #fff;
          transition: width 0.6s cubic-bezier(0.77,0,0.18,1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .pj-track { height: 560px; flex-direction: column; }
          .pj-card { min-height: 56px; min-width: unset; }
          .pj-card.active { flex: 6; }
          .pj-card-side-label { transform: translateX(-50%); bottom: 16px; }
          .pj-counter { display: none; }
        }
      `}</style>

      <section id="projects" className="pj-root">
        <div className="pj-noise" />
        <div
          className="pj-glow"
          style={{
            background: p.color,
            top: "20%",
            left: `${(active / (projects.length - 1)) * 60 + 10}%`,
            transform: "translate(-50%,-50%)",
          }}
        />

        <div className="pj-inner">
          {/* Header */}
          <div className="pj-header">
            <div>
              <p className="pj-label">Portfolio</p>
              <h2 className="pj-title">
                Featured <em>Projects</em>
              </h2>
            </div>
            <div className="pj-counter">0{active + 1}</div>
          </div>

          {/* Slider Track */}
          <div className="pj-track">
            {projects.map((proj, i) => (
              <div
                key={i}
                className={`pj-card${active === i ? " active" : ""}`}
                style={{ "--accent": proj.color } as React.CSSProperties}
                onClick={() => i !== active && handleCardClick(i)}
              >
                <img src={proj.image} alt={proj.title} draggable={false} />

                {/* Color tint */}
                <div
                  className="pj-card-tint"
                  style={{ background: proj.color }}
                />

                {/* Year badge */}
                <div className="pj-year-badge">{proj.year}</div>

                {/* Inactive label */}
                <div className="pj-card-side-label">{proj.title}</div>

                {/* Active content */}
                <div className="pj-card-content">
                  <div className="pj-chip-row">
                    <span className="pj-chip accent">{proj.category}</span>
                    <span className="pj-chip">{proj.year}</span>
                  </div>
                  <h3 className="pj-card-title">{proj.title}</h3>
                  <p className="pj-card-desc">{proj.description}</p>
                  <div className="pj-tags">
                    {proj.tags.map((tag, ti) => (
                      <span key={ti} className="pj-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {proj.link !== "#" && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj-btn"
                    >
                      View Project
                      <span className="pj-btn-arrow">↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="pj-nav">
            {/* Dots */}
            <div className="pj-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`pj-dot${active === i ? " active" : ""}`}
                  onClick={() => handleCardClick(i)}
                  aria-label={`Go to project ${i + 1}`}
                >
                  <div className="pj-dot-inner" />
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="pj-progress">
              <span className="pj-progress-text">0{active + 1}</span>
              <div className="pj-progress-track">
                <div
                  className="pj-progress-fill"
                  style={{
                    width: `${((active + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
              <span className="pj-progress-text" style={{ color: "#666" }}>
                0{projects.length}
              </span>
            </div>

            {/* Arrows */}
            <div className="pj-arrows">
              <button
                className="pj-arrow-btn"
                onClick={() =>
                  handleCardClick(
                    (active - 1 + projects.length) % projects.length
                  )
                }
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="pj-arrow-btn"
                onClick={() => handleCardClick((active + 1) % projects.length)}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}