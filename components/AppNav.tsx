'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutGrid,
  X,
  Home,
  DollarSign,
  FolderKanban,
  BookOpen,
  Globe2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const links = (locale: string) => [
  {
    href: `/${locale}`,
    label: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    icon: Home,
    color: '#1E67C6',
  },
  {
    href: `/${locale}/pricing`,
    label: { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار' },
    icon: DollarSign,
    color: '#13FFAA',
  },
  {
    href: `/${locale}/projects`,
    label: { en: 'Projects', fr: 'Projets', ar: 'المشاريع' },
    icon: FolderKanban,
    color: '#CE84CF',
  },
  {
    href: `/${locale}/blog`,
    label: { en: 'Blog', fr: 'Blog', ar: 'المدونة' },
    icon: BookOpen,
    color: '#DD335C',
  },
];

const localeLabels: Record<string, string> = { en: 'EN', fr: 'FR', ar: 'عر' };

export default function AppNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    // strip the locale prefix from pathname before switching
    const segments = pathname.split('/');
    const pathWithoutLocale = '/' + segments.slice(2).join('/');
    router.replace(pathWithoutLocale || '/', { locale: newLocale });
  };
  const ref = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLinks = links(locale);

  return (
    <div
      ref={ref}
      className="fixed top-5 right-5 z-[9999]"
      style={isRTL ? { right: 'auto', left: '20px' } : {}}
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open app navigation"
        className="relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
        style={{
          background: open
            ? 'rgba(30,103,198,0.3)'
            : 'rgba(255,255,255,0.08)',
          border: open
            ? '1px solid rgba(30,103,198,0.6)'
            : '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="grid"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <LayoutGrid className="w-5 h-5 text-white/80" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-14 min-w-[200px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              right: isRTL ? 'auto' : 0,
              left: isRTL ? 0 : 'auto',
              background: 'rgba(2, 6, 23, 0.92)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30">
                {locale === 'ar' ? 'الصفحات' : locale === 'fr' ? 'Pages' : 'Navigation'}
              </p>
            </div>

            {/* Links */}
            <nav className="p-2">
              {navLinks.map(({ href, label, icon: Icon, color }, i) => {
                const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                      style={{
                        background: isActive ? `${color}18` : 'transparent',
                        direction: isRTL ? 'rtl' : 'ltr',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {/* Icon pill */}
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{
                          background: `${color}22`,
                          border: `1px solid ${color}33`,
                          color,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </span>

                      <span
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.65)' }}
                      >
                        {label[locale as 'en' | 'fr' | 'ar'] || label.en}
                      </span>

                      {/* Active dot */}
                      {isActive && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: color }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Locale Switcher */}
            <div
              className="px-4 py-3 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-2.5 flex items-center gap-1.5">
                <Globe2 className="w-3 h-3" />
                {locale === 'ar' ? 'اللغة' : locale === 'fr' ? 'Langue' : 'Language'}
              </p>
              <div className="flex items-center gap-1" dir="ltr">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                    style={{
                      background: locale === loc ? 'rgba(30,103,198,0.3)' : 'rgba(255,255,255,0.05)',
                      border: locale === loc ? '1px solid rgba(30,103,198,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: locale === loc ? 'white' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
