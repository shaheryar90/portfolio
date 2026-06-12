"use client";

import styles from "./Marquee.module.css";

const techItems = [
  "React JS", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Nest.js", "Django", "FastAPI", "React Native", "Redux",
  "Zustand", "React Query", "TailwindCSS", "GSAP", "Figma",
  "Git", "GitHub", "REST APIs", "GraphQL", "Firebase",
];

export default function Marquee() {
  // Duplicate items for seamless loop
  const doubled = [...techItems, ...techItems];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((tech, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.dot}></span>
            <span className={styles.text}>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
