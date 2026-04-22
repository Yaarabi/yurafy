import { notFound } from 'next/navigation';
import { getPost, blogPosts } from '@/lib/blog-data';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Footer from '@/components/Footer';
import ServicesCTA from '@/components/ServicesCTA';
import SupportChat from '@/components/SupportChat';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  Object.keys(blogPosts).forEach((locale) => {
    Object.keys(blogPosts[locale]).forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);

  if (!post) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://yurafy.com';
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        fr: `${baseUrl}/fr/blog/${slug}`,
        ar: `${baseUrl}/ar/blog/${slug}`,
        'x-default': `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isRTL = locale === 'ar';
  const post = getPost(slug, locale);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://yurafy.com';
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yurafy',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen flex flex-col relative" style={{ background: '#020617' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Schema.org Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Background Decorations */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <nav className="relative z-20 w-full px-6 py-8 sm:px-10 lg:px-16 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/favi.png" alt="Yurafy" width={40} height={40} />
            <span className="text-xl font-bold text-white">Yurafy</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/blog`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition"
            >
              {isRTL ? null : <ChevronLeft className="w-4 h-4" />}
              {isRTL ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>

      <article className="flex-grow pt-12 pb-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm font-semibold tracking-wider uppercase mb-6">
              <span className="text-[#13FFAA]">{post.category}</span>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-2 text-white/40">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-white/60 mb-10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{post.author}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl mb-12">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </header>

          {/* Intro & Content */}
          <div className="max-w-none 
            [&_p]:text-lg [&_p]:text-white/70 [&_p]:mb-6 [&_p]:leading-relaxed
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-14 [&_h2]:mb-6
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:mb-8 [&_ul]:text-white/70 [&_ul]:text-lg
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol]:mb-8 [&_ol]:text-white/70 [&_ol]:text-lg
            [&_li]:leading-relaxed
            [&_strong]:text-white [&_strong]:font-semibold
            [&_em]:text-white/90
            [&_a]:text-[#1E67C6] [&_a]:underline
          ">
            <p className="text-xl text-white/90 leading-relaxed mb-10 font-medium border-b border-white/10 pb-10">
              {post.description}
            </p>
            
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Key Takeaways Section */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="mt-16 p-8 rounded-3xl bg-blue-900/10 border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {isRTL ? 'النقاط الرئيسية' : 'Key Takeaways'}
                </h3>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-0">
                      <CheckCircle2 className="w-6 h-6 text-[#13FFAA] shrink-0 mt-0.5" />
                      <span className="text-white/80">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-16 pt-16 border-t border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8">
                  {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </h3>
                <div className="space-y-8">
                  {post.faq.map((faq, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-white mb-3 mt-0">{faq.question}</h4>
                      <p className="text-white/70 m-0">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Internal Linking / Next Steps */}
      <div className="border-t border-white/10 bg-white/[0.02] py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
                {isRTL ? 'هل أنت مستعد لأتمتة عملك؟' : 'Ready to automate your workflows?'}
            </h2>
            <p className="text-lg text-white/60 mb-8">
                {isRTL 
                    ? 'اكتشف كيف يمكن لحلول وكلاء الذكاء الاصطناعي الخاصة بنا توسيع نطاق دعم التجارة الإلكترونية الخاص بك.'
                    : 'Discover how our Custom AI Agent Solutions can scale your e-commerce support.'
                }
            </p>
            <div className="flex justify-center gap-4">
                <Link href={`/${locale}/pricing`} className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E67C6] text-white rounded-full font-bold hover:bg-[#1E67C6]/90 transition">
                    {isRTL ? 'عرض خطط الأسعار' : 'View Pricing Plans'}
                </Link>
                <Link href={`/${locale}/`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition">
                    {isRTL ? 'تصفح خدماتنا' : 'Browse Services'} <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </div>

      <Footer />
      <SupportChat />
    </main>
  );
}
