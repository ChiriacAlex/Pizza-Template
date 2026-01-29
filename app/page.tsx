"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import PizzaVortex from "../components/PizzaVortex";
import Navbar from "../components/Navbar";
import HeroOverlay from "../components/HeroOverlay";
import MenuHighlight from "../components/MenuHighlight";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

// Revised TextSection for the Luxury Redesign
function TextSection({
  range,
  title,
  subtitle,
  progress
}: {
  range: [number, number],
  title: string,
  subtitle: string,
  progress: any
}) {
  // Fade Logic: Fade In (start -> +5%), Sustain, Fade Out (end-5% -> end)
  const [start, end] = range;
  const duration = end - start;
  const fadeInEnd = start + duration * 0.15;
  const fadeOutStart = end - duration * 0.15;

  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, end],
    [100, -100] // Parallax
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6"
    >
      <h2 className="text-5xl md:text-9xl font-black uppercase text-white mb-6 text-center leading-[0.9] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
      <div className="bg-black/90 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 shadow-2xl">
        <p className="text-lg md:text-2xl text-gold font-serif italic tracking-wider max-w-xl text-center drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress ONLY within the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />

      {/* --- SCROLLYTELLING SECTION (500vh) --- */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background Animation */}
          <PizzaVortex scrollYProgress={scrollYProgress} />

          {/* Global Pizza Dimmer Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

          {/* Beat A: Hero Title */}
          <HeroOverlay />

          {/* Beat B — 25–45% (Explosion) */}
          <TextSection
            range={[0.20, 0.45]}
            title="Explosion Culinaire"
            subtitle="Mozzarella di Bufala, San Marzano et pepperoni haute couture en orbite."
            progress={scrollYProgress}
          />

          {/* Beat C — 50–70% (Fermentation) */}
          <TextSection
            range={[0.50, 0.70]}
            title="Fermentation 48H"
            subtitle="Une pâte alvéolée, légère comme un nuage, résistante comme l'acier."
            progress={scrollYProgress}
          />

          {/* Beat D — 75–90% (Final Snap) */}
          <TextSection
            range={[0.75, 0.90]}
            title="Le Snap Final"
            subtitle="L'ordre renaît du chaos. Prête à être dégustée."
            progress={scrollYProgress}
          />

          {/* Scroll Indicator for Next Section */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95], [0, 1]) }}
            className="absolute bottom-10 left-0 right-0 text-center z-30 pointer-events-none"
          >
            <p className="text-gold text-xs uppercase tracking-widest">Découvrir la Collection</p>
            <div className="mx-auto mt-2 w-[1px] h-8 bg-gold" />
          </motion.div>
        </div>
      </div>

      {/* --- CONTENT SECTIONS --- */}

      <MenuHighlight />

      <section id="story" className="relative py-40 px-6 bg-[#050505] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">

          {/* Image Column - Spans 5 columns */}
          <div className="md:col-span-5 relative group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-[url('https://lirp.cdn-website.com/48f618b4/dms3rep/multi/opt/DSC02879-HDR%281%29-1920w.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-80" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Decorative Border Offset */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/30 -z-10 hidden md:block" />
          </div>

          {/* Text Column - Spans 7 columns with overlap */}
          <div className="md:col-span-7 md:-ml-12 relative z-20 bg-[#050505]/90 md:bg-transparent p-6 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
            <div className="md:pl-12">
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Notre Héritage</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[0.9]">
                L'Art de la <br />
                <span className="text-gold italic">Haute Pâte</span>
              </h2>
              <div className="w-24 h-1 bg-gold mb-8" />
              <p className="text-white/70 leading-relaxed mb-6 font-light text-lg tracking-wide">
                Né d'une obsession pour la perfection, notre atelier n'est pas une simple pizzeria. C'est un sanctuaire dédié à la fermentation lente et aux produits d'exception.
              </p>
              <p className="text-white/70 leading-relaxed mb-10 font-light text-lg tracking-wide">
                De la farine importée des moulins secrets de Naples aux tomates San Marzano gorgées de soleil, chaque ingrédient raconte une histoire. Ici, le temps s'arrête le temps d'une bouchée.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-gold">48h</span>
                  <span className="text-white/50 text-xs tracking-widest uppercase">Fermentation</span>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-gold">400°C</span>
                  <span className="text-white/50 text-xs tracking-widest uppercase">Feu de Bois</span>
                </div>
                <div className="flex-1" />
                <button className="px-8 py-3 border border-white/20 text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 uppercase tracking-widest text-sm">
                  Notre Philosophie
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <Footer />
    </main>
  );
}
