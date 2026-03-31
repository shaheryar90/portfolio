"use client";
import { useEffect, useRef } from "react";
import styles from "./About.module.css";

const skills = [
  { name: "React JS", level: 95 },
  { name: "Next JS", level: 90 },
  { name: "TypeScript", level: 88 },
  { name: "JavaScript", level: 95 },
  { name: "HTML5 & CSS3", level: 98 },
  { name: "Node JS / Express", level: 75 },
  { name: "Git & GitHub", level: 85 },
  { name: "React Native", level: 70 },
];

export default function About() {
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
      { threshold: 0.15 }
    );

    const section = sectionRef.current;
    if (section) {
      const animItems = section.querySelectorAll(`.${styles.animItem}`);
      animItems.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.aboutGrid}`}>
          {/* Left: About text */}
          <div className={`${styles.aboutText} ${styles.animItem}`}>
            <h2 className={styles.sectionLabel}>About Me</h2>
            <h3 className={styles.sectionTitle}>
              Passionate about building{" "}
              <span className="gradient-text">exceptional</span> web
              experiences
            </h3>
            <p className={styles.desc}>
              I am an innovative JavaScript Developer with 4+ years of
              experience in building and maintaining responsive websites in the
              IT industry. Proficient in HTML, CSS, JavaScript and TypeScript,
              plus modern libraries and frameworks including React, Next.js, and
              Node.js.
            </p>
            <p className={styles.desc}>
              I hold a <strong>Master of Science in Computer Science</strong>{" "}
              from <strong>NED University</strong> (2023) and a Bachelor of
              Engineering in Electrical &amp; Computer from NED (2018).
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>4+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>MSc</span>
                <span className={styles.statLabel}>NED University</span>
              </div>
            </div>
          </div>

          {/* Right: Skills */}
          <div id="skills" className={`${styles.skillsPanel} ${styles.animItem}`}>
            <h3 className={styles.skillsTitle}>Skills &amp; Expertise</h3>
            <div className={styles.skillsList}>
              {skills.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBarBg}>
                    <div
                      className={styles.skillBarFill}
                      style={{ "--fill-width": `${skill.level}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
