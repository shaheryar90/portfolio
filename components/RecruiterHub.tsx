"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./RecruiterHub.module.css";
import gsap from "gsap";

export default function RecruiterHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const hubRef = useRef<HTMLDivElement>(null);

  const toggleHub = () => {
    setIsOpen(!isOpen);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hubRef.current &&
        !hubRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shaheryar724@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText("03102328785");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone: ", err);
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div ref={hubRef} className={styles.hubWrapper}>
      {/* Floating Action Button (Trigger) */}
      <button
        onClick={toggleHub}
        className={`${styles.triggerBtn} ${isOpen ? styles.active : ""}`}
        aria-label="Recruiter Hub"
      >
        <span className={styles.btnIcon}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={styles.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={styles.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 21l8.982-11.795m-8.982 6.691 6.691-8.364m-6.691 6.691H3.75A1.125 1.125 0 0 1 2.625 15V9.75M21.75 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H1.5"
              />
            </svg>
          )}
        </span>
        {!isOpen && <span className={styles.triggerText}>Recruiter Hub</span>}
        {!isOpen && <span className={styles.pulse}></span>}
      </button>

      {/* Floating Drawer / Card */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.headerTitle}>
            <span className={styles.statusIndicator}></span>
            <h3>Recruiter Hub ⚡</h3>
          </div>
          <p className={styles.headerSubtitle}>Fast-track your hiring process</p>
        </div>

        <div className={styles.drawerContent}>
          {/* Quick Stats Checklist */}
          <div className={styles.checklist}>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              <span><strong>5+ Years</strong> Frontend Experience</span>
            </div>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              <span><strong>MSc Computer Science</strong> (NED Univ.)</span>
            </div>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Expert in <strong>React, Next.js, &amp; JS</strong></span>
            </div>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Available for <strong>Full-time &amp; Contracts</strong></span>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Quick Action Buttons */}
          <div className={styles.actions}>
            {/* Download Resume */}
            <a
              href="/SHAHERYAR-KHAN-FRONTEND-DEVELOPER.pdf"
              download="Shaheryar_Khan_Resume.pdf"
              className={styles.actionBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.actionIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span>Download Resume PDF</span>
            </a>

            {/* Copy Email */}
            <button onClick={handleCopyEmail} className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.actionIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
              <span>{copiedEmail ? "Email Copied!" : "Copy Email Address"}</span>
            </button>

            {/* Copy WhatsApp / Call */}
            <button onClick={handleCopyPhone} className={styles.actionBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.actionIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <span>{copiedPhone ? "WhatsApp Copied!" : "Copy WhatsApp Number"}</span>
            </button>

            {/* Chat Direct on WhatsApp */}
            <a
              href="https://wa.me/923102328785"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryActionBtn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.actionIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9c0 1.93.62 3.71 1.67 5.17L3 21l4.83-1.63c1.46 1.05 3.24 1.67 5.17 1.67Z"
                />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
