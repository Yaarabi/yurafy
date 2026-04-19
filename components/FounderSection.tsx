"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote, MessageSquare } from "lucide-react";

interface FounderSectionProps {
    onRequestQuote: () => void;
}

export default function FounderSection({ onRequestQuote }: FounderSectionProps) {
    const t = useTranslations("services.founder");

    return (
        <section id="founder" className="relative py-24 overflow-hidden" style={{ background: "#020617" }}>
            {/* Background elements */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div 
                className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-y-1/2 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Image Area */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group w-full lg:w-1/2 max-w-[450px]"
                    >
                        {/* Frame effect */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#1E67C6]/20 to-[#13FFAA]/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                            {/* Placeholder for real image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#020617]/40">
                                <p className="text-white/20 text-sm font-medium uppercase tracking-widest">
                                    Founder Image Placeholder
                                </p>
                            </div>
                            
                            {/* Accent overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                            
                            {/* Info overlay */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <h3 className="text-2xl font-bold text-white mb-1">{t("name")}</h3>
                                <p className="text-[#13FFAA] text-sm font-bold tracking-wider uppercase">{t("role")}</p>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hidden sm:block"
                        >
                            <Quote className="w-8 h-8 text-[#1E67C6]" />
                        </motion.div>
                    </motion.div>

                    {/* Text Area */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
                                style={{
                                    background: "rgba(30,103,198,0.12)",
                                    color: "#1E67C6",
                                    border: "1px solid rgba(30,103,198,0.25)",
                                }}
                            >
                                {t("badge")}
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] mb-6">
                                {t("title")}
                            </h2>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-[#1E67C6] to-[#13FFAA] rounded-full mb-8" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <p className="text-lg sm:text-xl leading-relaxed text-white/60 italic font-medium">
                                "{t("bio")}"
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-6"
                        >
                            <button
                                onClick={onRequestQuote}
                                className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-[#020617] rounded-2xl font-bold hover:bg-[#13FFAA] transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-blue-500/10"
                            >
                                <MessageSquare className="w-5 h-5" />
                                {t("cta")}
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
