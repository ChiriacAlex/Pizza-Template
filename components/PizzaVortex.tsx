"use client";

import { useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Reduced frame count - load every 2nd frame for balance (240 -> 120 frames)
const FRAME_STEP = 2;
const TOTAL_FRAMES = 240;
const FRAME_COUNT = Math.floor(TOTAL_FRAMES / FRAME_STEP); // 120 frames

export default function PizzaVortex({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress: globalScroll } = useScroll();
    const progressToUse = scrollYProgress || globalScroll;

    const smoothProgress = useSpring(progressToUse, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001,
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = () => {
            const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
            let loadedCount = 0;

            // Generate frame indices (every 4th frame)
            const frameIndices: number[] = [];
            for (let i = 0; i < TOTAL_FRAMES; i += FRAME_STEP) {
                frameIndices.push(i);
            }

            // Load all images in PARALLEL for faster loading
            frameIndices.forEach((originalIndex, arrayIndex) => {
                const img = new Image();
                const delayPart = originalIndex % 3 === 1 ? "0.034s" : "0.033s";
                const filename = `/frames/frame_${originalIndex.toString().padStart(3, "0")}_delay-${delayPart}.jpg`;
                img.src = filename;

                img.onload = () => {
                    loadedImages[arrayIndex] = img;
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

                    // Check if all images are loaded
                    if (loadedCount === FRAME_COUNT) {
                        setImages(loadedImages);
                        setIsLoading(false);
                    }
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${filename}`);
                    loadedCount++;
                    if (loadedCount === FRAME_COUNT) {
                        setImages(loadedImages.filter(Boolean));
                        setIsLoading(false);
                    }
                };
            });
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const render = () => {
            const index = Math.min(
                images.length - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            const img = images[index];

            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height);

                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                );

                const w = img.width * scale;
                const h = img.height * scale;
                const x = (canvas.width - w) / 2;
                const y = (canvas.height - h) / 2;

                context.drawImage(img, x, y, w, h);
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [images, frameIndex]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#050505] z-50 text-white">
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-6">
                        {/* Animated pizza loader */}
                        <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
                        <div
                            className="absolute inset-0 border-4 border-transparent border-t-gold rounded-full animate-spin"
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🍕</div>
                    </div>
                    <h2 className="text-xl font-light tracking-widest uppercase mb-4">Préparation</h2>
                    <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold transition-all duration-100 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-white/40 font-mono">{loadProgress}%</p>
                </div>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-contain pointer-events-none z-0 bg-[#050505]"
        />
    );
}
