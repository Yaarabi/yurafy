"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/Marquee";
import { Star } from "lucide-react";

interface Review {
  name: string;
  username: string;
  body: {
    en: string;
    fr: string;
    ar: string;
  };
  img: string;
  rating?: number;
}

const REVIEWS: Review[] = [
  {
    name: "Yassine El Amrani",
    username: "@yassine_amrani • Casablanca Apparel",
    body: {
      en: "Yurafy rebuilt our Shopify storefront with custom COD checkout and WhatsApp order tracking. Our mobile conversion rate jumped by 43% in the first month.",
      fr: "Yurafy a reconstruit notre boutique Shopify avec un checkout COD optimisé et un suivi WhatsApp. Notre conversion mobile a grimpé de 43 % le premier mois.",
      ar: "أعادت يورافي بناء متجرنا على شوبيفاي بنظام دفع عند الاستلام وتتبع الطلبات عبر واتساب. ارتفعت نسبة التحويل لدينا بنسبة 43٪ في الشهر الأول.",
    },
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    username: "@sophie.laurent • Atelier Nova Paris",
    body: {
      en: "The UI/UX precision is remarkable. Our load time dropped from 3.8s to 0.6s, and automated workflows saved our team 15+ hours each week.",
      fr: "La précision UI/UX est remarquable. Le temps de chargement est passé de 3,8s à 0,6s et les flux automatisés nous font gagner plus de 15h par semaine.",
      ar: "الدقة في واجهات المستخدم مذهلة. انخفض وقت تحميل الموقع من 3.8 إلى 0.6 ثانية ووفرت الأتمتة لفريقنا أكثر من 15 ساعة كل أسبوع.",
    },
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Tariq Al-Mansoor",
    username: "@tariq_gulf • GulfTech Logistics (Dubai)",
    body: {
      en: "We needed a custom Next.js dispatch dashboard connected to our delivery APIs. Yurafy delivered ahead of schedule with immaculate code architecture.",
      fr: "Nous avions besoin d'un dashboard Next.js connecté à nos API de livraison. Yurafy a livré en avance avec une architecture de code irréprochable.",
      ar: "احتجنا إلى لوحة تحكم مخصصة بتقنية Next.js مرتبطة بأنظمة التوصيل. فريق يورافي سلّم المشروع قبل الموعد وببنية برمجية ممتازة.",
    },
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Karim Bennani",
    username: "@karim_bennani • Argania Pure",
    body: {
      en: "From initial wireframes to production launch, Yurafy handled everything seamlessly. Their bilingual Arabic & French setup doubled our sales.",
      fr: "Du design initial au lancement, Yurafy a tout géré avec fluidité. La configuration bilingue arabe et français a doublé nos ventes.",
      ar: "من المخططات الأولية حتى الإطلاق النهائي، أدارت يورافي كل شيء بسلاسة. الدعم الكامل للغتين العربية والفرنسية ضاعف مبيعاتنا.",
    },
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    username: "@elena_rostova • Nexus AI",
    body: {
      en: "They integrated our custom AI agent into our web application with full streaming responses and clean design. Communication was crystal clear.",
      fr: "Ils ont intégré notre agent IA à notre application web avec des réponses instantanées et un design soigné. Une communication limpide du début à la fin.",
      ar: "قاموا بدمج وكيل الذكاء الاصطناعي الخاص بنا في تطبيق الويب مع استجابة فورية وتصميم رائع. التواصل معهم كان واضحاً ومميزاً طوال المشروع.",
    },
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Omar Cheikh",
    username: "@omar_cheikh • Atlas Real Estate",
    body: {
      en: "Our property platform needed ultra-fast filtering and interactive maps. Yurafy built a high-performance web app that clients constantly praise.",
      fr: "Notre portail immobilier nécessitait des filtres ultra-rapides et des cartes interactives. Yurafy a créé une plateforme fluide et performante.",
      ar: "احتاج موقعنا العقاري إلى تصفيات بحث سريعة وخرائط تفاعلية. أنشأت يورافي منصة عالية الأداء نالت إعجاب عملائنا باستمرار.",
    },
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Marc Dubois",
    username: "@marc_dubois • Veloce Studio",
    body: {
      en: "Exceptional quality. Our members love the smooth mobile experience, and automated WhatsApp reminders reduced our no-show rate to under 2%.",
      fr: "Qualité exceptionnelle. Nos membres adorent l'expérience mobile, et les rappels WhatsApp automatiques ont réduit les absences à moins de 2 %.",
      ar: "جودة استثنائية. أعضاء النادي معجبون بالتجربة السلسة على الهاتف، وتذكيرات واتساب التلقائية خفضت نسبة الغياب إلى أقل من 2٪.",
    },
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Hassan Qureshi",
    username: "@hassan_q • Spice & Scent Co.",
    body: {
      en: "The custom COD checkout plugin they built solved our abandoned cart issues. Professional, responsive, and truly experts in modern web technologies.",
      fr: "Le module de commande COD personnalisé qu'ils ont conçu a réglé nos abandons de panier. Très professionnels et réactifs.",
      ar: "إضافة الدفع عند الاستلام المخصصة التي طوروها حلت مشكلة السلات المتروكة. فريق محترف ومتجاوب وخبير في أحدث تقنيات الويب.",
    },
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
  locale,
  rating = 5,
}: Review & { locale: string }) => {
  const currentLocale = locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en";
  const reviewText = body[currentLocale] || body.en;
  const isRTL = locale === "ar";

  return (
    <figure
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "relative w-72 sm:w-80 md:w-96 cursor-pointer overflow-hidden rounded-3xl p-5 sm:p-6",
        "bg-gradient-to-br from-[#0b142e]/90 via-[#070e22]/90 to-[#030818]/90",
        "border border-white/10 hover:border-white/25 shadow-xl",
        "hover:-translate-y-1 transition-transform duration-300 select-none flex flex-col justify-between transform-gpu"
      )}
      style={{
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), 0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <div>
        <div className="flex flex-row items-center justify-between gap-3 mb-3">
          <div className="flex flex-row items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20 bg-slate-800">
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover"
                sizes="40px"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <figcaption className="text-sm font-extrabold text-white tracking-tight drop-shadow-sm">
                {name}
              </figcaption>
              <p className="text-xs font-medium text-slate-300/80">{username}</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <blockquote className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed mt-2">
          &ldquo;{reviewText}&rdquo;
        </blockquote>
      </div>
    </figure>
  );
};

export default function Testimonials() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const firstRow = REVIEWS.slice(0, 4);
  const secondRow = REVIEWS.slice(4, 8);

  const title = {
    en: "Loved by Founders & Modern Businesses",
    fr: "Plébiscité par les Fondateurs & Entreprises",
    ar: "موثوق به من قبل رواد الأعمال والشركات",
  }[locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"];

  const subtitle = {
    en: "Real results, genuine reviews, and trusted long-term web partnerships across the globe.",
    fr: "Des résultats concrets, des avis authentiques et des partenariats digitaux durables.",
    ar: "نتائج حقيقية، تقييمات موثوقة، وشراكات رقمية ناجحة حول العالم.",
  }[locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"];

  const badge = {
    en: "Client Testimonials",
    fr: "Témoignages Clients",
    ar: "آراء العملاء",
  }[locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"];

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden [contain:content]"
      style={{ background: "transparent" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 bg-white/5 text-[#13FFAA] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#13FFAA] animate-pulse" />
          {badge}
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {title}
        </h2>

        {/* Section Subtitle */}
        <p className="text-base sm:text-lg text-slate-200/85 max-w-2xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Marquee Container with hardware acceleration and smooth edge fades */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [contain:paint]">
        {/* Row 1 */}
        <Marquee pauseOnHover repeat={2} className="[--duration:40s] mb-4">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} locale={locale} />
          ))}
        </Marquee>

        {/* Row 2 (Reverse) */}
        <Marquee reverse pauseOnHover repeat={2} className="[--duration:40s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} locale={locale} />
          ))}
        </Marquee>

        {/* Left & Right gradient fade masks matching the #020617 background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-[#020617] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-[#020617] to-transparent z-10" />
      </div>
    </section>
  );
}
