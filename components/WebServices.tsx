"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingBag, Layout, Globe, Smartphone, Code2, Zap, ChevronLeft, ChevronRight, Bot, Cpu, BrainCircuit } from "lucide-react";
import { useState } from "react";

interface ServiceItem {
    id: string;
    key: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    accent: string;
    glow: string;
}

// Mapped to hero palette
const services: ServiceItem[] = [
    { id: "1", key: "wordpress", icon: Globe, accent: "#1E67C6", glow: "rgba(30,103,198,0.18)" },
    { id: "2", key: "ecommerce", icon: ShoppingBag, accent: "#13FFAA", glow: "rgba(19,255,170,0.15)" },
    { id: "3", key: "uiux", icon: Layout, accent: "#CE84CF", glow: "rgba(206,132,207,0.15)" },
    { id: "4", key: "responsive", icon: Smartphone, accent: "#DD335C", glow: "rgba(221,51,92,0.15)" },
    { id: "5", key: "customWebApps", icon: Code2, accent: "#1E67C6", glow: "rgba(30,103,198,0.18)" },
    { id: "6", key: "performanceSeo", icon: Zap, accent: "#13FFAA", glow: "rgba(19,255,170,0.15)" },
    { id: "7", key: "automations", icon: Cpu, accent: "#CE84CF", glow: "rgba(206,132,207,0.15)" },
    { id: "8", key: "aiAgents", icon: Bot, accent: "#DD335C", glow: "rgba(221,51,92,0.15)" },
    { id: "9", key: "fineTuning", icon: BrainCircuit, accent: "#1E67C6", glow: "rgba(30,103,198,0.18)" },
];

function ServiceCard({ service, index, isRTL }: { service: ServiceItem; index: number; isRTL: boolean }) {
    const t = useTranslations("services");
    const Icon = service.icon;
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
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="group relative rounded-3xl p-7 flex flex-col items-center gap-5 cursor-default transition-all duration-300 text-center h-full w-full"
            style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
                background: "rgba(255,255,255,0.03)",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = service.glow;
                e.currentTarget.style.boxShadow = `0 0 32px ${service.glow}`;
                e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-7 right-7 h-px rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
            />

            {/* Icon */}
            <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: service.glow }}
            >
                <Icon className="w-5 h-5" style={{ color: service.accent }} />
            </div>

            {/* Text */}
            <div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {t(`web.items.${service.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {t(`web.items.${service.key}.description`)}
                </p>
            </div>
        </div>
    );
}

const Services: React.FC = () => {
    const t = useTranslations("services");
    const locale = useLocale();
    const isRTL = locale === "ar";

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
            // Scroll by full width as requested
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    return (
        <section
            id="services"
            className="relative py-24 overflow-hidden"
            style={{ background: "#020617" }}
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(19,255,170,0.06), transparent 70%)" }} />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(206,132,207,0.07), transparent 70%)" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                        }}
                    >
                        {t("web.title")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                        {t("web.subtitle")}
                    </h2>
                    <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {t("web.description")}
                    </p>
                </div>

                {/* Slider Container */}
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
                        {services.map((service, i) => (
                            <div
                                key={service.id}
                                className="shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-center pt-4 flex"
                            >
                                <ServiceCard service={service} index={i} isRTL={isRTL} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows - Bottom Center */}
                    <div className="flex justify-center gap-5 mt-4 z-20">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${canScrollLeft
                                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5"
                                    : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                                }`}
                            aria-label="Previous service"
                        >
                            {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${canScrollRight
                                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5"
                                    : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                                }`}
                            aria-label="Next service"
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
};

export default Services;
