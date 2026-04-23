"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MessageSquare, FileSearch, Code2, Rocket, Headphones } from "lucide-react";

const stepIcons = [MessageSquare, FileSearch, Code2, Rocket, Headphones];

// Hero palette colors
const stepColors = [
    { color: "#13FFAA", bg: "rgba(19,255,170,0.12)",  ring: "rgba(19,255,170,0.3)"  },
    { color: "#1E67C6", bg: "rgba(30,103,198,0.15)",  ring: "rgba(30,103,198,0.35)" },
    { color: "#CE84CF", bg: "rgba(206,132,207,0.12)", ring: "rgba(206,132,207,0.3)" },
    { color: "#DD335C", bg: "rgba(221,51,92,0.12)",   ring: "rgba(221,51,92,0.3)"   },
    { color: "#13FFAA", bg: "rgba(19,255,170,0.12)",  ring: "rgba(19,255,170,0.3)"  },
];

function StepCard({
    index,
    isLast,
    isRTL,
    className = "",
}: {
    index: number;
    isLast: boolean;
    isRTL: boolean;
    className?: string;
}) {
    const t = useTranslations("services.process");
    const Icon = stepIcons[index];
    const { color, bg, ring } = stepColors[index];
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
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className={`flex-1 relative flex flex-col items-center ${className}`}>
            {/* Connector line */}
            {!isLast && (
                <div
                    className={`hidden lg:block absolute top-8 w-full h-px z-0 ${isRTL ? "right-1/2" : "left-1/2"}`}
                    style={{ background: `linear-gradient(90deg, ${ring}, transparent)` }}
                />
            )}

            <div
                ref={ref}
                className="relative z-10 flex flex-col items-center text-center px-4"
                style={{
                    opacity: 0,
                    transform: "translateY(28px)",
                    transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
                }}
            >
                {/* Icon circle */}
                <div className="relative mb-5">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                            background: bg,
                            boxShadow: `0 0 20px ${ring}`,
                        }}
                    >
                        <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                        style={{ background: color, color: "#020617" }}
                    >
                        {index + 1}
                    </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug max-w-[130px]">
                    {t(`steps.step${index + 1}.title`)}
                </h3>
                <p className="text-xs leading-relaxed max-w-[140px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {t(`steps.step${index + 1}.description`)}
                </p>
            </div>
        </div>
    );
}

export default function ProcessSection() {
    const t = useTranslations("services.process");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <section
            id="process"
            className="relative py-24 overflow-hidden"
            style={{ background: "#020617" }}
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(19,255,170,0.08), transparent 70%)" }} />
            <div className="absolute top-1/2 right-0 w-72 h-72 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(221,51,92,0.08), transparent 70%)" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(30,103,198,0.15)",
                            color: "#1E67C6",
                        }}
                    >
                        {t("badge")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t("subtitle")}
                    </p>
                </div>

                {/* Steps */}
                <div className={`grid grid-cols-2 lg:flex lg:flex-row gap-y-12 gap-x-4 lg:gap-0 items-start ${isRTL ? "lg:flex-row-reverse" : ""}`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <StepCard 
                            key={i} 
                            index={i} 
                            isLast={i === 4} 
                            isRTL={isRTL} 
                            className={i === 4 ? "col-span-2" : ""}
                        />
                    ))}
                </div>

                {/* Bottom note */}
                <p className="mt-14 text-center text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {t("note")}
                </p>
            </div>
        </section>
    );
}
