"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Code, ShoppingCart, Globe, Bot, Cpu } from "lucide-react";

interface PricingPlan {
    key: string;
    icon: any;
    accent: string;
    glow: string;
    isFeatured?: boolean;
    priceUSD: string;
    priceMAD: string;
}

const plans: PricingPlan[] = [
    { key: "youcan",      icon: ShoppingCart, accent: "#13FFAA", glow: "rgba(19,255,170,0.15)", priceUSD: "20", priceMAD: "199" },
    { key: "shopify",     icon: ShoppingCart, accent: "#1E67C6", glow: "rgba(30,103,198,0.18)", isFeatured: true, priceUSD: "80", priceMAD: "500" },
    { key: "woocommerce", icon: Globe,        accent: "#CE84CF", glow: "rgba(206,132,207,0.15)", priceUSD: "120", priceMAD: "900" },
    { key: "simple",      icon: Code,         accent: "#13FFAA", glow: "rgba(19,255,170,0.15)", priceUSD: "170", priceMAD: "1000" },
    { key: "pro",         icon: Sparkles,     accent: "#1E67C6", glow: "rgba(30,103,198,0.18)", priceUSD: "350", priceMAD: "2000" },
    { key: "automation",  icon: Cpu,          accent: "#CE84CF", glow: "rgba(206,132,207,0.15)", priceUSD: "100", priceMAD: "1000" },
    { key: "aiAgent",     icon: Bot,          accent: "#DD335C", glow: "rgba(221,51,92,0.15)", priceUSD: "200", priceMAD: "2000" },
];

export default function Pricing() {
    const t = useTranslations("services.pricing");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [currency, setCurrency] = useState<'USD' | 'MAD'>('USD');

    return (
        <section 
            id="pricing" 
            className="relative py-24 overflow-hidden" 
            style={{ background: "#020617" }}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Background Decorations */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                        }}
                    >
                        {t("badge")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg max-w-2xl mx-auto text-white/50"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* Currency Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
                        <button 
                            onClick={() => setCurrency("USD")}
                            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors ${currency === 'USD' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                        >
                            {currency === 'USD' && (
                                <motion.div layoutId="currency-bg" className="absolute inset-0 bg-[#1E67C6] rounded-full z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10">USD ($)</span>
                        </button>
                        <button 
                            onClick={() => setCurrency("MAD")}
                            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors ${currency === 'MAD' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                        >
                            {currency === 'MAD' && (
                                <motion.div layoutId="currency-bg" className="absolute inset-0 bg-[#1E67C6] rounded-full z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span className="relative z-10">MAD (DH)</span>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {plans.map((plan, i) => {
                        const Icon = plan.icon;
                        const features = t.raw(`plans.${plan.key}.features`) as string[];
                        const badge = t.has(`plans.${plan.key}.badge`) ? t(`plans.${plan.key}.badge`) : null;

                        return (
                            <motion.div
                                key={plan.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex flex-col p-8 rounded-[32px] transition-all duration-500 hover:-translate-y-2"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.boxShadow = `0 20px 40px -15px ${plan.glow}`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {/* Plan Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ background: plan.glow }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: plan.accent }} />
                                    </div>
                                    {badge && (
                                        <span 
                                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                            style={{ background: plan.accent, color: "#020617" }}
                                        >
                                            {badge}
                                        </span>
                                    )}
                                </div>

                                <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}>{t(`plans.${plan.key}.name`)}</h3>
                                
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-white/40 text-sm">{t("startFrom")}</span>
                                    <span className="text-4xl font-black text-white px-2">
                                        {currency === 'USD' ? plan.priceUSD : plan.priceMAD}
                                    </span>
                                    <span className="text-white/40 text-sm font-bold uppercase tracking-tighter">
                                        {currency === 'USD' ? '$' : 'DH'}
                                    </span>
                                </div>
                                <div className={`text-xs text-white/40 mb-8 italic ${isRTL ? "text-right" : "text-left"}`}>
                                    {t("priceNotice")}
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-10 flex-grow">
                                    {features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <span className="text-sm text-white/70 leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    style={{ 
                                        background: plan.isFeatured ? plan.accent : "rgba(255,255,255,0.05)",
                                        color: plan.isFeatured ? "#020617" : "white",
                                    }}
                                    onMouseEnter={e => {
                                        if (!plan.isFeatured) {
                                            e.currentTarget.style.background = "white";
                                            e.currentTarget.style.color = "#020617";
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!plan.isFeatured) {
                                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                            e.currentTarget.style.color = "white";
                                        }
                                    }}
                                >
                                    {t("cta")}
                                    <Zap className={`w-4 h-4 transition-transform duration-300 group-hover/btn:scale-125 ${isRTL ? "order-first" : ""}`} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
