import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import AppNav from '@/components/AppNav';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://yurafy.com';

  const titles: Record<string, string> = {
    en: 'Web Development Services - Yurafy',
    fr: 'Services de Développement Web - Yurafy',
    ar: 'خدمات تطوير الويب - Yurafy',
  };

  const descriptions: Record<string, string> = {
    en: 'Professional web development services in Morocco. E-commerce stores, custom web apps, WordPress, Shopify, and modern web solutions.',
    fr: 'Services de développement web professionnel au Maroc. Boutiques e-commerce, applications web sur mesure, WordPress, Shopify et solutions web modernes.',
    ar: 'خدمات تطوير ويب احترافية في المغرب. متاجر إلكترونية، تطبيقات ويب مخصصة، ووردبريس، شوبيفاي وحلول ويب حديثة.',
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    icons: {
      icon: '/favi.png',
    },
    keywords: [
      'web development Morocco',
      'WordPress',
      'e-commerce Morocco',
      'موقع إلكتروني',
      'Shopify',
      'YouCan',
      'WooCommerce',
      'développement web Maroc',
      'boutique en ligne Maroc',
      'تطوير المواقع المغرب',
      'متجر إلكتروني المغرب',
      'Yurafy services',
      'Web development services',
      'MERN',
      'Next.js',
      'Nest.js',
      'UI/UX design',
      'custom web applications',
    ].join(', '),
    authors: [{ name: 'Yurafy' }],
    creator: 'Yurafy',
    publisher: 'Yurafy',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        ar: `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale:
        locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'ar_AR',
      url: `${baseUrl}/${locale}`,
      siteName: 'Yurafy',
      title,
      description,
      images: [
        {
          url: `${baseUrl}/og-services.png`,
          width: 1200,
          height: 630,
          alt: 'Yurafy Web Development Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-services.png`],
      creator: '@yurafy',
      site: '@yurafy',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://yurafy.com';

  // Schema.org structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/${locale}#webpage`,
    url: `${baseUrl}/${locale}`,
    name:
      locale === 'en'
        ? 'Web Development Services - Yurafy'
        : locale === 'fr'
        ? 'Services de Développement Web - Yurafy'
        : 'خدمات تطوير الويب - Yurafy',
    description:
      locale === 'en'
        ? 'Professional web development services in Morocco'
        : locale === 'fr'
        ? 'Services de développement web professionnel au Maroc'
        : 'خدمات تطوير ويب احترافية في المغرب',
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      url: baseUrl,
      name: 'Yurafy',
    },
    provider: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'Yurafy',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 200,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212-716413605',
        contactType: 'Customer Service',
        areaServed: 'MA',
        availableLanguage: ['English', 'French', 'Arabic'],
      },
      sameAs: [
        'https://www.instagram.com/yurafy_com',
        'https://www.facebook.com/profile.php?id=61580207967842',
        'https://twitter.com/yurafy',
        'https://linkedin.com/company/yurafy',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <NextIntlClientProvider messages={messages}>
          <AppNav />
          {children}
        </NextIntlClientProvider>
      </div>
    </>
  );
}
