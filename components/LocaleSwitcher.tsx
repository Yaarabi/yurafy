'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'عر',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`px-2.5 py-1 rounded-lg text-sm font-semibold transition-all duration-200 ${
            locale === loc
              ? 'bg-white/25 text-white'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
          aria-label={`Switch to ${loc}`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}

