"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h2 className={styles.title}>Let's <span className="gradient-text">Connect</span></h2>
            <p className={styles.desc}>
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.icon}>✉</span>
                <a href="mailto:shaheryar724@gmail.com" className={styles.link}>shaheryar724@gmail.com</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                <a href="tel:+923343898443" className={styles.link}>+92-3343898443</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📍</span>
                <span className={styles.text}>NED University Alumni - Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          <div className={styles.socials}>
            <h3 className={styles.socialTitle}>Social Links</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/shaheryar09/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                LinkedIn <span>↗</span>
              </a>
              <a href="https://github.com/shaheryar90" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                GitHub <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Shaheryar Khan. All rights reserved.
          </p>
          <div className={styles.footerBranding}>
            Built with <span className={styles.heart}>❤</span> using Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}
