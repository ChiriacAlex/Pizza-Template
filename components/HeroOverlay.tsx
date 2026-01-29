"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroOverlay() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    return (
        <motion.div
            style={{ opacity, scale, y }}
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        >
            <h1 className="text-6xl md:text-9xl font-serif font-black text-white text-center tracking-tighter leading-none">
                L'ANATOMIE
                <br />
                <span className="text-gold italic font-light">D'une Slice</span>
            </h1>
            <p className="mt-8 text-sm md:text-base text-white/60 tracking-[0.2em] uppercase font-sans">
                Défiler pour Découvrir
            </p>
            <div className="mt-4 w-[1px] h-16 bg-white/20 animate-pulse" />
        </motion.div>
    );
}
