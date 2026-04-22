"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Code, ShoppingCart, Globe, Bot, Cpu } from "lucide-react";

interface PricingPlan {
    key: string;
    icon: any;
    accent: string;
    glow: string;
    isFeatured?: boolean;
}

const plans: PricingPlan[] = [
    { key: "youcan",      icon: ShoppingCart, accent: "#13FFAA", glow: "rgba(19,255,170,0.15)" },
    { key: "shopify",     icon: ShoppingCart, accent: "#1E67C6", glow: "rgba(30,103,198,0.18)", isFeatured: true },
    { key: "woocommerce", icon: Globe,        accent: "#CE84CF", glow: "rgba(206,132,207,0.15)" },
    { key: "basic",       icon: Code,         accent: "#13FFAA", glow: "rgba(19,255,170,0.15)" },
    { key: "pro",         icon: Sparkles,     accent: "#1E67C6", glow: "rgba(30,103,198,0.18)" },
    { key: "automation",  icon: Cpu,          accent: "#CE84CF", glow: "rgba(206,132,207,0.15)" },
    { key: "aiAgent",     icon: Bot,          accent: "#DD335C", glow: "rgba(221,51,92,0.15)" },
];

export default function Pricing() {
    const t = useTranslations("services.pricing");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <section id="pricing" className="relative py-24 overflow-hidden" style={{ background: "#020617" }}>
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
                <div className={`mb-16 ${isRTL ? "text-right" : "text-center"}`}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                            border: "1px solid rgba(30,103,198,0.25)",
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
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${plan.accent}50`;
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.boxShadow = `0 20px 40px -15px ${plan.glow}`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {/* Plan Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ background: plan.glow, border: `1px solid ${plan.accent}30` }}
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

                                <h3 className="text-2xl font-bold text-white mb-2">{t(`plans.${plan.key}.name`)}</h3>
                                
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-white/40 text-sm">{t("startFrom")}</span>
                                    <span className="text-4xl font-black text-white px-2">
                                        {t(`plans.${plan.key}.price`)}
                                    </span>
                                    <span className="text-white/40 text-sm font-bold uppercase tracking-tighter">{t("currency")}</span>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-10 flex-grow">
                                    {features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <span className="text-sm text-white/60 leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    style={{ 
                                        background: plan.isFeatured ? plan.accent : "rgba(255,255,255,0.05)",
                                        color: plan.isFeatured ? "#020617" : "white",
                                        border: plan.isFeatured ? "none" : "1px solid rgba(255,255,255,0.1)"
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
                                    <Zap className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-125" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
