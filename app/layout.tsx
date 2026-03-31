import type { Metadata } from "next";
import "./globals.css";

import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Shaheryar Khan - Front-End Engineer",
  description:
    "High-performance portfolio of Shaheryar Khan, an experienced Front-End and JavaScript Developer with a Master's from NED University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.variable} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}