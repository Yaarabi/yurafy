'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { getProjects } from '@/app/actions/projects';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServicesCTA from '@/components/ServicesCTA';
import Footer from '@/components/Footer';
import ServiceForm from '@/components/ServiceForm'; 

interface Project {
    _id: string;
    name: string;
    link: string;
    img: string;
}

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
    const locale = useLocale();
    const t = useTranslations('services');
    const isRTL = locale === 'ar';
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [formOpen, setFormOpen] = useState(false);
    const [initialServiceType, setInitialServiceType] = useState('');
    const gridRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await getProjects();
                if (!cancelled) {
                    setProjects(data.projects || []);
                }
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

    // Pagination calculations
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className="min-h-screen flex flex-col relative" style={{ background: "transparent" }} dir={isRTL ? 'rtl' : 'ltr'}>
            <Toaster position="top-center" />

            {/* Background Dot Matrix */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Ambient Lighting */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed top-[20%] right-[-5%] w-[30%] h-[40%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-10 overflow-hidden px-6 text-center">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <h1 className="tahoe-glass-text text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight px-1">
                            {t("projectsTitle")}
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto text-slate-200/80 font-medium leading-relaxed">
                            {t("projectsSubtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section ref={gridRef} className="flex-grow py-10 px-4 sm:px-6 lg:px-8 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-28 gap-4">
                            <div className="flex gap-2">
                                {[0, 1, 2].map(i => (
                                    <div
                                        key={i}
                                        className="w-3.5 h-3.5 rounded-full animate-bounce"
                                        style={{ background: "#13FFAA", animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-slate-300/60 font-medium">{t("projectsEmpty")}</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid of Projects using identical homepage card design */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {currentProjects.map((p, i) => {
                                        const { hex } = accentColors[i % accentColors.length];
                                        return (
                                            <div key={p._id} className="flex">
                                                <a
                                                    href={p.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tahoe-glass-card group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 w-full flex flex-col"
                                                >
                                                    {/* Image container with glowing hover beam */}
                                                    <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                                                        <img
                                                            src={p.img}
                                                            alt={p.name}
                                                            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/50" />
                                                        <div
                                                            className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }}
                                                        />
                                                    </div>

                                                    {/* Card Content & Action Button */}
                                                    <div className="p-6 flex items-center justify-between gap-4 mt-auto">
                                                        <h4 className="text-lg font-extrabold text-white truncate tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                                            {p.name}
                                                        </h4>
                                                        <span
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 shadow-sm shrink-0"
                                                        >
                                                            {t("projectsView")}
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-14 pt-8 border-t border-white/10">
                                    {/* Pagination Buttons */}
                                    <div className="flex items-center gap-2">
                                        {/* Prev Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            aria-label="Previous page"
                                            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                                                currentPage === 1
                                                    ? "border-white/5 text-white/20 cursor-not-allowed bg-transparent"
                                                    : "border-white/15 bg-white/5 text-white hover:bg-white/15 hover:border-white/30 shadow-md hover:scale-105"
                                            }`}
                                        >
                                            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                                        </button>

                                        {/* Page Numbers */}
                                        {Array.from({ length: totalPages }, (_, idx) => {
                                            const pageNumber = idx + 1;
                                            const isActive = currentPage === pageNumber;
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center ${
                                                        isActive
                                                            ? "bg-gradient-to-r from-[#13FFAA] to-[#1E67C6] text-slate-950 shadow-lg scale-105 ring-2 ring-white/20"
                                                            : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/25"
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        })}

                                        {/* Next Button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            aria-label="Next page"
                                            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                                                currentPage === totalPages
                                                    ? "border-white/5 text-white/20 cursor-not-allowed bg-transparent"
                                                    : "border-white/15 bg-white/5 text-white hover:bg-white/15 hover:border-white/30 shadow-md hover:scale-105"
                                            }`}
                                        >
                                            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
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
