import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LiveApps from "@/components/LiveApps";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import InteractiveZone from "@/components/InteractiveZone";
import Contact from "@/components/Contact";
import InteractiveEffects from "@/components/InteractiveEffects";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Terminal />
        <Experience />
        <Projects />
        <LiveApps />
        <Skills />
        <Certifications />
        <Testimonials />
        <InteractiveZone />
        <Contact />
      </main>
      <InteractiveEffects />
    </>
  );
}
