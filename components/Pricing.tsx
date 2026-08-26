"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Code, ShoppingCart, Globe, Bot, Cpu } from "lucide-react";
import CurrencyModal from "@/components/CurrencyModal";

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

interface PricingProps {
    onRequestQuote?: (serviceType?: string) => void;
}

export default function Pricing({ onRequestQuote }: PricingProps = {}) {
    const t = useTranslations("services.pricing");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [currency, setCurrency] = useState<'USD' | 'MAD'>('USD');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Automatically display popup once page is fully loaded
        const timer = setTimeout(() => {
            setModalOpen(true);
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section 
            id="pricing" 
            className="relative py-24 overflow-hidden" 
            style={{ background: "transparent" }}
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
                        className="tahoe-glass-text text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
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
                        const features = (t.raw(`plans.${plan.key}.features`) as string[]) || [];
                        const badge = t.has(`plans.${plan.key}.badge`) ? t(`plans.${plan.key}.badge`) : null;

                        return (
                            <motion.div
                                key={plan.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="tahoe-glass-card group relative flex flex-col p-8 rounded-[32px] hover:-translate-y-2"
                            >
                                {/* Plan Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ background: plan.glow, color: plan.accent }}
                                    >
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    {badge && (
                                        <span 
                                            className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                            style={{ background: plan.glow, color: plan.accent }}
                                        >
                                            {badge}
                                        </span>
                                    )}
                                </div>

                                {/* Plan Title */}
                                <h3 className="text-2xl font-bold text-white mb-6">
                                    {t(`plans.${plan.key}.name`)}
                                </h3>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-xs text-white/40 uppercase tracking-wider block mb-1">
                                        {t("startFrom")}
                                    </span>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl sm:text-5xl font-black text-white">
                                            {currency === 'USD' ? `$${plan.priceUSD}` : `${plan.priceMAD} DH`}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                        * {t("priceNotice")}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8 pt-6 border-t border-white/5 flex-grow">
                                    {features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-start gap-3">
                                            <div 
                                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{ background: plan.glow, color: plan.accent }}
                                            >
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-sm text-white/80 leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => {
                                        const planName = t(`plans.${plan.key}.name`);
                                        if (onRequestQuote) {
                                            onRequestQuote(planName);
                                        }
                                    }}
                                    className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
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

            {/* Currency Choice Modal */}
            <CurrencyModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelectCurrency={(selected) => setCurrency(selected)}
                selectedCurrency={currency}
            />
        </section>
    );
}
