import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import RecruiterHub from "@/components/RecruiterHub";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Footer />
      <RecruiterHub />
      <div id="overlay"></div>
    </main>
  );
}

