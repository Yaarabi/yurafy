'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Toaster } from 'react-hot-toast';
import ServicesHero from '@/components/ServicesHero';
import HeroTechStackLogos from '@/components/TechStack';
import Services from '@/components/WebServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import Projects from '@/components/Projects';
import ServicesCTA from '@/components/ServicesCTA';
import DifferentIdea from '@/components/DifferentIdea';
import ServicesFAQ from '@/components/ServicesFAQ';
import Footer from '@/components/Footer';
import SupportChat from '@/components/SupportChat';
import ServiceForm from '@/components/ServiceForm';

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations('services');
  const [formOpen, setFormOpen] = useState(false);
  const [initialServiceType, setInitialServiceType] = useState('');

  const services = [
    { id: 'custom-website', type: t('customWebsite.type') },
    { id: 'wordpress', type: t('wordpressWebsite.type') },
    { id: 'shopify', type: t('shopifyStore.type') },
  ];

  const openForm = (serviceType?: string) => {
    setInitialServiceType(serviceType || '');
    setFormOpen(true);
  };

  return (
    <main>
      <Toaster position="top-center" />

      {/* 1 — Hero */}
      <ServicesHero locale={locale} requestQuote={() => openForm()} />

      {/* 2 — Tech stack marquee */}
      <HeroTechStackLogos />

      {/* 3 — Our expertise / web services */}
      <Services />

      {/* 4 — Why choose us (stats + reasons) */}
      <WhyChooseUs />

      {/* 5 — Our process (5-step timeline) */}
      <ProcessSection />

      {/* 6 — Recent projects gallery */}
      <Projects locale={locale} />

      {/* 7 — CTA banner */}
      <ServicesCTA onRequestQuote={() => openForm()} />

      {/* 8 — Custom/different idea prompt */}
      <DifferentIdea onRequest={() => openForm()} />

      {/* 9 — FAQ accordion */}
      <ServicesFAQ locale={locale} />

      {/* 10 — Footer */}
      <Footer />

      {/* Floating support chat */}
      <SupportChat />

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
