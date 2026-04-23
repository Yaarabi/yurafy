"use client";

import { Globe2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

interface ServicesHeroProps {
  locale: string;
  requestQuote?: () => void;
}

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function ServicesHero({
  locale,
  requestQuote,
}: ServicesHeroProps) {
  const t = useTranslations("services");

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})
  `;

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-[70vh] md:min-h-[100vh] overflow-hidden px-6 sm:px-10 lg:px-16 text-white py-12 md:py-0"
    >
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center min-h-[70vh] md:min-h-[100vh]">
        
        {/* Top Bar — always centered */}
        <div className="flex items-center justify-center mb-6 sm:mb-14">
          <Link href={`/${locale}`} className="flex flex-col items-center gap-2 text-center">
            <Image
              src="/favi.png"
              alt="Yurafy logo"
              width={48}
              height={48}
              className="object-contain drop-shadow-lg"
              priority
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Yurafy</h2>
              <p className="text-xs sm:text-sm text-white/70">
                Professional Services
              </p>
            </div>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 sm:mb-8 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              onClick={requestQuote}
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <a
              href="https://wa.me/+212716413605"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/40 rounded-2xl font-semibold hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}