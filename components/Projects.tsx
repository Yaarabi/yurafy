"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

interface Project {
    _id: string;
    name: string;
    link: string;
    img: string;
}

export default function Projects({ locale, initialProjects }: { locale: string; initialProjects?: Project[] }) {
    const t = useTranslations("services");
    const isRTL = locale === "ar";
    const [projects, setProjects] = useState<Project[]>(initialProjects || []);
    const [loading, setLoading] = useState(!initialProjects);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    obs.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (initialProjects && initialProjects.length > 0) return;
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const res = await fetch("https://yurafy.com/api/projects", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to load projects");
                const data = await res.json();
                if (!cancelled) setProjects(data.projects || []);
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [initialProjects]);

    // Hero accent colors and their rgba equivalents for box-shadow
    const accentColors = [
        { hex: "#1E67C6", rgba: "rgba(30,103,198,0.18)"  },
        { hex: "#13FFAA", rgba: "rgba(19,255,170,0.15)"  },
        { hex: "#CE84CF", rgba: "rgba(206,132,207,0.15)" },
        { hex: "#DD335C", rgba: "rgba(221,51,92,0.15)"   },
        { hex: "#1E67C6", rgba: "rgba(30,103,198,0.18)"  },
        { hex: "#13FFAA", rgba: "rgba(19,255,170,0.15)"  },
    ];

    if (loading) {
        return (
            <section
                className="relative py-24 overflow-hidden"
                style={{ background: "#020617" }}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">{t("projectsTitle")}</h2>
                    <div className="flex justify-center gap-2 mt-8">
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full animate-bounce"
                                style={{ background: "#1E67C6", animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="projects"
            className="relative py-24 overflow-hidden"
            style={{ background: "#020617" }}
            dir={isRTL ? "rtl" : "ltr"}
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(30,103,198,0.07), transparent 70%)" }} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`mb-14 ${isRTL ? "text-right" : "text-center"}`}
                    style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                >
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(206,132,207,0.1)",
                            color: "#CE84CF",
                            border: "1px solid rgba(206,132,207,0.25)",
                        }}
                    >
                        {t("projectsTitle")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                        {t("projectsSubtitle")}
                    </h2>
                </div>

                {projects.length === 0 ? (
                    <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {t("projectsEmpty")}
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((p, i) => {
                            const { hex, rgba } = accentColors[i % accentColors.length];
                            return (
                                <a
                                    key={p._id}
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = hex + "80";
                                        e.currentTarget.style.boxShadow = `0 0 28px ${rgba}`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Always-on dark overlay, deepens on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/40" />
                                        {/* Top accent line on hover */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex items-center justify-between gap-3">
                                        <h4 className="text-sm font-semibold text-white truncate">
                                            {p.name}
                                        </h4>
                                        <span
                                            className="inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap transition-colors duration-300"
                                            style={{ color: "rgba(255,255,255,0.35)" }}
                                            onMouseEnter={e => (e.currentTarget.style.color = hex)}
                                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                                        >
                                            {t("projectsView")}
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
