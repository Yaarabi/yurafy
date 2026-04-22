'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Pricing from '@/components/Pricing';
import ServicesCTA from '@/components/ServicesCTA';
import Footer from '@/components/Footer';
import SupportChat from '@/components/SupportChat';
import ServiceForm from '@/components/ServiceForm';
import Link from 'next/link';
import Image from 'next/image';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ChevronLeft } from 'lucide-react';

export default function PricingPage() {
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
    <main className="min-h-screen flex flex-col relative" style={{ background: "#020617" }}>
      <Toaster position="top-center" />

      {/* Background Decorations */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Animated Light Shapes */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Mini Header */}
      <nav className="relative z-20 w-full px-6 py-8 sm:px-10 lg:px-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/favi.png" alt="Yurafy" width={40} height={40} />
            <span className="text-xl font-bold text-white">Yurafy</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
                href={`/${locale}`} 
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition"
            >
                <ChevronLeft className="w-4 h-4" />
                Back Home
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="flex-grow">
        <Pricing />
      </div>

      {/* CTA banner */}
      <ServicesCTA onRequestQuote={() => openForm()} />

      {/* Footer */}
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
