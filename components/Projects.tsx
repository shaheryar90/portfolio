"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const defaultProjects = [
  {
    title: "Visit Abu Dhabi",
    cat: "Agency Work",
    desc: "Official tourism website for Abu Dhabi — high-performance landing pages, interactive maps and immersive content.",
    link: "https://visitabudhabi.ae/en",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85",
    tags: ["Next.js", "React", "Performance"],
    year: "2024",
    color: "#C9A84C",
  },
  {
    title: "DET – Dubai Learns",
    cat: "Agency Work",
    desc: "Educational platform for Dubai providing resources and information for students and educators across the emirate.",
    link: "https://dubailearns.ae/",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=85",
    tags: ["React", "Custom CSS", "Responsive Design"],
    year: "2023",
    color: "#4C8EC9",
  },
  {
    title: "Naseej",
    cat: "Sustainability Platform",
    desc: "UAE textile circularity initiative — from community recycling action to national sustainability strategy, built multilingually on Umbraco CMS.",
    link: "https://naseej-dev-umbraco.azurewebsites.net/",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
    tags: ["Umbraco CMS", "Next.js", "Multi-language"],
    year: "2025",
    color: "#4CC97A",
  },
  {
    title: "Coral",
    cat: "Web App",
    desc: "A fully functional e-commerce application designed to enhance user experience and streamline the online shopping process.",
    link: "#",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&q=85",
    tags: ["E-commerce", "React", "API Integration"],
    year: "2023",
    color: "#C9574C",
  },
  {
    title: "Active Ozone",
    cat: "Industrial App",
    desc: "Facilitates the production cleaning industry with automated instruction cards delivered in 8 different languages.",
    link: "#",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85",
    tags: ["Automation", "Multi-language", "React"],
    year: "2022",
    color: "#E8A838",
  },
  {
    title: "Invoices for Business",
    cat: "Fintech",
    desc: "Accounting web app for lawyers and clients — assign jobs, charge customers, and manage transactions seamlessly.",
    link: "#",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=85",
    tags: ["Fintech", "Next.js", "State Management"],
    year: "2022",
    color: "#9B4CC9",
  },
];

const CIRC = 113;
const AUTO_DUR = 4800;

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

export default function Projects() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [barKey, setBarKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      if (animating || next === cur) return;
      setAnimating(true);
      setPrev(cur);
      setCur(next);
      setBarKey((k) => k + 1);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 1200);
    },
    [animating, cur]
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % defaultProjects.length;
        setPrev(c);
        setAnimating(true);
        setBarKey((k) => k + 1);
        setTimeout(() => {
          setPrev(null);
          setAnimating(false);
        }, 1200);
        return next;
      });
    }, AUTO_DUR);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleNav = (dir: "prev" | "next") => {
    const next =
      dir === "next"
        ? (cur + 1) % defaultProjects.length
        : (cur - 1 + defaultProjects.length) % defaultProjects.length;
    go(next);
    resetTimer();
  };

  const p = defaultProjects[cur];
  const progressOffset = CIRC - CIRC * ((cur + 1) / defaultProjects.length);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .pj-root {
          position: relative;
          width: 100%;
          background: #060606;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── FEATURED HEADER ── */
        .pj-header {
          position: relative;
          z-index: 20;
          padding: 36px 64px 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          pointer-events: none;
        }

        .pj-header-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pj-feat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
        }

        .pj-feat-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          line-height: 0.9;
          color: #fff;
          letter-spacing: 0.02em;
          margin: 0;
        }

        .pj-feat-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }

        .pj-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 4px;
        }

        .pj-header-divider {
          width: 40px;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }

        .pj-header-counter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: rgba(255, 255, 255, 0.08);
          line-height: 1;
          letter-spacing: 0.02em;
          transition: color 0.5s;
        }

        /* ── STAGE ── */
        .pj-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 560px;
          overflow: hidden;
        }

        /* ── SLIDES ── */
        .pj-slide {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .pj-slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .pj-slide.entering .pj-slide-bg {
          animation: pjBgIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .pj-slide.leaving .pj-slide-bg {
          animation: pjBgOut 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes pjBgIn {
          from { transform: scale(1.07); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        @keyframes pjBgOut {
          from { transform: scale(1);    opacity: 1; }
          to   { transform: scale(0.96); opacity: 0; }
        }

        .pj-grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(6,6,6,0.95) 0%,
            rgba(6,6,6,0.7)  38%,
            rgba(6,6,6,0.2)  65%,
            transparent      100%
          );
        }

        .pj-grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,6,6,0.98) 0%,
            transparent      40%
          );
        }

        .pj-accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          z-index: 4;
          transition: background 0.6s ease;
        }

        .pj-slide-year {
          position: absolute;
          top: 24px;
          right: 80px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.2);
          z-index: 3;
        }

        .pj-slide-num {
          position: absolute;
          bottom: 110px;
          right: 80px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 110px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.035);
          z-index: 1;
          user-select: none;
        }

        /* ── SLIDE CONTENT ── */
        .pj-content {
          position: absolute;
          bottom: 48px;
          left: 64px;
          right: 55%;
          z-index: 3;
        }

        .pj-slide.entering .pj-content {
          animation: pjContIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        .pj-slide.leaving .pj-content {
          animation: pjContOut 0.45s cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes pjContIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pjContOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-18px); }
        }

        .pj-s-cat {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 10px;
          animation: pjStag 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        .pj-s-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(46px, 6.5vw, 80px);
          line-height: 0.92;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
          animation: pjStag 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }

        .pj-s-desc {
          font-size: 12.5px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.5);
          max-width: 340px;
          margin-bottom: 18px;
          animation: pjStag 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }

        .pj-s-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
          animation: pjStag 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.41s both;
        }

        .pj-s-tag {
          font-size: 9.5px;
          padding: 3px 9px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.09);
          letter-spacing: 0.04em;
        }

        .pj-s-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          color: #000;
          background: #fff;
          width: fit-content;
          transition: transform 0.22s, box-shadow 0.22s;
          animation: pjStag 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.47s both;
        }

        .pj-s-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(255, 255, 255, 0.14);
        }

        .pj-s-btn-ic {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          transition: transform 0.22s;
        }

        .pj-s-btn:hover .pj-s-btn-ic {
          transform: translate(2px, -2px);
        }

        @keyframes pjStag {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── NAV ── */
        .pj-nav {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }

        .pj-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(0, 0, 0, 0.5);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
          backdrop-filter: blur(10px);
        }

        .pj-nav-btn:hover {
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: scale(1.1);
        }

        /* ── PROGRESS RING ── */
        .pj-ring {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .pj-ring svg {
          transform: rotate(-90deg);
        }

        .pj-ring-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.05em;
        }

        /* ── AUTO PROGRESS BAR ── */
        .pj-autobar {
          position: relative;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          z-index: 10;
          overflow: hidden;
        }

        .pj-autobar-fill {
          height: 100%;
          width: 0;
        }

        .pj-autobar-fill.running {
          animation: pjBarFill ${AUTO_DUR}ms linear forwards;
        }

        @keyframes pjBarFill {
          from { width: 0; }
          to   { width: 100%; }
        }

        /* ── THUMBNAILS ── */
        .pj-thumbs {
          display: flex;
          height: 88px;
          overflow: hidden;
        }

        .pj-thumb {
          flex: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: flex 0.65s cubic-bezier(0.77, 0, 0.18, 1);
        }

        .pj-thumb.active {
          flex: 2.5;
          cursor: default;
        }

        .pj-thumb-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: filter 0.45s, transform 0.55s;
        }

        .pj-thumb:not(.active) .pj-thumb-img {
          filter: brightness(0.25) saturate(0.3);
        }

        .pj-thumb.active .pj-thumb-img {
          filter: brightness(0.45) saturate(0.85);
          transform: scale(1.06);
        }

        .pj-thumb:not(.active):hover .pj-thumb-img {
          filter: brightness(0.4);
        }

        .pj-thumb-dim {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
        }

        .pj-thumb-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.65s cubic-bezier(0.77, 0, 0.18, 1);
        }

        .pj-thumb.active .pj-thumb-bar {
          transform: scaleX(1);
        }

        .pj-thumb-num {
          position: absolute;
          top: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.1em;
          transition: opacity 0.3s;
        }

        .pj-thumb.active .pj-thumb-num {
          opacity: 0;
        }

        .pj-thumb-label {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 6px;
          transition: opacity 0.3s;
        }

        .pj-thumb.active .pj-thumb-label {
          opacity: 0;
        }

        @media (max-width: 768px) {
          .pj-header { padding: 24px 24px 0; }
          .pj-content { left: 24px; right: 24px; bottom: 36px; }
          .pj-slide-year, .pj-slide-num { right: 24px; }
          .pj-nav { right: 10px; }
          .pj-header-counter { font-size: 32px; }
        }
      `}</style>

      <div id="projects" className="pj-root">
        {/* Featured header */}
        <div className="pj-header">
          <div className="pj-header-left">
            <span className="pj-feat-label">Portfolio</span>
            <h2 className="pj-feat-title">
              Featured <em>Projects</em>
            </h2>
          </div>
          <div className="pj-header-right">
            <div className="pj-header-divider" />
            <div className="pj-header-counter">
              {pad(cur)} / {pad(defaultProjects.length - 1)}
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="pj-stage">
          {/* Leaving slide */}
          {prev !== null && (
            <div className="pj-slide leaving" key={`prev-${prev}`}>
              <div
                className="pj-slide-bg"
                style={{ backgroundImage: `url('${defaultProjects[prev].img}')` }}
              />
              <div className="pj-grad-left" />
              <div className="pj-grad-bottom" />
              <div
                className="pj-accent-bar"
                style={{ background: defaultProjects[prev].color }}
              />
              <div className="pj-content">
                <p className="pj-s-cat" style={{ color: defaultProjects[prev].color }}>
                  {defaultProjects[prev].cat}
                </p>
                <h3 className="pj-s-title">{defaultProjects[prev].title}</h3>
              </div>
            </div>
          )}

          {/* Entering slide */}
          <div className="pj-slide entering" key={`cur-${cur}`}>
            <div
              className="pj-slide-bg"
              style={{ backgroundImage: `url('${p.img}')` }}
            />
            <div className="pj-grad-left" />
            <div className="pj-grad-bottom" />
            <div className="pj-accent-bar" style={{ background: p.color }} />
            <div className="pj-slide-year">{p.year}</div>
            <div className="pj-slide-num">{pad(cur)}</div>
            <div className="pj-content">
              <p className="pj-s-cat" style={{ color: p.color }}>{p.cat}</p>
              <h3 className="pj-s-title">{p.title}</h3>
              <p className="pj-s-desc">{p.desc}</p>
              <div className="pj-s-tags">
                {p.tags.map((t, i) => (
                  <span key={i} className="pj-s-tag">{t}</span>
                ))}
              </div>
              {p.link !== "#" && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-s-btn"
                >
                  View Project
                  <span className="pj-s-btn-ic">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Nav arrows + ring */}
          <div className="pj-nav">
            <button
              className="pj-nav-btn"
              onClick={() => { handleNav("prev"); resetTimer(); }}
              aria-label="Previous"
            >
              ↑
            </button>
            <div className="pj-ring">
              <svg width="40" height="40" viewBox="0 0 44 44">
                <circle
                  cx="22" cy="22" r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="22" cy="22" r="18"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1.5"
                  strokeDasharray={CIRC}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  style={{
                    transition:
                      "stroke-dashoffset 0.6s cubic-bezier(0.77,0,0.18,1), stroke 0.5s",
                  }}
                />
              </svg>
              <div className="pj-ring-label">{pad(cur)}</div>
            </div>
            <button
              className="pj-nav-btn"
              onClick={() => { handleNav("next"); resetTimer(); }}
              aria-label="Next"
            >
              ↓
            </button>
          </div>
        </div>

        {/* Auto-progress bar */}
        <div className="pj-autobar">
          <div
            key={barKey}
            className="pj-autobar-fill running"
            style={{ background: p.color }}
          />
        </div>

        {/* Thumbnails */}
        <div className="pj-thumbs">
          {defaultProjects.map((proj, i) => (
            <div
              key={i}
              className={`pj-thumb${i === cur ? " active" : ""}`}
              onClick={() => {
                if (i !== cur) { go(i); resetTimer(); }
              }}
            >
              <div
                className="pj-thumb-img"
                style={{ backgroundImage: `url('${proj.img}')` }}
              />
              <div className="pj-thumb-dim" />
              <div className="pj-thumb-bar" style={{ background: proj.color }} />
              <div className="pj-thumb-num">{pad(i)}</div>
              <div className="pj-thumb-label">{proj.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}