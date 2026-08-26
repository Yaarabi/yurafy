"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
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
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const whatsappUrl = `https://wa.me/+212716413605?text=${encodeURIComponent(t("cta.whatsappText"))}`;

    const trustItems = {
        en: [
            { icon: Clock, label: "Fast 24h Response Time" },
            { icon: ShieldCheck, label: "100% Satisfaction Guarantee" },
            { icon: Zap, label: "Modern & High-Performance Stack" },
        ],
        fr: [
            { icon: Clock, label: "Réponse garantie sous 24h" },
            { icon: ShieldCheck, label: "100% de satisfaction garantie" },
            { icon: Zap, label: "Technologies modernes & ultra-rapides" },
        ],
        ar: [
            { icon: Clock, label: "استجابة سريعة خلال 24 ساعة" },
            { icon: ShieldCheck, label: "ضمان جودة ورضا بنسبة 100٪" },
            { icon: Zap, label: "أحدث التقنيات وأعلى أداء" },
        ],
    }[locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"];

    return (
        <section
            id="cta"
            className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: "transparent" }}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Ambient Background Spotlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#13FFAA]/15 via-[#1E67C6]/20 to-[#CE84CF]/15 blur-[120px] rounded-full pointer-events-none" />

            <div
                ref={ref}
                className="relative max-w-5xl mx-auto"
                style={{
                    opacity: 0,
                    transform: "translateY(32px)",
                    transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Main Glass Card */}
                <div className="tahoe-glass-card relative rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 overflow-hidden border border-white/15 shadow-2xl">
                    {/* Top glowing gradient border line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#13FFAA] via-[#1E67C6] to-transparent opacity-80" />

                    {/* Subtle dot matrix background */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    {/* Radial corner glows */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#1E67C6]/20 blur-[60px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#13FFAA]/15 blur-[60px] pointer-events-none" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 bg-white/5 text-[#13FFAA] shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#13FFAA] animate-pulse" />
                            {t("cta.badge")}
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.15] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                            {t("cta.title")}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-base sm:text-xl text-slate-200/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                            {t("cta.subtitle")}
                        </p>

                        {/* Interactive Buttons */}
                        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                            {/* Primary Request Button */}
                            <button
                                onClick={onRequestQuote}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-black text-slate-950 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-[0_0_35px_rgba(19,255,170,0.4)] group ring-2 ring-white/30"
                                style={{
                                    background: "linear-gradient(135deg, #13FFAA 0%, #1E67C6 100%)",
                                }}
                            >
                                <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                <span>{t("cta.button")}</span>
                                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                            </button>

                            {/* WhatsApp Direct Action Button */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-white px-7 sm:px-9 py-4 sm:py-4.5 rounded-2xl text-base transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:scale-[1.03] active:scale-[0.98] shadow-md group"
                            >
                                <FaWhatsapp className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                                <span>{t("cta.whatsapp")}</span>
                            </a>
                        </div>

                        {/* Trust Pills / Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 pt-10 border-t border-white/10 w-full">
                            {trustItems.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[#13FFAA] shrink-0" />
                                        <span>{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
