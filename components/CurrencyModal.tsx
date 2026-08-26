"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe2, ArrowRight, CheckCircle2 } from "lucide-react";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCurrency: (currency: "USD" | "MAD") => void;
  selectedCurrency: "USD" | "MAD";
}

export default function CurrencyModal({
  isOpen,
  onClose,
  onSelectCurrency,
  selectedCurrency,
}: CurrencyModalProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const content = {
    en: {
      badge: "Regional Pricing",
      title: "Select Currency",
      subtitle: "Choose your preferred currency for accurate invoicing and local payment methods.",
      usd: {
        symbol: "$",
        code: "USD",
        name: "US Dollar",
        tag: "Global & International",
        desc: "Stripe, Credit Cards & International Wire",
      },
      mad: {
        symbol: "DH",
        code: "MAD",
        name: "Moroccan Dirham",
        tag: "Morocco & Local 🇲🇦",
        desc: "Virement Bancaire, CMI & Local Transfers",
      },
      confirm: "Continue to Pricing",
      switchNotice: "You can toggle this anytime in the header switcher.",
    },
    fr: {
      badge: "Tarification Régionale",
      title: "Choisissez votre Devise",
      subtitle: "Sélectionnez votre devise pour une facturation claire et des moyens de paiement adaptés.",
      usd: {
        symbol: "$",
        code: "USD",
        name: "Dollar Américain",
        tag: "International & Global",
        desc: "Carte Bancaire, Stripe & Virements Internationaux",
      },
      mad: {
        symbol: "DH",
        code: "MAD",
        name: "Dirham Marocain",
        tag: "Maroc & Local 🇲🇦",
        desc: "Virement Bancaire, CMI & Paiements Locaux",
      },
      confirm: "Accéder aux Tarifs",
      switchNotice: "Modifiable à tout moment depuis le sélecteur en haut.",
    },
    ar: {
      badge: "التسعير الإقليمي",
      title: "اختر عملة العرض",
      subtitle: "حدد العملة المفضلة لديك لعرض الأسعار وطرق الدفع المناسبة لنشاطك.",
      usd: {
        symbol: "$",
        code: "USD",
        name: "الدولار الأمريكي",
        tag: "دولي وحول العالم",
        desc: "البطاقات الدولية، Stripe والتحويلات البنكية",
      },
      mad: {
        symbol: "DH",
        code: "MAD",
        name: "الدرهم المغربي",
        tag: "المغرب والمحلي 🇲🇦",
        desc: "التحويل البنكي، CMI وطرق الدفع المحلية",
      },
      confirm: "متابعة إلى خطط الأسعار",
      switchNotice: "يمكنك تغيير العملة في أي وقت من زر التبديل بالأعلى.",
    },
  }[locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"];

  const [activeChoice, setActiveChoice] = useState<"USD" | "MAD">(selectedCurrency);

  useEffect(() => {
    setActiveChoice(selectedCurrency);
  }, [selectedCurrency]);

  const handleSelect = (c: "USD" | "MAD") => {
    setActiveChoice(c);
    onSelectCurrency(c);
  };

  const handleConfirm = () => {
    onSelectCurrency(activeChoice);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none" 
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Deep Cinematic Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl transition-opacity"
          />

          {/* Ambient Colored Radial Halo */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#13FFAA]/20 via-[#1E67C6]/25 to-[#CE84CF]/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Main Modal Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className="tahoe-glass-card relative w-full max-w-lg rounded-[36px] sm:rounded-[42px] p-6 sm:p-9 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/20 z-10"
          >
            {/* Top Multi-Gradient Specular Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#13FFAA] via-[#1E67C6] to-transparent opacity-90" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className={`absolute top-6 ${isRTL ? "left-6" : "right-6"} w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 flex items-center justify-center transition-all duration-200 hover:scale-105`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 bg-white/5 text-[#13FFAA] shadow-sm">
                <Globe2 className="w-3.5 h-3.5 text-[#13FFAA]" />
                {content.badge}
              </div>

              <h2 className="tahoe-glass-text text-3xl sm:text-4xl font-extrabold tracking-tight mb-2.5">
                {content.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300/80 font-medium max-w-sm mx-auto leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            {/* Interactive Currency Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
              {/* USD Tile */}
              <div
                onClick={() => handleSelect("USD")}
                className={`relative cursor-pointer rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                  activeChoice === "USD"
                    ? "bg-gradient-to-b from-[#1E67C6]/30 to-[#0c1e45]/60 border-[#38BDF8] shadow-[0_0_25px_rgba(30,103,198,0.35)] ring-2 ring-[#38BDF8]/40 scale-[1.02]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                {/* Active glow dot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
                    {content.usd.tag}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    activeChoice === "USD" ? "bg-[#38BDF8] text-slate-950 scale-110" : "border border-white/20 text-transparent"
                  }`}>
                    <CheckCircle2 className="w-4 h-4 fill-[#38BDF8] text-slate-950" />
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-4xl font-black text-white tracking-tight mb-1 flex items-baseline gap-1.5">
                    {content.usd.symbol}
                    <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">{content.usd.code}</span>
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {content.usd.name}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium mt-3 pt-3 border-t border-white/10 leading-snug">
                  {content.usd.desc}
                </p>
              </div>

              {/* MAD Tile */}
              <div
                onClick={() => handleSelect("MAD")}
                className={`relative cursor-pointer rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                  activeChoice === "MAD"
                    ? "bg-gradient-to-b from-[#13FFAA]/25 to-[#0b3322]/60 border-[#13FFAA] shadow-[0_0_25px_rgba(19,255,170,0.3)] ring-2 ring-[#13FFAA]/40 scale-[1.02]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                {/* Active glow dot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
                    {content.mad.tag}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    activeChoice === "MAD" ? "bg-[#13FFAA] text-slate-950 scale-110" : "border border-white/20 text-transparent"
                  }`}>
                    <CheckCircle2 className="w-4 h-4 fill-[#13FFAA] text-slate-950" />
                  </div>
                </div>

                <div className="my-2">
                  <div className="text-4xl font-black text-white tracking-tight mb-1 flex items-baseline gap-1.5">
                    {content.mad.symbol}
                    <span className="text-xs font-bold text-[#13FFAA] uppercase tracking-widest">{content.mad.code}</span>
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {content.mad.name}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium mt-3 pt-3 border-t border-white/10 leading-snug">
                  {content.mad.desc}
                </p>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirm}
              className="w-full py-4 rounded-2xl font-extrabold text-sm text-slate-950 transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 ring-2 ring-white/30 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #13FFAA 0%, #1E67C6 100%)",
              }}
            >
              <span>{content.confirm}</span>
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isRTL ? "rotate-180" : ""}`} />
            </button>

            {/* Footer Notice */}
            <p className="text-[11px] text-center text-slate-400/80 font-medium mt-4">
              {content.switchNotice}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
