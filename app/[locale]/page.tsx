'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Toaster } from 'react-hot-toast';
import ServicesHero from '@/components/ServicesHero';
import Services from '@/components/WebServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import Projects from '@/components/Projects';
import ServicesCTA from '@/components/ServicesCTA';
import DifferentIdea from '@/components/DifferentIdea';
import ServicesFAQ from '@/components/ServicesFAQ';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import ServiceForm from '@/components/ServiceForm';

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations('services');
  const [formOpen, setFormOpen] = useState(false);
  const [initialServiceType, setInitialServiceType] = useState('');

  const services = [
    { id: 'custom-website', type: t('customWebsite.type') },
    { id: 'mobile-app', type: locale === 'ar' ? 'تطبيق الهاتف المحمول' : locale === 'fr' ? 'Application Mobile' : 'Mobile App Development' },
    { id: 'wordpress', type: t('wordpressWebsite.type') },
    { id: 'shopify', type: t('shopifyStore.type') },
  ];

  const openForm = (serviceType?: string) => {
    setInitialServiceType(serviceType || '');
    setFormOpen(true);
  };

  return (
    <main className="min-h-screen bg-transparent text-white">
      <Toaster position="top-center" />

      {/* 1 — Hero & Tech Stack */}
      <ServicesHero locale={locale} requestQuote={() => openForm()} />

      {/* 3 — Our expertise / web services */}
      <Services />

      {/* 4 — Why choose us (stats + reasons) */}
      <WhyChooseUs />

      {/* 5 — Our process (5-step timeline) */}
      <ProcessSection />

      {/* 6 — Recent projects gallery */}
      <Projects locale={locale} />

      {/* 7 — Client Testimonials */}
      <Testimonials />

      {/* 8 — CTA banner */}
      <ServicesCTA onRequestQuote={() => openForm()} />

      {/* 9 — Custom/different idea prompt */}
      <DifferentIdea onRequest={() => openForm()} />

      {/* 10 — FAQ accordion */}
      <ServicesFAQ locale={locale} />

      {/* 11 — Footer */}
      <Footer />



      {/* Quote request modal */}
      <ServiceForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        services={services}
        initialServiceType={initialServiceType}
      />
    </main>
  );
}
