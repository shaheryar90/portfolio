"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Terminal.module.css";

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "  Available commands:",
    "  <span class='cmd-highlight'>about</span>       — Who is Shaheryar?",
    "  <span class='cmd-highlight'>skills</span>      — Tech stack & expertise",
    "  <span class='cmd-highlight'>experience</span>  — Work history",
    "  <span class='cmd-highlight'>projects</span>    — Featured projects",
    "  <span class='cmd-highlight'>contact</span>     — Get in touch",
    "  <span class='cmd-highlight'>resume</span>      — Download CV",
    "  <span class='cmd-highlight'>clear</span>       — Clear terminal",
  ],
  about: () => [
    "  <span class='cmd-label'>Shaheryar Khan</span> — Front-End Engineer",
    "  ─────────────────────────────────────────",
    "  🎓  MSc Computer Science — NED University (2023)",
    "  💼  5+ years building pixel-perfect web apps",
    "  📍  Karachi, Pakistan",
    "  ⚡  Specialised in React, Next.js & TypeScript",
    "  🚀  Currently: Front-End Engineer @ Technyx System",
  ],
  skills: () => [
    "  <span class='cmd-label'>Technical Skills</span>",
    "  ─────────────────────────────────────────",
    "  React JS       ████████████████████  95%",
    "  Next JS        ████████████████░░░░  85%",
    "  TypeScript     ███████████████░░░░░  75%",
    "  JavaScript     ████████████████████  90%",
    "  Node / Nest    ██████████████░░░░░░  70%",
    "  Django / FastAPI ████████████░░░░░░ 60%",
    "  React Native   ██████████████░░░░░░  70%",
    "  Git & GitHub   ████████████████░░░░  85%",
  ],
  experience: () => [
    "  <span class='cmd-label'>Work Experience</span>",
    "  ─────────────────────────────────────────",
    "  <span class='cmd-highlight'>01</span> Front-End Engineer @ <span class='cmd-company'>Technyx System</span>",
    "     June 2024 – Present · React, Next.js",
    "     ↳ visitabudhabi.ae, dubailearnsme.ae",
    "",
    "  <span class='cmd-highlight'>02</span> Software Engineer @ <span class='cmd-company'>Koderlabs</span>",
    "     Feb 2023 – May 2024 · React, TypeScript",
    "     ↳ API integration, Firebase, React Query",
    "",
    "  <span class='cmd-highlight'>03</span> Software Engineer @ <span class='cmd-company'>Code Avenue</span>",
    "     June 2021 – Jan 2023 · React, Next.js",
    "     ↳ Redux, Ant Design, Component Optimisation",
    "",
    "  <span class='cmd-highlight'>04</span> React-Native Intern @ <span class='cmd-company'>Mean3</span>",
    "     3 Months · Mobile Development",
  ],
  projects: () => [
    "  <span class='cmd-label'>Featured Projects</span>",
    "  ─────────────────────────────────────────",
    "  🏙  <span class='cmd-highlight'>Visit Abu Dhabi</span>     — visitabudhabi.ae",
    "  🎓  <span class='cmd-highlight'>Dubai Learns</span>        — dubailearns.ae",
    "  ♻  <span class='cmd-highlight'>Naseej</span>              — UAE textile circularity",
    "  🛒  <span class='cmd-highlight'>Coral</span>               — E-commerce platform",
    "  🧪  <span class='cmd-highlight'>Active Ozone</span>        — Industrial automation",
    "  📊  <span class='cmd-highlight'>Invoices for Business</span>— Fintech / accounting",
  ],
  contact: () => [
    "  <span class='cmd-label'>Contact Information</span>",
    "  ─────────────────────────────────────────",
    "  ✉   shaheryar724@gmail.com",
    "  💬  WhatsApp: 03102328785",
    "  🔗  linkedin.com/in/shaheryar09",
    "  💻  github.com/shaheryar90",
    "  📍  Karachi, Pakistan",
  ],
  resume: () => [
    "  Initiating download...",
    "  <span class='cmd-highlight'>✓ Resume ready:</span> SHAHERYAR-KHAN-FRONTEND-DEVELOPER.pdf",
    "  Opening download link...",
  ],
};

const WELCOME = [
  "  ┌─────────────────────────────────────────────┐",
  "  │  Shaheryar Khan — Interactive Portfolio CLI  │",
  "  └─────────────────────────────────────────────┘",
  "  Type <span class='cmd-highlight'>help</span> to see available commands.",
  "",
];

interface Line {
  id: number;
  type: "output" | "input" | "error";
  html: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(() =>
    WELCOME.map((l, i) => ({ id: i, type: "output", html: l }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(WELCOME.length);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const inputLine: Line = {
      id: idCounter.current++,
      type: "input",
      html: `shaheryar@portfolio:~$ ${input}`,
    };

    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);
    setInput("");

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[cmd];
    const outputLines: Line[] = handler
      ? handler().map((l) => ({
          id: idCounter.current++,
          type: "output" as const,
          html: l,
        }))
      : [
          {
            id: idCounter.current++,
            type: "error" as const,
            html: `  Command not found: <span class='cmd-err'>${cmd}</span>. Type <span class='cmd-highlight'>help</span> for options.`,
          },
        ];

    addLines([inputLine, ...outputLines, { id: idCounter.current++, type: "output", html: "" }]);

    // Trigger resume download
    if (cmd === "resume") {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "/SHAHERYAR-KHAN-FRONTEND-DEVELOPER.pdf";
        a.download = "Shaheryar_Khan_Resume.pdf";
        a.click();
      }, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? "" : history[newIdx] ?? "");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.sectionLabel}>Interactive</p>
          <h2 className={styles.sectionTitle}>
            Developer <span className="gradient-text">Terminal</span>
          </h2>
          <p className={styles.sectionDesc}>
            Type commands below to explore my profile — just like a real CLI.
          </p>
        </div>

        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
          {/* Window chrome */}
          <div className={styles.titleBar}>
            <div className={styles.trafficLights}>
              <span className={`${styles.dot} ${styles.red}`}></span>
              <span className={`${styles.dot} ${styles.yellow}`}></span>
              <span className={`${styles.dot} ${styles.green}`}></span>
            </div>
            <span className={styles.titleText}>shaheryar@portfolio: ~</span>
            <div className={styles.titleRight}></div>
          </div>

          {/* Output area */}
          <div className={styles.body}>
            {lines.map((line) => (
              <div
                key={line.id}
                className={`${styles.line} ${
                  line.type === "input"
                    ? styles.inputLine
                    : line.type === "error"
                    ? styles.errorLine
                    : ""
                }`}
                dangerouslySetInnerHTML={{ __html: line.html || "&nbsp;" }}
              />
            ))}

            {/* Live input row */}
            <form className={styles.inputRow} onSubmit={handleSubmit}>
              <span className={styles.prompt}>shaheryar@portfolio:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className={styles.blink}>▋</span>
            </form>
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Quick command pills */}
        <div className={styles.quickCmds}>
          {Object.keys(COMMANDS).map((cmd) => (
            <button
              key={cmd}
              className={styles.pill}
              onClick={() => {
                setInput(cmd);
                setTimeout(() => handleSubmit(), 50);
                inputRef.current?.focus();
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
