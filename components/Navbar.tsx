"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-gradient-to-b from-black/80 to-transparent pb-12"
                }`}
        >
            {/* Brand */}
            <div className="text-3xl font-serif font-bold tracking-[0.2em] text-white">
                ANATOMIE<span className="text-gold">.</span>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex space-x-16 text-xs font-medium tracking-[0.3em] text-white/70 uppercase">
                <a href="#menu" className="hover:text-white transition-colors duration-300">La Carte</a>
                <a href="#story" className="hover:text-white transition-colors duration-300">L'Histoire</a>
                <a href="#locations" className="hover:text-white transition-colors duration-300">Lieux</a>
            </div>

            {/* Right CTA */}
            <div className="flex items-center space-x-8">
                <button className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors">
                    Login
                </button>
                <button className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-colors duration-500">
                    Réserver
                </button>
            </div>
        </motion.nav>
    );
}
