"use client";

import { useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;

export default function PizzaVortex({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress for the entire page
    // Fallback to window scroll if prop is not provided
    const { scrollYProgress: globalScroll } = useScroll();
    const progressToUse = scrollYProgress || globalScroll;

    // Smooth out the scroll progress for butter-smooth animation
    const smoothProgress = useSpring(progressToUse, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001,
    });

    // Map scroll progress (0-1) to frame index (0-239)
    // We actually map to float and round it in the render loop for smoother interpolation if needed, 
    // but for image sequence, we just need the integer index.
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                // Matches: frame_000_delay-0.033s.jpg, frame_001_delay-0.034s.jpg, etc.
                const delayPart = i % 3 === 1 ? "0.034s" : "0.033s";
                const filename = `/frames/frame_${i.toString().padStart(3, "0")}_delay-${delayPart}.jpg`;
                img.src = filename;

                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve(true);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${filename}`);
                        // Resolve anyway to continue
                        resolve(true);
                    };
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // High DPI fix
        const handleResize = () => {
            // Set canvas dimensions to window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize(); // Initial size
        window.addEventListener("resize", handleResize);

        const render = () => {
            // Get current frame index from the smooth spring value
            const index = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            const img = images[index];

            if (img) {
                // Clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image "object-fit: cover" logic
                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                );

                // Optional: Scale up slightly to fill more space if needed (zoom)
                // const zoomFactor = 1.0; 
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
                    <h2 className="text-2xl font-light tracking-widest uppercase mb-4">Préparation</h2>
                    <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-100 ease-out"
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
