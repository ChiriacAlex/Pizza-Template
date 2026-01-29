"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-serif font-bold text-white mb-6">ANATOMIE</h2>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                        L'excellence de la tradition italienne, sublimée par une vision contemporaine. Une expérience sensorielle unique.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest text-gold uppercase mb-6">Navigation</h3>
                    <ul className="space-y-4 text-sm text-white/60">
                        <li><a href="#" className="hover:text-white transition-colors">La Carte</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Réservations</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privatisation</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                    </ul>
                </div>

                {/* Info */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest text-gold uppercase mb-6">Horaires</h3>
                    <ul className="space-y-4 text-sm text-white/60">
                        <li><span className="block text-white">Lundi - Jeudi</span> 19h00 - 23h00</li>
                        <li><span className="block text-white">Vendredi - Samedi</span> 19h00 - 00h00</li>
                        <li><span className="block text-white">Dimanche</span> Fermé</li>
                    </ul>
                </div>

                {/* Social / Newsletter */}
                <div>
                    <h3 className="text-xs font-bold tracking-widest text-gold uppercase mb-6">Newsletter</h3>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                        />
                        <button className="bg-white text-black font-bold uppercase text-xs tracking-widest py-3 hover:bg-gold transition-colors duration-300">
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5 text-center text-xs text-white/20 uppercase tracking-widest">
                © 2026 Anatomie Pizza. All Rights Reserved. Designed by Antigravity.
            </div>
        </footer>
    );
}
