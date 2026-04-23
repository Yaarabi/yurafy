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
            className="relative overflow-hidden pt-16 pb-6"
            style={{ background: "#020617", borderTop: "1px solid rgba(255,255,255,0.07)" }}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at bottom, rgba(30,103,198,0.08), transparent 70%)" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div className={`col-span-2 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <div className="mb-6">
                        <Image src="/yurafy.svg" alt="Yurafy" width={120} height={40} className="h-10 w-auto" priority />
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {t("companyDescription")}
                    </p>
                    <div className="flex gap-3">
                        {socials.map(({ href, icon: Icon, label, hover }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-300"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(255,255,255,0.5)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = hover;
                                    e.currentTarget.style.borderColor = hover;
                                    e.currentTarget.style.background = `${hover}1A`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                }}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className={`col-span-1 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                        {t("navigation.title")}
                    </h3>
                    <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {[
                            { label: t("navigation.home"),     href: `/${locale}#home` },
                            { label: t("navigation.projects"), href: `/${locale}/projects` },
                            { label: t("navigation.pricing"),  href: `/${locale}/pricing` },
                            { label: t("navigation.about"),    href: `/${locale}#about` },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div className={`col-span-1 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                        {t("resources.title")}
                    </h3>
                    <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {[
                            { label: t("resources.resources"), href: `/${locale}/blog` },
                            { label: t("resources.support"),   href: `/${locale}#cta` },
                            { label: t("resources.terms"),     href: `/${locale}/terms` },
                            { label: t("resources.services"),  href: `/${locale}#services` },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="hover:text-white transition-colors duration-200 inline-block"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className={`col-span-2 md:col-span-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                        {t("contact.title")}
                    </h3>
                    <div className="space-y-3">
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
                                className={`flex items-center gap-3 text-sm group transition-all duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                                style={{ color: "rgba(255,255,255,0.4)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = color)}
                                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                            >
                                <span
                                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    {icon}
                                </span>
                                {label}
                            </a>
                        ))}

                        <div className={`flex items-center gap-3 text-sm ${isRTL ? "flex-row-reverse" : ""}`} style={{ color: "rgba(255,255,255,0.35)" }}>
                            <span
                                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
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

            {/* Bottom bar */}
            <div
                className="relative z-10 mt-12 pt-6 text-center text-xs"
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.25)",
                }}
            >
                {t("copyright")}
            </div>

            {/* Floating WhatsApp button */}
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-5 sm:bottom-6 right-5 sm:right-6 p-3.5 rounded-full shadow-xl z-50 flex items-center justify-center transition-all duration-300 hover:scale-110`}
                style={{ background: "#25D366" }}
            >
                <FaWhatsapp size={26} className="text-white" />
            </a>
        </footer>
    );
}