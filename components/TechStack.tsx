"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface TechLogo {
    name: string;
    logo: string;
}

export default function HeroTechStackLogos() {
    const locale = useLocale();
    const t = useTranslations("services");
    const isRTL = locale === "ar";

    const techStack: TechLogo[] = [
        { name: "MongoDB",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
        { name: "Express.js",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
        { name: "React",        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
        { name: "Node.js",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
        { name: "JavaScript",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
        { name: "TypeScript",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
        { name: "Next.js",      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" },
        { name: "NestJS",       logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-original.svg" },
        { name: "Python",       logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
        { name: "PostgreSQL",   logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
        { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
        { name: "Supabase",     logo: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4" },
        { name: "WordPress",    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-original.svg" },
        { name: "Shopify",      logo: "https://cdn.simpleicons.org/shopify/7AB55C" },
        { name: "LangChain",    logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    ];

    return (
        <section
            className="relative py-12 overflow-hidden"
            style={{
                background: "#020617",
            }}
        >
            {/* Label */}
            <div className="text-center mb-7 px-4">
                <p
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    {t("techStack.label")}
                </p>
            </div>

            {/* Fade edge masks — matching dark bg */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
                style={{ background: "linear-gradient(to right, #020617, transparent)" }}
            />
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
                style={{ background: "linear-gradient(to left, #020617, transparent)" }}
            />

            <div
                className="flex gap-4 w-fit"
                style={{
                    animation: isRTL
                        ? "scrollRight 50s linear infinite"
                        : "scrollLeft 50s linear infinite",
                }}
                onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
            >
                {[...techStack, ...techStack].map((tech, index) => (
                    <div key={index} className="flex-shrink-0 w-[130px] group cursor-default">
                        <div
                            className="flex flex-col items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(19,255,170,0.06)";
                                e.currentTarget.style.boxShadow = "0 0 16px rgba(19,255,170,0.08)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div className="relative w-9 h-9">
                                <Image
                                    src={tech.logo}
                                    alt={tech.name}
                                    fill
                                    sizes="36px"
                                    unoptimized
                                    className="object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                                    loading="lazy"
                                />
                            </div>
                            <p
                                className="text-[11px] font-medium text-center leading-tight transition-colors duration-300"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                {tech.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
