"use client";

import { useTranslations } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ServicesFAQ({ locale }: { locale: string }) {
    const t = useTranslations('services');
    const isRTL = locale === 'ar';
    const [openIndex, setOpenIndex] = useState<number | null>(null);
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

    const faqs = [
        { q: t('faq.items.q1.q'), a: t('faq.items.q1.a') },
        { q: t('faq.items.q2.q'), a: t('faq.items.q2.a') },
        { q: t('faq.items.q3.q'), a: t('faq.items.q3.a') },
        { q: t('faq.items.q4.q'), a: t('faq.items.q4.a') },
    ];

    return (
        <section
            id="faq"
            className="relative py-24 overflow-hidden"
            style={{ background: "#020617" }}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(30,103,198,0.12), transparent 70%)" }} />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div
                    ref={headerRef}
                    className="text-center mb-12"
                    style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="w-7 h-7" style={{ color: "#1E67C6" }} />
                        <span
                            className="text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full"
                            style={{
                                background: "rgba(30,103,198,0.12)",
                                color: "#1E67C6",
                            }}
                        >
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" role="heading" aria-level={2}>
                        {t('faq.title')}
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden transition-all duration-300"
                                style={{
                                    background: isOpen ? "rgba(30,103,198,0.08)" : "rgba(255,255,255,0.04)",
                                }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <h3 className="text-sm font-semibold text-white leading-snug">{faq.q}</h3>
                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        style={{ color: "#1E67C6" }}
                                    />
                                </button>
                                <div
                                    style={{
                                        maxHeight: isOpen ? "400px" : "0",
                                        overflow: "hidden",
                                        transition: "max-height 0.35s ease",
                                    }}
                                >
                                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
