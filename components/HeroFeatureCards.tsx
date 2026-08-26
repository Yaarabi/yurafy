"use client";

import { ShoppingCart, MessageCircle, Truck, Users, LucideIcon } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface Feature {
    icon: LucideIcon;
    titleKey: string;
    descKey: string;
    gradient: string;
    accent: string;
}

export default function HeroFeatureCards() {
    const t = useTranslations('services');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const features: Feature[] = [
        { 
            icon: ShoppingCart, 
            titleKey: 'hero.features.codCheckout.title', 
            descKey: 'hero.features.codCheckout.description',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            accent: '#38BDF8',
        },
        { 
            icon: MessageCircle, 
            titleKey: 'hero.features.whatsappAuto.title', 
            descKey: 'hero.features.whatsappAuto.description',
            gradient: 'from-green-500/20 to-emerald-500/20',
            accent: '#13FFAA',
        },
        { 
            icon: Truck, 
            titleKey: 'hero.features.deliveryApi.title', 
            descKey: 'hero.features.deliveryApi.description',
            gradient: 'from-orange-500/20 to-amber-500/20',
            accent: '#F59E0B',
        },
        { 
            icon: Users, 
            titleKey: 'hero.features.teamDashboard.title', 
            descKey: 'hero.features.teamDashboard.description',
            gradient: 'from-purple-500/20 to-pink-500/20',
            accent: '#CE84CF',
        },
    ];

    return (
        <section className="overflow-hidden py-10 bg-[#020617]">
            <div
                className="flex gap-5"
                style={{
                    animation: isRTL ? `scrollRight 50s linear infinite` : `scrollLeft 50s linear infinite`,
                    width: 'fit-content',
                }}
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[220px] hover:scale-105 transition-transform duration-300"
                        >
                            <div className="tahoe-glass-card group relative rounded-2xl p-5 h-full overflow-hidden hover:-translate-y-1">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                                
                                {/* Top accent line */}
                                <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-1 bg-gradient-to-r from-[${feature.accent}] to-transparent group-hover:w-full transition-all duration-500 rounded-full`} />
                                
                                <div className="relative z-10">
                                    {/* Icon Container */}
                                    <div className="mb-4 inline-flex p-3 bg-white/10 rounded-xl shadow-md group-hover:scale-110 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-white" style={{ color: feature.accent }} />
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-base font-extrabold text-white mb-2 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {t(feature.titleKey)}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-xs leading-relaxed text-slate-200/90 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {t(feature.descKey)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
