'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { getProjects } from '@/app/actions/projects';
import { ExternalLink, ChevronLeft, LayoutPanelTop } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ServicesCTA from '@/components/ServicesCTA';
import Footer from '@/components/Footer';
import SupportChat from '@/components/SupportChat';
import ServiceForm from '@/components/ServiceForm'; 

interface Project {
    _id: string;
    name: string;
    link: string;
    img: string;
}

export default function ProjectsPage() {
    const locale = useLocale();
    const t = useTranslations('services');
    const isRTL = locale === 'ar';
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await getProjects();
                if (!cancelled) setProjects(data.projects || []);
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    const accentColors = [
        { hex: "#1E67C6", rgba: "rgba(30,103,198,0.18)" },
        { hex: "#13FFAA", rgba: "rgba(19,255,170,0.15)" },
        { hex: "#CE84CF", rgba: "rgba(206,132,207,0.15)" },
        { hex: "#DD335C", rgba: "rgba(221,51,92,0.15)" },
    ];

    return (
        <main className="min-h-screen flex flex-col relative" style={{ background: "#020617" }} dir={isRTL ? 'rtl' : 'ltr'}>
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
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed top-[20%] right-[-5%] w-[30%] h-[40%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

            <Toaster position="top-center" />

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
                            {t("projectsTitle")}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Explore Our <span className="text-[#1E67C6]">Portfolio</span>
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto text-white/50">
                            {t("projectsSubtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="flex-grow py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="flex gap-2">
                                {[0, 1, 2].map(i => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-full animate-bounce"
                                        style={{ background: "#1E67C6", animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-white/40">{t("projectsEmpty")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, i) => {
                                const accent = accentColors[i % accentColors.length];
                                return (
                                    <motion.div
                                        key={project._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (i % 6) * 0.1 }}
                                        className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={project.img}
                                                alt={project.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 bg-white text-[#020617] rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition shadow-2xl"
                                                >
                                                    {t("projectsView")}
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#1E67C6] transition-colors">
                                                {project.name}
                                            </h3>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
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
