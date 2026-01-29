"use client";
import React from "react";
import { motion } from "framer-motion";

const PIZZAS = [
    {
        id: 1,
        name: "La Margherita D'Oro",
        desc: "Tomates San Marzano, Mozzarella di Bufala, Basilic Cristal, Or Comestible 24k.",
        price: "24€",
        image: "https://askproject.net/pizzra/wp-content/uploads/sites/244/2025/08/Pizza-margherita-1.png",
        // Hero card - spans 2 columns and 2 rows
        gridArea: "1 / 1 / 3 / 3", // row-start / col-start / row-end / col-end
        size: "large"
    },
    {
        id: 2,
        name: "Truffle Noire",
        desc: "Crème de Truffe, Champignons Sauvages, Huile de Truffe Blanche.",
        price: "32€",
        image: "https://askproject.net/pizzra/wp-content/uploads/sites/244/2025/08/Tandori-pizza-1.png",
        gridArea: "1 / 3 / 2 / 4",
        size: "small"
    },
    {
        id: 3,
        name: "Diavola Couture",
        desc: "Spianata Piccante, Miel Pimenté, Stracciatella Fumée.",
        price: "28€",
        image: "https://askproject.net/pizzra/wp-content/uploads/sites/244/2025/08/Sicilian-pizza-1.png",
        gridArea: "2 / 3 / 3 / 4",
        size: "small"
    },
    {
        id: 4,
        name: "Burrata & Figues",
        desc: "Base Blanche, Jambon de Parme 24 mois, Figues Rôties.",
        price: "30€",
        image: "https://askproject.net/pizzra/wp-content/uploads/sites/244/2025/08/Pizza-Garlic-1.png",
        gridArea: "3 / 1 / 4 / 2",
        size: "small"
    },
    {
        id: 5,
        name: "Quattro Formaggi",
        desc: "Gorgonzola, Taleggio, Parmigiano 36 mois, Mozzarella.",
        price: "26€",
        image: "https://askproject.net/pizzra/wp-content/uploads/sites/244/2025/08/Pizza-Calzone-1.png",
        gridArea: "3 / 2 / 4 / 4",
        size: "medium"
    },
];

export default function MenuHighlight() {
    return (
        <section id="menu" className="relative z-10 bg-[#050505] py-32 px-6 overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-xs font-bold tracking-[0.5em] text-gold uppercase mb-6">La Collection</h2>
                    <h3 className="text-6xl md:text-8xl font-serif text-white italic">Signature</h3>
                </motion.div>

                {/* Bento Grid - Clean 3 column layout */}
                <div
                    className="grid gap-5"
                    style={{
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(3, minmax(280px, auto))',
                    }}
                >
                    {PIZZAS.map((pizza, index) => (
                        <motion.div
                            key={pizza.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            style={{ gridArea: pizza.gridArea }}
                            className={`
                                group relative overflow-hidden rounded-2xl
                                bg-[#0d0d0d] border border-white/5
                                hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10
                                transition-all duration-500
                                ${pizza.size === 'large' ? 'min-h-[580px]' : pizza.size === 'medium' ? 'min-h-[280px]' : 'min-h-[280px]'}
                            `}
                        >
                            {/* Image Background */}
                            <div
                                className={`
                                    absolute inset-0 bg-no-repeat transition-all duration-700 
                                    group-hover:scale-105 opacity-90 group-hover:opacity-100
                                    bg-cover bg-center
                                `}
                                style={{ backgroundImage: `url(${pizza.image})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content */}
                            <div className={`
                                absolute inset-x-0 bottom-0 flex flex-col justify-end
                                ${pizza.size === 'large' ? 'p-10' : 'p-6'}
                            `}>
                                {/* Price Tag */}
                                <span className={`
                                    absolute top-6 right-6 bg-gold text-black font-bold rounded-full
                                    ${pizza.size === 'large' ? 'px-5 py-2 text-lg' : 'px-4 py-1.5 text-sm'}
                                `}>
                                    {pizza.price}
                                </span>

                                <h4 className={`
                                    font-serif text-white italic leading-tight mb-2
                                    ${pizza.size === 'large' ? 'text-4xl' : 'text-xl'}
                                `}>
                                    {pizza.name}
                                </h4>

                                <p className={`
                                    text-white/60 font-sans leading-relaxed
                                    ${pizza.size === 'large' ? 'text-base max-w-md' : 'text-sm line-clamp-2'}
                                `}>
                                    {pizza.desc}
                                </p>

                                {/* CTA on hover */}
                                <div className="mt-4 flex items-center space-x-2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
                                    <span className="text-xs font-bold uppercase tracking-widest">Commander</span>
                                    <span className="text-sm">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Fallback - Stack for mobile */}
                <style jsx>{`
                    @media (max-width: 768px) {
                        .grid {
                            grid-template-columns: 1fr !important;
                            grid-template-rows: auto !important;
                        }
                        .grid > * {
                            grid-area: auto !important;
                            min-height: 320px !important;
                        }
                    }
                `}</style>

                <div className="mt-24 text-center">
                    <button className="relative px-16 py-5 text-white font-bold uppercase tracking-[0.2em] text-xs hover:text-black transition-colors duration-500 overflow-hidden group border border-white/20">
                        <span className="relative z-10">Voir tout le menu</span>
                        <div className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}
