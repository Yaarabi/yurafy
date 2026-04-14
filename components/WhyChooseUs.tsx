"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, Rocket, HeartHandshake, Globe2, Clock, Star } from "lucide-react";

const icons = [ShieldCheck, Rocket, HeartHandshake, Globe2, Clock, Star];

// Hero palette: #020617 (dark), accents: #13FFAA, #1E67C6, #CE84CF, #DD335C
const accentColors = [
    { color: "#1E67C6", bg: "rgba(30,103,198,0.12)", border: "rgba(30,103,198,0.25)" },
    { color: "#13FFAA", bg: "rgba(19,255,170,0.10)", border: "rgba(19,255,170,0.22)" },
    { color: "#CE84CF", bg: "rgba(206,132,207,0.10)", border: "rgba(206,132,207,0.22)" },
    { color: "#DD335C", bg: "rgba(221,51,92,0.10)",  border: "rgba(221,51,92,0.22)"  },
    { color: "#1E67C6", bg: "rgba(30,103,198,0.12)", border: "rgba(30,103,198,0.25)" },
    { color: "#13FFAA", bg: "rgba(19,255,170,0.10)", border: "rgba(19,255,170,0.22)" },
];

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
            className={`group flex gap-4 p-5 rounded-2xl cursor-default ${isRTL ? "flex-row-reverse text-right" : ""}`}
            style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.background = bg;
                e.currentTarget.style.boxShadow = `0 0 20px ${bg}`;
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
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
    { titleKey: "items.global.title",  descKey: "items.global.description"  },
    { titleKey: "items.ontime.title",  descKey: "items.ontime.description"  },
    { titleKey: "items.trusted.title", descKey: "items.trusted.description" },
];

const stats = [
    { value: "50+", labelKey: "stats.projects",     color: "#13FFAA" },
    { value: "3",   labelKey: "stats.languages",    color: "#1E67C6" },
    { value: "98%", labelKey: "stats.satisfaction", color: "#CE84CF" },
    { value: "24h", labelKey: "stats.response",     color: "#DD335C" },
];

export default function WhyChooseUs() {
    const t = useTranslations("services.whyChooseUs");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const statsRef = useRef<HTMLDivElement>(null);

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
                <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(19,255,170,0.1)",
                            color: "#13FFAA",
                            border: "1px solid rgba(19,255,170,0.25)",
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
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 p-6 rounded-3xl"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            data-stat
                            className={`text-center ${isRTL ? "rtl" : ""}`}
                            style={{
                                opacity: 0,
                                transform: "translateY(16px)",
                                transition: "opacity 0.4s ease, transform 0.4s ease",
                            }}
                        >
                            <p className="text-3xl font-extrabold" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                            <p className="text-xs text-white/40 mt-1 font-medium">{t(stat.labelKey)}</p>
                        </div>
                    ))}
                </div>

                {/* Reasons grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <ReasonCard
                            key={i}
                            index={i}
                            titleKey={reason.titleKey}
                            descKey={reason.descKey}
                            isRTL={isRTL}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
