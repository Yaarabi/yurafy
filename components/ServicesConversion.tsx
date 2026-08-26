"use client";

import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';

interface ServicesConversionProps {
    onRequest: () => void;
}

export default function ServicesConversion({ onRequest }: ServicesConversionProps) {
    const t = useTranslations('services.conversion');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    const whatsappHref = `https://wa.me/+212716413605?text=${encodeURIComponent(t('heading'))}`;

    return (
        <section
            className="max-w-5xl mx-auto px-4 mt-4 mb-16"
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            <div className="tahoe-glass-card rounded-3xl p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {t('heading')}
                </h2>
                <p className="mt-3 text-center text-slate-200/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('subtext')}
                </p>

                <div className={`mt-8 flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('chatAria')}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-bold px-6 py-4 text-white shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
                        style={{ background: 'linear-gradient(90deg,#25D366,#128C7E)' }}
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        {t('chatLabel')}
                    </a>
                    <button
                        onClick={onRequest}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-bold px-6 py-4 text-slate-950 shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
                        style={{ background: 'linear-gradient(to right, #13FFAA, #1E67C6)' }}
                    >
                        {t('requestLabel')}
                    </button>
                </div>
                <p className="mt-4 text-center text-xs sm:text-sm text-slate-300/80 font-medium">
                    {t('requestNote')}
                </p>
                <p className="mt-4 text-center text-slate-200/90 text-sm sm:text-base font-semibold">
                    {t('addon')}
                </p>
            </div>
        </section>
    );
}
