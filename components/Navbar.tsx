"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, "#hero")}>
          SK<span className={styles.logoDot}>.</span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.navCta}
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Hire Me
            </a>
          </li>

          {/* Theme toggle button
          <button
            className={styles.themeToggle}
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {currentTheme === "dark" ? "☀️" : "🌙"}
          </button> */}

        </ul>

        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={menuOpen ? styles.barOpen : ""}></span>
          <span className={menuOpen ? styles.barOpen : ""}></span>
          <span className={menuOpen ? styles.barOpen : ""}></span>
        </button>
      </div>
    </nav>
  );
}