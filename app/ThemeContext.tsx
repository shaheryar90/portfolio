"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    // Load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};