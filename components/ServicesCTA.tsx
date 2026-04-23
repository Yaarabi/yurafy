"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ServicesCTAProps {
    onRequestQuote: () => void;
}

export default function ServicesCTA({ onRequestQuote }: ServicesCTAProps) {
    const t = useTranslations("services");
    const locale = useLocale();
    const isRTL = locale === "ar";
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

    const whatsappUrl = `https://wa.me/+212716413605?text=${encodeURIComponent(t("cta.whatsappText"))}`;

    return (
        <section
            id="cta"
            className="relative py-20 px-4 overflow-hidden"
            style={{ background: "#020617" }}
        >
            {/* Ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(30,103,198,0.12), transparent 70%)" }} />

            <div
                ref={ref}
                className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
                style={{
                    opacity: 0,
                    transform: "translateY(32px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
            >
                {/* Card: dark glass with hero-blue border glow */}
                <div
                    className="relative px-8 sm:px-16 py-16 sm:py-20"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(30,103,198,0.35)",
                        borderRadius: "1.5rem",
                        boxShadow: "0 0 80px rgba(30,103,198,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Dot grid */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    {/* Glow blob top-right */}
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(30,103,198,0.18), transparent 70%)" }} />
                    {/* Glow blob bottom-left */}
                    <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(19,255,170,0.1), transparent 70%)" }} />

                    <div className="relative z-10 text-white text-center">
                        {/* Badge */}
                        <div className="mb-6 flex justify-center">
                            <span
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                                style={{
                                    background: "rgba(19,255,170,0.08)",
                                    color: "#13FFAA",
                                    border: "1px solid rgba(19,255,170,0.25)",
                                }}
                            >
                                <span className="w-2 h-2 rounded-full bg-[#13FFAA] animate-pulse" />
                                {t("cta.badge")}
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                            {t("cta.title")}
                        </h2>
                        <p
                            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                            {t("cta.subtitle")}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onRequestQuote}
                                className="group inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: "#1E67C6",
                                    color: "#fff",
                                    boxShadow: "0 0 24px rgba(30,103,198,0.4)",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(30,103,198,0.6)")}
                                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(30,103,198,0.4)")}
                            >
                                <Mail className="w-5 h-5" />
                                {t("cta.button")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    color: "rgba(255,255,255,0.85)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = "#25D366";
                                    e.currentTarget.style.color = "#25D366";
                                    e.currentTarget.style.background = "rgba(37, 211, 102, 0.1)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                }}
                            >
                                <FaWhatsapp className="w-5 h-5" style={{ color: "#25D366" }} />
                                {t("cta.whatsapp")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
