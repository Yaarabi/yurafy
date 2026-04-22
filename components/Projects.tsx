"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, ChevronLeft, ChevronRight, LayoutPanelTop } from "lucide-react";
import { getProjects } from "@/app/actions/projects";
import { motion } from "framer-motion";
import Link from "next/link";

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
    }, [projects]);

    useEffect(() => {
        if (initialProjects && initialProjects.length > 0) return;
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await getProjects();
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

    // Show only 4 projects
    const displayedProjects = projects.slice(0, 4);

    const accentColors = [
        { hex: "#1E67C6", rgba: "rgba(30,103,198,0.18)"  },
        { hex: "#13FFAA", rgba: "rgba(19,255,170,0.15)"  },
        { hex: "#CE84CF", rgba: "rgba(206,132,207,0.15)" },
        { hex: "#DD335C", rgba: "rgba(221,51,92,0.15)"   },
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`mb-14 ${isRTL ? "text-right" : "text-center"}`}
                >
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                            border: "1px solid rgba(30,103,198,0.25)",
                        }}
                    >
                        {t("projectsTitle")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                        {t("projectsSubtitle")}
                    </h2>
                </motion.div>

                {displayedProjects.length === 0 ? (
                    <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {t("projectsEmpty")}
                    </p>
                ) : (
                    <div className="relative group/slider px-2">
                        {/* Slider */}
                        <div
                            ref={scrollRef}
                            onScroll={checkScroll}
                            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {displayedProjects.map((p, i) => {
                                const { hex, rgba } = accentColors[i % accentColors.length];
                                return (
                                    <div 
                                        key={p._id} 
                                        className="shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-center pt-2 flex"
                                    >
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full flex flex-col"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.07)",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = hex + "50";
                                                e.currentTarget.style.boxShadow = `0 0 32px ${rgba}`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            {/* Image container */}
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={p.img}
                                                    alt={p.name}
                                                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/40" />
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex items-center justify-between gap-4 mt-auto">
                                                <h4 className="text-base font-bold text-white truncate">
                                                    {p.name}
                                                </h4>
                                                <span
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap transition-colors duration-300"
                                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = hex)}
                                                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                                                >
                                                    {t("projectsView")}
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation and View More */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
                            {/* Arrows */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => scroll("left")}
                                    disabled={!canScrollLeft}
                                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                        canScrollLeft 
                                        ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5" 
                                        : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                                    }`}
                                >
                                    {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => scroll("right")}
                                    disabled={!canScrollRight}
                                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                        canScrollRight 
                                        ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg shadow-white/5" 
                                        : "border-white/5 bg-transparent text-white/20 cursor-not-allowed"
                                    }`}
                                >
                                    {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* View More Button */}
                            <Link 
                                href={`/${locale}/projects`}
                                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white hover:bg-white hover:text-[#020617] transition-all duration-300 shadow-xl shadow-blue-500/5 active:scale-95"
                            >
                                <LayoutPanelTop className="w-4 h-4" />
                                <span>{t("projectsViewMore")}</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
