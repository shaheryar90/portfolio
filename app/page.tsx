import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import RecruiterHub from "@/components/RecruiterHub";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Terminal />
      <Footer />
      <RecruiterHub />
      <div id="overlay"></div>
    </main>
  );
}

