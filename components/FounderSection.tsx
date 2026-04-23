"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MessageSquare, Quote } from "lucide-react";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface FounderSectionProps {
    onRequestQuote: () => void;
}

export default function FounderSection({ onRequestQuote }: FounderSectionProps) {
    const t = useTranslations("services.founder");
    const locale = useLocale();
    const isRTL = locale === "ar";
    
    // To trigger animations when section is in view
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section 
            id="founder" 
            className="relative py-24 overflow-hidden" 
            style={{ background: "#020617" }}
            dir={isRTL ? "rtl" : "ltr"}
            ref={ref}
        >
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
            <div 
                className="absolute top-1/2 right-1/4 w-[400px] h-[400px] -translate-y-1/2 bg-[#13FFAA]/5 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span
                        className="inline-block text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(30,103,198,0.12)",
                            color: "#1E67C6",
                        }}
                    >
                        {t("sectionTitle")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                        {t("sectionSubtitle")}
                    </h2>
                </motion.div>

                <motion.div
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={{
                        initial: {},
                        animate: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-5"
                >
                    <HeaderBlock name={t("name")} role={t("role")} isRTL={isRTL} />
                    <AboutBlock title={t("title")} bio={t("bio")} badge={t("badge")} isRTL={isRTL} />
                    <IdentityBlock name={t("name")} role={t("role")} isRTL={isRTL} />
                    <SocialsBlock />
                    <CTABlock ctaText={t("cta")} isRTL={isRTL} />
                </motion.div>
            </div>
        </section>
    );
}

const Block = ({ className, children, ...rest }: any) => {
    return (
        <motion.div
            variants={{
                initial: { scale: 0.9, y: 30, opacity: 0 },
                animate: { scale: 1, y: 0, opacity: 1 },
            }}
            transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
            className={`col-span-4 rounded-[32px] overflow-hidden relative ${className}`}
            style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(12px)",
            }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

const HeaderBlock = ({ name, role, isRTL }: { name: string; role: string; isRTL: boolean }) => (
    <Block className="col-span-12 md:col-span-5 min-h-[300px] md:min-h-[350px] p-0 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1E67C6]/20 to-[#13FFAA]/20 opacity-50 transition-opacity duration-700 group-hover:opacity-100 z-10" />
        <Image 
            src="/me.webp"
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-50 z-0" />
    </Block>
);

const IdentityBlock = ({ name, role, isRTL }: { name: string; role: string; isRTL: boolean }) => (
    <Block className="col-span-12 md:col-span-5 flex flex-col items-center justify-center gap-3 p-8 group hover:bg-[rgba(255,255,255,0.04)] transition-colors order-first md:order-none">
        <div className="p-4 rounded-full bg-[rgba(30,103,198,0.1)] mb-2 group-hover:scale-110 transition-transform duration-300">
            <Quote className={`w-6 h-6 text-[#1E67C6] ${isRTL ? "scale-x-[-1]" : ""}`} />
        </div>
        <p className="text-xl font-bold text-white text-center">{name}</p>
        <p className="text-[#13FFAA] text-sm font-bold tracking-wider uppercase text-center">{role}</p>
    </Block>
);

const SocialsBlock = () => {
    const iconClass = "w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110";
    return (
        <>
            <Block className="col-span-6 md:col-span-3 flex items-center justify-center p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-[#E1306C]/10 transition-colors duration-300 group-hover:bg-[#E1306C]/20 z-0" />
                <a href="https://www.instagram.com/yurafy_off/" target="_blank" rel="noopener noreferrer" className="relative z-10 text-[#E1306C] transition-colors duration-300">
                    <FaInstagram className={iconClass} />
                </a>
            </Block>
            <Block className="col-span-6 md:col-span-3 flex items-center justify-center p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-[#1877F2]/10 transition-colors duration-300 group-hover:bg-[#1877F2]/20 z-0" />
                <a href="https://www.facebook.com/profile.php?id=61580207967842" target="_blank" rel="noopener noreferrer" className="relative z-10 text-[#1877F2] transition-colors duration-300">
                    <FaFacebook className={iconClass} />
                </a>
            </Block>
            <Block className="col-span-6 md:col-span-3 flex items-center justify-center p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-[#0A66C2]/10 transition-colors duration-300 group-hover:bg-[#0A66C2]/20 z-0" />
                <a href="https://www.linkedin.com/in/youssef-aarabi-519b55237/" target="_blank" rel="noopener noreferrer" className="relative z-10 text-[#0A66C2] transition-colors duration-300">
                    <FaLinkedin className={iconClass} />
                </a>
            </Block>
            <Block className="col-span-6 md:col-span-3 flex items-center justify-center p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-[#13FFAA]/10 transition-colors duration-300 group-hover:bg-[#13FFAA]/20 z-0" />
                <a href="https://github.com/Yaarabi" target="_blank" rel="noopener noreferrer" className="relative z-10 text-[#13FFAA] transition-colors duration-300">
                    <SiGithub className={iconClass} />
                </a>
            </Block>
        </>
    );
};

const AboutBlock = ({ title, bio, badge, isRTL }: { title: string; bio: string; badge: string; isRTL: boolean }) => (
    <Block className={`col-span-12 md:col-span-7 md:row-span-2 p-8 md:p-12 flex flex-col justify-center ${isRTL ? "text-right" : "text-left"}`}>
        <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
                style={{
                    background: "rgba(30,103,198,0.12)",
                    color: "#1E67C6",
                }}
            >
                {badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                {title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/50 italic font-medium">
                "{bio}"
            </p>
        </div>
    </Block>
);

const CTABlock = ({ ctaText, isRTL }: { ctaText: string; isRTL: boolean }) => (
    <Block className="col-span-12 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className={`text-xl md:text-2xl text-white/80 font-medium ${isRTL ? "text-right" : "text-left"} mb-0`}>
            {isRTL ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to start your project?"}
        </p>
        <a
            href="https://wa.me/+212716413605"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full md:w-auto items-center justify-between gap-4 px-8 py-5 bg-[rgba(255,255,255,0.05)] text-white rounded-2xl font-bold hover:bg-[#25D366] transition-all transform shadow-xl hover:shadow-[#25D366]/20 group ${isRTL ? "flex-row-reverse" : ""}`}
        >
            <span className="text-lg">{ctaText}</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                <FaWhatsapp className="w-5 h-5" />
            </div>
        </a>
    </Block>
);
