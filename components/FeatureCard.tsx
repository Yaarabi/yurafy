'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="tahoe-glass-card group relative rounded-2xl p-6 hover:-translate-y-1.5"
        >
            {/* Icon Container */}
            <div className="mb-4 inline-flex p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-blue-100/80 leading-relaxed">
                {description}
            </p>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
}

