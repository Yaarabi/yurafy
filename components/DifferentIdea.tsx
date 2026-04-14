"use client"

import { useTranslations, useLocale } from "next-intl"
import { useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"

type Props = {
    onRequest?: () => void
}

export default function DifferentIdea({ onRequest }: Props) {
    const t = useTranslations("services")
    const locale = useLocale()
    const isRTL = locale === "ar"
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1"
                    el.style.transform = "translateY(0)"
                    obs.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <section
            className="relative py-12 px-4 overflow-hidden"
            style={{ background: "#020617" }}
            aria-labelledby="different-idea-title"
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
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(206,132,207,0.07), transparent 70%)" }} />

            <div
                ref={ref}
                className={`relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 p-7 md:p-10 rounded-3xl transition-all duration-300 ${isRTL ? "md:flex-row-reverse text-right" : ""}`}
                style={{
                    opacity: 0,
                    transform: "translateY(24px)",
                    transition: "opacity 0.55s ease, transform 0.55s ease",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(206,132,207,0.25)",
                    boxShadow: "0 0 40px rgba(206,132,207,0.07)",
                }}
            >
                {/* Badge */}
                <div className={`flex-shrink-0 ${isRTL ? "md:order-last" : ""}`}>
                    <span
                        className="inline-flex items-center text-xs font-bold px-4 py-1.5 rounded-full"
                        style={{
                            background: "rgba(206,132,207,0.12)",
                            color: "#CE84CF",
                            border: "1px solid rgba(206,132,207,0.3)",
                        }}
                    >
                        {t("differentIdea.badge")}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        id="different-idea-title"
                        className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2"
                    >
                        {t("differentIdea.title")}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {t("differentIdea.description")}
                    </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 w-full md:w-auto">
                    <button
                        onClick={onRequest}
                        className="group w-full md:w-auto inline-flex justify-center items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300"
                        style={{
                            background: "rgba(206,132,207,0.15)",
                            color: "#CE84CF",
                            border: "1px solid rgba(206,132,207,0.35)",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(206,132,207,0.25)"
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(206,132,207,0.25)"
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(206,132,207,0.15)"
                            e.currentTarget.style.boxShadow = "none"
                        }}
                    >
                        {t("differentIdea.cta")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    )
}
