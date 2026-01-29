"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REVIEWS = [
    {
        id: 1,
        text: "Vittorio Assaf et Fabio Granato se sont retrouvés perdus en mer. Échoués, ils rêvaient de la pizza parfaite. Ils ont promis d'ouvrir un restaurant servant la meilleure pizza italienne au monde. Ils ont tenu leur promesse.",
        author: "Légende Serafina",
        role: "L'Origine",
        stars: 5,
    },
    {
        id: 2,
        text: "Tout simplement, l'un des restaurants préférés au monde. Une combinaison unique d'un cadre décontracté-chic, d'un service charmant et d'une touche créative sur la cuisine italienne traditionnelle.",
        author: "Guide Michelin",
        role: "Critique",
        stars: 5,
    },
    {
        id: 3,
        text: "Nous sélectionnons et goûtons chaque ingrédient à la main et garantissons l'origine des produits. 100% ingrédients italiens, toujours.",
        author: "Vittorio Assaf",
        role: "Fondateur",
        stars: 5,
    }
];

export default function Testimonials() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });

    return (
        <section className="bg-[#050505] py-32 px-6 border-t border-white/5 relative overflow-hidden">
            {/* Background Decorative Quote */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none">
                <h2 className="text-[20vw] font-serif font-black text-white whitespace-nowrap">BIENVENUE</h2>
            </div>

            <div className="max-w-7xl mx-auto" ref={containerRef}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {REVIEWS.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="relative p-8 border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <div className="text-gold mb-6 text-2xl">★★★★★</div>
                            <p className="text-white/80 font-serif italic text-lg leading-relaxed mb-8">
                                "{review.text}"
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">{review.author}</h4>
                                    <span className="text-white/40 text-xs">{review.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
