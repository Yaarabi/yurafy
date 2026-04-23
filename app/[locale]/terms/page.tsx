'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ServicesCTA from '@/components/ServicesCTA';
import Footer from '@/components/Footer';
import ServiceForm from '@/components/ServiceForm';
import { motion } from 'framer-motion';

export default function TermsPage() {
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

  const isRTL = locale === 'ar';

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
      
      <div className="flex-grow pt-32 pb-20 px-6 sm:px-8 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={isRTL ? 'text-right' : 'text-left'}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 tracking-tight">
            {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          
          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isRTL ? '1. قبول الشروط' : '1. Acceptance of Terms'}
              </h2>
              <p>
                {isRTL 
                  ? 'من خلال الوصول إلى خدماتنا واستخدامها، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا.'
                  : 'By accessing and using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isRTL ? '2. الخدمات المقدمة' : '2. Services Provided'}
              </h2>
              <p>
                {isRTL
                  ? 'تقدم Yurafy خدمات تطوير الويب والتصميم والاستشارات الرقمية. يتم تحديد نطاق العمل لكل مشروع في اتفاقية منفصلة.'
                  : 'Yurafy provides web development, design, and digital consulting services. The scope of work for each project is defined in a separate agreement.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isRTL ? '3. الملكية الفكرية' : '3. Intellectual Property'}
              </h2>
              <p>
                {isRTL
                  ? 'تظل جميع المواد التي تقدمها Yurafy ملكية فكرية لنا حتى يتم سداد كامل المبلغ، وبعد ذلك تنتقل الملكية إلى العميل.'
                  : 'All materials produced by Yurafy remain our intellectual property until full payment is received, at which point ownership transfers to the client.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isRTL ? '4. الخصوصية' : '4. Privacy'}
              </h2>
              <p>
                {isRTL
                  ? 'نحن نقدر خصوصيتك. يتم التعامل مع جميع بيانات العميل بسرية تامة ولا يتم مشاركتها مع أطراف ثالثة دون موافقة صريحة.'
                  : 'We value your privacy. All client data is handled with strict confidentiality and is not shared with third parties without explicit consent.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isRTL ? '5. اتصل بنا' : '5. Contact Us'}
              </h2>
              <p>
                {isRTL
                  ? 'إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا عبر الواتساب أو البريد الإلكتروني.'
                  : 'If you have any questions about these terms, please contact us via WhatsApp or Email.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      {/* CTA banner */}
      <ServicesCTA onRequestQuote={() => openForm()} />

      {/* Footer */}
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
