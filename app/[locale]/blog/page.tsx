'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Footer from '@/components/Footer';
import ServicesCTA from '@/components/ServicesCTA';
import { useState } from 'react';
import ServiceForm from '@/components/ServiceForm';

// Dummy blog data
const blogPosts = [
    {
        id: 'automating-ecommerce-support-ai',
        title: 'How to Automate E-Commerce Customer Support with AI Agents',
        excerpt: 'Learn how to deploy intelligent AI agents in Shopify and WooCommerce to handle 80% of customer inquiries 24/7 without human intervention.',
        category: 'AI Agents',
        readTime: '5 min read',
        date: 'Oct 15, 2025',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        featured: true,
    },
    {
        id: 'llm-fine-tuning-vs-rag',
        title: 'LLM Fine-Tuning vs RAG: Which is Right for Your Startup?',
        excerpt: 'An engineering perspective on when to fine-tune your own language models versus using Retrieval-Augmented Generation for business data.',
        category: 'LLM Fine-Tuning',
        readTime: '8 min read',
        date: 'Sep 28, 2025',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'n8n-workflow-automation-guide',
        title: 'Building Resilient n8n Workflows for SaaS Platforms',
        excerpt: 'Stop relying on Zapier limits. A complete guide to building and scaling self-hosted n8n automations for robust system integrations.',
        category: 'Automations',
        readTime: '6 min read',
        date: 'Sep 12, 2025',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'nextjs-ecommerce-performance',
        title: 'Achieving 99/100 Core Web Vitals on Next.js E-Commerce',
        excerpt: 'Technical strategies for optimizing Next.js server components, image delivery, and edge caching for headless e-commerce stores.',
        category: 'Web Development',
        readTime: '7 min read',
        date: 'Aug 30, 2025',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    }
];

export default function BlogPage() {
    const locale = useLocale();
    const t = useTranslations('services');
    const isRTL = locale === 'ar';
    const [formOpen, setFormOpen] = useState(false);

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <main className="min-h-screen flex flex-col relative" style={{ background: "#020617" }} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Background Decorations */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            {/* Animated Light Shapes */}
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
                            href={`/${locale}`}
                            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition"
                        >
                            {isRTL ? null : <ChevronLeft className="w-4 h-4" />}
                            {isRTL ? "الرئيسية" : "Back Home"}
                        </Link>
                        <LocaleSwitcher />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-12 overflow-hidden px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <span
                            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
                            style={{
                                background: "rgba(30,103,198,0.12)",
                                color: "#1E67C6",
                                border: "1px solid rgba(30,103,198,0.25)",
                            }}
                        >
                            Insights & Engineering
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            The Yurafy <span className="text-[#13FFAA]">Blog</span>
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto text-white/50">
                            Technical articles, guides, and insights on AI automation, web development, and digital scaling.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="flex-grow py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Featured Post */}
                    {featuredPost && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20"
                        >
                            <Link href={`/${locale}/blog/${featuredPost.id}`} className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col lg:flex-row">
                                <div className="relative w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#13FFAA] mb-4">
                                        {featuredPost.category}
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 group-hover:text-[#1E67C6] transition-colors leading-tight">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm text-white/40 mb-8">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {featuredPost.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {featuredPost.readTime}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-white font-semibold group-hover:text-[#13FFAA] transition-colors">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Regular Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/${locale}/blog/${post.id}`} className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                    <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#020617]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#1E67C6] transition-colors mb-4 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/50 text-sm mb-6 flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-white/40 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ServicesCTA onRequestQuote={() => setFormOpen(true)} />

            {/* Footer */}
            <Footer />

            <ServiceForm
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
                services={[]}
                initialServiceType={""}
            />
        </main>
    );
}
