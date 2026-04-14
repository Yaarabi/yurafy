"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingBag, Layout, Globe, Smartphone, Code2, Zap } from "lucide-react";

interface ServiceItem {
    id: string;
    key: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    glow: string;
}

// Mapped to hero palette
const services: ServiceItem[] = [
    { id: "1", key: "wordpress",      icon: Globe,       accent: "#1E67C6", glow: "rgba(30,103,198,0.18)"   },
    { id: "2", key: "ecommerce",      icon: ShoppingBag, accent: "#13FFAA", glow: "rgba(19,255,170,0.15)"   },
    { id: "3", key: "uiux",           icon: Layout,      accent: "#CE84CF", glow: "rgba(206,132,207,0.15)"  },
    { id: "4", key: "responsive",     icon: Smartphone,  accent: "#DD335C", glow: "rgba(221,51,92,0.15)"    },
    { id: "5", key: "customWebApps",  icon: Code2,       accent: "#1E67C6", glow: "rgba(30,103,198,0.18)"   },
    { id: "6", key: "performanceSeo", icon: Zap,         accent: "#13FFAA", glow: "rgba(19,255,170,0.15)"   },
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
            className="group relative rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all duration-300"
            style={{
                opacity: 0,
                transform: "translateY(28px)",
                transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${service.accent}50`;
                e.currentTarget.style.background = service.glow;
                e.currentTarget.style.boxShadow = `0 0 32px ${service.glow}`;
                e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
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
                style={{ background: service.glow, border: `1px solid ${service.accent}40` }}
            >
                <Icon className="w-5 h-5" style={{ color: service.accent }} />
            </div>

            {/* Text */}
            <div className={isRTL ? "text-right" : "text-left"}>
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

    return (
        <section
            id="web-services"
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
                <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                            border: "1px solid rgba(30,103,198,0.28)",
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

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} isRTL={isRTL} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
