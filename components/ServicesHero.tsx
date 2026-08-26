"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * TECH STACK LOGOS & DATA (Original Yurafy Stack)
 * -------------------------------------------------------------------------- */

const TECH_STACK = [
  { name: "MongoDB",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "Express.js",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
  { name: "React",        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Node.js",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "JavaScript",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "Next.js",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
  { name: "NestJS",       logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-original.svg" },
  { name: "Python",       logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "PostgreSQL",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  { name: "Supabase",     logo: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4" },
  { name: "WordPress",    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg" },
  { name: "Shopify",      logo: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "LangChain",    logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
];

/* -----------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE
 * Calibrated outward expansion ripple: extremely smooth and slightly relaxed 
 * to feel cohesive, satisfyingly responsive, and visually distinct.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    animate("appear");

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * HERO & TECH STACK COMPONENT
 * -------------------------------------------------------------------------- */

export interface ServicesHeroProps {
  locale?: string;
  requestQuote?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function ServicesHero({
  locale: propLocale,
  requestQuote,
  onPrimaryClick,
  onSecondaryClick,
}: ServicesHeroProps) {
  const currentLocale = useLocale() || propLocale || "en";
  const t = useTranslations("services");

  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  const handlePrimaryClick = onPrimaryClick || requestQuote;

  useEffect(() => {
    if (typeof document === "undefined") return;

    const palette = [
      "rgba(255, 255, 255, 0.15)",
      "rgba(255, 255, 255, 0.35)",
      "#13FFAA",
      "#1E67C6",
      "#CE84CF",
      "#38BDF8",
    ];

    setThemeColors(palette);

    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="relative w-full min-h-[100dvh] bg-transparent text-white flex flex-col justify-between md:justify-center md:gap-6 py-12 md:py-0 px-4 sm:px-6 overflow-hidden select-none isolate">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .tahoe-glass-text {
            color: transparent;
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.95) 55%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 1) 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.25);
            filter: drop-shadow(0 15px 35px rgba(0,0,0,0.5)) drop-shadow(0 5px 10px rgba(0,0,0,0.3));
            animation: shimmer 8s linear infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
        }
      `}</style>

      {/* Permanent canvas background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {themeColors.length > 0 && <PixelCanvas colors={themeColors} gap={6} speed={30} />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none opacity-80" />
      </div>

      {/* Top Container: Yurafy Logo & Header */}
      <div className="flex items-center justify-center order-1 mt-16 sm:mt-0 pointer-events-auto">
        <Link href={`/${currentLocale}`} className="flex flex-col items-center gap-2 text-center group">
          <Image
            src="/favi.png"
            alt="Yurafy logo"
            width={48}
            height={48}
            className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Yurafy</h2>
            <p className="text-xs sm:text-sm text-white/70">
              Professional Services
            </p>
          </div>
        </Link>
      </div>

      {/* Center Container: Tahoe Glass Title, Subtitle & Mobile Marquee */}
      <div className="flex flex-col items-center justify-center text-center my-auto md:my-0 order-2 px-2 max-w-5xl mx-auto w-full pointer-events-none">
        {/* Title with Tahoe Glass effect */}
        <h1 className="tahoe-glass-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-5 sm:mb-6 px-1">
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl font-light text-white/85 max-w-3xl mx-auto px-1 leading-relaxed mb-2 sm:mb-4">
          {t("hero.subtitle")}
        </p>

        {/* Mobile Vector Marquee */}
        <div className="block md:hidden w-full mt-8 pointer-events-auto">
          <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mb-4">
            {t("techStack.label")}
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex w-max gap-8 py-2 animate-marquee">
              <div className="flex gap-8 items-center">
                {TECH_STACK.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 select-none opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <Image src={tech.logo} alt={tech.name} width={20} height={20} className="object-contain" unoptimized />
                    <span className="text-xs font-semibold text-white/90 whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-8 items-center" aria-hidden="true">
                {TECH_STACK.map((tech, i) => (
                  <div key={`m-${i}`} className="flex items-center gap-2 select-none opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <Image src={tech.logo} alt={tech.name} width={20} height={20} className="object-contain" unoptimized />
                    <span className="text-xs font-semibold text-white/90 whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Container: CTA Row */}
      <div
        className={cn(
          "pointer-events-auto flex flex-row items-center justify-center gap-4 mt-6 md:mt-8 mb-4 md:mb-0 order-4 md:order-3 transition-all duration-1000 transform px-1",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: "450ms" }}
      >
        <button
          onClick={handlePrimaryClick}
          className="relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#13FFAA] to-[#1E67C6] px-6 sm:px-8 text-xs sm:text-sm font-semibold text-slate-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(19,255,170,0.2)] ring-1 ring-white/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>{t("hero.ctaPrimary")}</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        <a
          href="https://wa.me/+212716413605"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSecondaryClick}
          className="relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-white/10 to-white/5 px-6 sm:px-8 text-xs sm:text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.1)] ring-1 ring-white/15 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:bg-white/15 hover:border-[#25D366]/40 active:scale-[0.98] cursor-pointer"
        >
          <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
          <span>{t("hero.ctaSecondary")}</span>
        </a>
      </div>

      {/* Desktop-only Tech Stack Marquee */}
      <div
        className={cn(
          "hidden md:flex absolute bottom-6 left-0 right-0 w-full z-10 pointer-events-auto flex-col items-center justify-center gap-3 transition-all duration-1000 transform order-3 md:order-4",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: "600ms" }}
      >
        <span className="text-xs uppercase tracking-wider text-white/50 font-semibold select-none">
          {t("techStack.label")}
        </span>
        <div className="relative w-full max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex w-max gap-12 py-2 animate-marquee">
            <div className="flex gap-12 items-center">
              {TECH_STACK.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg select-none opacity-60 hover:opacity-100 hover:bg-white/5 transition-all duration-300"
                >
                  <Image src={tech.logo} alt={tech.name} width={24} height={24} className="object-contain opacity-80" unoptimized />
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-12 items-center" aria-hidden="true">
              {TECH_STACK.map((tech, i) => (
                <div
                  key={`d-${i}`}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg select-none opacity-60 hover:opacity-100 hover:bg-white/5 transition-all duration-300"
                >
                  <Image src={tech.logo} alt={tech.name} width={24} height={24} className="object-contain opacity-80" unoptimized />
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ServicesHero as PixelHero };