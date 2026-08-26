"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const TECH_STACK = [
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

export default function HeroTechStackLogos() {
  const t = useTranslations("services");

  return (
    <section className="relative py-10 bg-transparent overflow-hidden">
      <div className="text-center mb-6 px-4">
        <span className="text-xs uppercase tracking-wider text-white/50 font-semibold select-none">
          {t("techStack.label")}
        </span>
      </div>

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <div className="flex w-max gap-12 py-2 animate-marquee">
          <div className="flex gap-12 items-center">
            {TECH_STACK.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg select-none opacity-60 hover:opacity-100 hover:bg-white/5 transition-all duration-300"
              >
                <Image src={tech.logo} alt={tech.name} width={24} height={24} className="object-contain opacity-80" unoptimized />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-12 items-center" aria-hidden="true">
            {TECH_STACK.map((tech, i) => (
              <div
                key={`s-${i}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg select-none opacity-60 hover:opacity-100 hover:bg-white/5 transition-all duration-300"
              >
                <Image src={tech.logo} alt={tech.name} width={24} height={24} className="object-contain opacity-80" unoptimized />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
