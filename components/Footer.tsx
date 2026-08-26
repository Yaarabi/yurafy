"use client";

import { FaInstagram, FaWhatsapp, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Footer() {
    const t = useTranslations("Footer");
    const params = useParams();
    const locale = (params.locale as string) || "en";
    const isRTL = locale === "ar";
    const url = "https://wa.me/+212716413605";

    const socials = [
        { href: "https://www.instagram.com/yurafy_com", icon: FaInstagram, label: "Instagram", hover: "#CE84CF" },
        { href: "https://www.facebook.com/profile.php?id=61580207967842", icon: FaFacebook, label: "Facebook", hover: "#1E67C6" },
        { href: "#", icon: FaLinkedin, label: "LinkedIn", hover: "#1E67C6" },
        { href: "#", icon: FaYoutube, label: "YouTube", hover: "#DD335C" },
    ];

    return (
        <footer
            className="relative overflow-hidden pt-20 pb-10 border-t border-white/10"
            style={{
                background: "linear-gradient(180deg, #060d24 0%, #020612 100%)",
            }}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Top glowing ambient accent beam */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#13FFAA] via-[#1E67C6] to-transparent opacity-80 pointer-events-none" />

            {/* Ambient top radial light glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-64 pointer-events-none opacity-40"
                style={{ background: "radial-gradient(ellipse at top, rgba(30,103,198,0.3), transparent 70%)" }}
            />

            {/* Subtle dot matrix grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                {/* Brand */}
                <div className={`col-span-2 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <div className="mb-6">
                        <Image src="/yurafy.svg" alt="Yurafy" width={130} height={42} className="h-10 w-auto" priority />
                    </div>
                    <p className="text-sm leading-relaxed mb-6 text-slate-300/85 font-normal">
                        {t("companyDescription")}
                    </p>
                    <div className="flex gap-3">
                        {socials.map(({ href, icon: Icon, label, hover }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm transition-all duration-300 bg-white/5 border border-white/10 hover:border-white/30 text-slate-300 hover:scale-110 shadow-sm"
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = hover;
                                    e.currentTarget.style.borderColor = `${hover}80`;
                                    e.currentTarget.style.background = `${hover}20`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "";
                                    e.currentTarget.style.borderColor = "";
                                    e.currentTarget.style.background = "";
                                }}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className={`col-span-1 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-extrabold text-white mb-5 tracking-wider uppercase drop-shadow-sm">
                        {t("navigation.title")}
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300/85 font-medium">
                        {[
                            { label: t("navigation.home"),     href: `/${locale}#home` },
                            { label: t("navigation.projects"), href: `/${locale}/projects` },
                            { label: t("navigation.pricing"),  href: `/${locale}/pricing` },
                            { label: t("navigation.about"),    href: `/${locale}#about` },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div className={`col-span-1 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-extrabold text-white mb-5 tracking-wider uppercase drop-shadow-sm">
                        {t("resources.title")}
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300/85 font-medium">
                        {[
                            { label: t("resources.resources"), href: `/${locale}/blog` },
                            { label: t("resources.support"),   href: `/${locale}#cta` },
                            { label: t("resources.terms"),     href: `/${locale}/terms` },
                            { label: t("resources.services"),  href: `/${locale}#services` },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className={`col-span-2 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-extrabold text-white mb-5 tracking-wider uppercase drop-shadow-sm">
                        {t("contact.title")}
                    </h3>
                    <div className="space-y-3.5">
                        {[
                            {
                                href: "mailto:contact@yurafy.com",
                                label: "contact@yurafy.com",
                                color: "#13FFAA",
                                icon: (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                ),
                            },
                            {
                                href: "https://wa.me/+212716413605",
                                label: "+212 716 413 605",
                                color: "#13FFAA",
                                target: "_blank",
                                icon: <FaWhatsapp className="w-4 h-4" />,
                            },
                        ].map(({ href, label, color, icon, target }) => (
                            <a
                                key={label}
                                href={href}
                                target={target}
                                rel={target ? "noopener noreferrer" : undefined}
                                className={`flex items-center gap-3 text-sm group transition-all duration-200 text-slate-300/85 hover:text-white font-medium ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <span
                                    className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:scale-105"
                                    style={{ color }}
                                >
                                    {icon}
                                </span>
                                {label}
                            </a>
                        ))}

                        <div className={`flex items-center gap-3 text-sm text-slate-400 font-medium ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span
                                className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10 text-[#38BDF8]"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Agadir, Morocco
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom copyright bar */}
            <div
                className="relative z-10 max-w-7xl mx-auto px-6 mt-14 pt-8 text-center text-xs text-slate-400/80 font-medium border-t border-white/10"
            >
                © {new Date().getFullYear()} Yurafy. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </div>

            {/* Floating WhatsApp button with high-visibility animated pulse waves */}
            <div className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex items-center justify-center group">
                {/* Outer animated radar ping ring */}
                <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-60 animate-ping pointer-events-none" />
                
                {/* Outer ambient glow aura */}
                <span className="absolute -inset-2 rounded-full bg-[#25D366]/30 blur-md pointer-events-none animate-pulse" />

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="relative w-14 h-14 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-white/40 group-hover:ring-[#13FFAA]"
                    style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                >
                    <FaWhatsapp size={28} className="text-white drop-shadow-md transition-transform duration-300 group-hover:rotate-12" />
                </a>
            </div>
        </footer>
    );
}