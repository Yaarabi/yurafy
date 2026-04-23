"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, Rocket, HeartHandshake, Globe2, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useState } from "react";

const icons = [ShieldCheck, Rocket, HeartHandshake, Clock, Star];

// Hero palette: #020617 (dark), accents: #13FFAA, #1E67C6, #CE84CF, #DD335C
const accentColors = [
    { color: "#1E67C6", bg: "rgba(30,103,198,0.12)", border: "rgba(30,103,198,0.25)" },
    { color: "#13FFAA", bg: "rgba(19,255,170,0.10)", border: "rgba(19,255,170,0.22)" },
    { color: "#CE84CF", bg: "rgba(206,132,207,0.10)", border: "rgba(206,132,207,0.22)" },
    { color: "#DD335C", bg: "rgba(221,51,92,0.10)",  border: "rgba(221,51,92,0.22)"  },
    { color: "#1E67C6", bg: "rgba(30,103,198,0.12)", border: "rgba(30,103,198,0.25)" },
    { color: "#13FFAA", bg: "rgba(19,255,170,0.10)", border: "rgba(19,255,170,0.22)" },
];
function StatCounter({ value, color }: { value: string; color: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
            animate(count, numericValue, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, value, count]);

    const suffix = value.replace(/[0-9]/g, "");

    return (
        <span ref={ref} className="text-3xl font-extrabold" style={{ color }}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

function ReasonCard({
    index,
    titleKey,
    descKey,
    isRTL,
}: {
    index: number;
    titleKey: string;
    descKey: string;
    isRTL: boolean;
}) {
    const t = useTranslations("services.whyChooseUs");
    const Icon = icons[index % icons.length];
    const { color, bg, border } = accentColors[index % accentColors.length];
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    obs.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`group flex flex-col items-center gap-4 p-6 rounded-2xl cursor-default text-center h-full w-full`}
            style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
                background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = bg;
                e.currentTarget.style.boxShadow = `0 0 20px ${bg}`;
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: bg }}
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
                <h3 className="font-bold text-white text-sm mb-1">
                    {t(titleKey)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {t(descKey)}
                </p>
            </div>
        </div>
    );
}

const reasons = [
    { titleKey: "items.quality.title", descKey: "items.quality.description" },
    { titleKey: "items.fast.title",    descKey: "items.fast.description"    },
    { titleKey: "items.support.title", descKey: "items.support.description" },
    { titleKey: "items.ontime.title",  descKey: "items.ontime.description"  },
    { titleKey: "items.trusted.title", descKey: "items.trusted.description" },
];

const stats = [
    { value: "50+", labelKey: "stats.projects",     color: "#13FFAA" },
    { value: "98%", labelKey: "stats.satisfaction", color: "#CE84CF" },
    { value: "24h", labelKey: "stats.response",     color: "#DD335C" },
];

export default function WhyChooseUs() {
    const t = useTranslations("services.whyChooseUs");
    const locale = useLocale();
    const isRTL = locale === "ar";
    
    const statsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll<HTMLElement>("[data-stat]").forEach((stat, i) => {
                        setTimeout(() => {
                            stat.style.opacity = "1";
                            stat.style.transform = "translateY(0)";
                        }, i * 100);
                    });
                    obs.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id="why-us"
            className="relative py-24 overflow-hidden"
            style={{ background: "#020617" }}
        >
            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Ambient glow blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(30,103,198,0.15), transparent 70%)" }} />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(206,132,207,0.12), transparent 70%)" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(19,255,170,0.1)",
                            color: "#13FFAA",
                        }}
                    >
                        {t("badge")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-base text-white/50 max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Stats row */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-14 p-8 rounded-3xl"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                    }}
                >
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            data-stat
                            className={`text-center ${isRTL ? "rtl" : ""} ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                            style={{
                                opacity: 0,
                                transform: "translateY(16px)",
                                transition: "opacity 0.4s ease, transform 0.4s ease",
                            }}
                        >
                            <StatCounter value={stat.value} color={stat.color} />
                            <p className="text-xs text-white/40 mt-1 font-medium">{t(stat.labelKey)}</p>
                        </div>
                    ))}
                </div>

                {/* Reasons Slider */}
                <div className="relative group/slider px-2">
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {reasons.map((reason, i) => (
                            <div 
                                key={i} 
                                className="shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-center pt-4 flex"
                            >
                                <ReasonCard
                                    index={i}
                                    titleKey={reason.titleKey}
                                    descKey={reason.descKey}
                                    isRTL={isRTL}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows - Bottom Center */}
                    <div className="flex justify-center gap-5 mt-4 z-20">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                canScrollLeft 
                                ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5" 
                                : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                            }`}
                            aria-label="Previous reason"
                        >
                            {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                canScrollRight 
                                ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5" 
                                : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                            }`}
                            aria-label="Next reason"
                        >
                            {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Custom Scrollbar CSS */}
                    <style jsx global>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
}
