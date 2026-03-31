"use client";
import { useEffect, useRef } from "react";
import styles from "./Experience.module.css";

const experiences = [
  {
    role: "Front-End Engineer",
    company: "Technyx System",
    tech: "React Js & Next Js",
    period: "June 2024 – Present",
    description:
      "Created responsive, pixel-perfect websites on Next.js and React, ensuring optimal performance across various devices and screen sizes.",
    highlights: ["Visit Abu Dhabi (visitabudhabi.ae)", "Dubai Learns (dubailearnsme.ae)"],
    index: "01",
  },
  {
    role: "Software Engineer",
    company: "Koderlabs",
    tech: "React Js & Node Js",
    period: "Feb 2023 – May 2024",
    description:
      "Integration with external and internal APIs and Firebase. Work on bug fixing and improving application. Use of TypeScript and React Query.",
    highlights: ["API Integration", "TypeScript Migration", "React Query"],
    index: "02",
  },
  {
    role: "Software Engineer",
    company: "Code Avenue",
    tech: "React Js & Next Js",
    period: "June 2021 – Jan 2023",
    description:
      "Use of Ant Design, React Hook and Redux. Optimizing components for maximum performance across a vast array of web-capable devices and browsers.",
    highlights: ["Component Optimization", "Ant Design", "Redux"],
    index: "03",
  },
  {
    role: "React-Native Developer Intern",
    company: "Mean3",
    tech: "React Native",
    period: "3 Months",
    description:
      "Gained hands-on experience building cross-platform mobile applications using React Native during an intensive internship program.",
    highlights: ["Mobile Development", "Cross-Platform"],
    index: "04",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.12 }
    );

    const section = sectionRef.current;
    if (section) {
      const items = section.querySelectorAll(`.${styles.timelineItem}`);
      items.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      {/* Ambient background glow */}
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.container}>
        <p className={styles.sectionLabel}>Career Path</p>
        <h2 className={styles.sectionTitle}>
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div className={styles.timeline}>
          {/* Animated line with gradient fill */}
          <div className={styles.timelineLine}>
            <div className={styles.timelineLineInner} />
          </div>

          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Dot */}
              <div className={styles.timelineDot}>
                <span className={styles.dotRing} />
                <span className={styles.dotCore} />
              </div>

              {/* Card */}
              <div className={styles.card}>
                {/* Glowing border top accent */}
                <div className={styles.cardAccent} />

                <div className={styles.cardHeader}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.tech}>{exp.tech}</span>
                </div>

                <div className={styles.roleRow}>
                  <span className={styles.indexNum}>{exp.index}</span>
                  <h3 className={styles.role}>{exp.role}</h3>
                </div>

                <h4 className={styles.company}>{exp.company}</h4>
                <p className={styles.desc}>{exp.description}</p>

                <div className={styles.tags}>
                  {exp.highlights.map((h) => (
                    <span key={h} className={styles.tag}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}