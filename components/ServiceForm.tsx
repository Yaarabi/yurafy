"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Mail, User, MessageSquare } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { submitInquiry } from '@/app/actions/inquiries';


interface ServiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    services: Array<{
        id: string;
        type: string;
    }>;
    initialServiceType?: string;
}

export default function ServiceForm({ isOpen, onClose, services, initialServiceType }: ServiceFormProps) {
    const t = useTranslations('services');
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        serviceType: initialServiceType || '',
        domainOfWork: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim() || formData.fullName.length < 2) {
            newErrors.fullName = t('form.errors.fullName');
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = t('form.errors.phoneNumber');
        }

        // Email is optional - only validate if provided
        if (formData.email.trim()) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = t('form.errors.email');
            }
        }

        if (!formData.serviceType) {
            newErrors.serviceType = t('form.errors.serviceType');
        }

        // Validate that service type is in the available services list or 'Other'
        if (formData.serviceType && formData.serviceType !== 'Other') {
            const isValidService = services.some(service => service.type === formData.serviceType);
            if (!isValidService) {
                newErrors.serviceType = `Invalid service type selected. Please choose from the dropdown.`;
            }
        }

        const isOther = formData.serviceType === 'Other';

        // domainOfWork validation: required if Other, else only length check
        if (isOther) {
            if (!formData.domainOfWork.trim()) {
                newErrors.domainOfWork = t('form.errors.domainOfWorkRequired');
            }
        }
        if (formData.domainOfWork && formData.domainOfWork.length > 100) {
            newErrors.domainOfWork = t('form.errors.domainOfWorkMax');
        }

        // message required if Other
        if (isOther) {
            if (!formData.message.trim()) {
                newErrors.message = t('form.errors.messageRequired');
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error(t('form.errors.validation'));
            return;
        }

        setSubmitting(true);

        try {
            // Log form data for debugging (server can help if needed)
            console.log('ServiceForm: Submitting inquiry', {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                serviceType: formData.serviceType,
                domainOfWork: formData.domainOfWork ? '[provided]' : '[empty]',
                message: formData.message ? '[provided]' : '[empty]',
            });

            const result = await submitInquiry(formData);

            if (!result.success) {
                // Better error handling for API validation errors
                const errorMessage = result.error || 'Failed to submit';
                
                // Log server error for debugging
                console.error('ServiceForm submission error:', {
                    status: result.status,
                    error: result.error,
                    details: result.details,
                });
                
                // If there are detailed validation errors from the API
                if (result.details && Array.isArray(result.details)) {
                    toast.error(result.details[0] || errorMessage);
                } else {
                    toast.error(errorMessage);
                }
                
                return;
            }

            toast.success(t('form.success'));
            onClose();
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                serviceType: '',
                domainOfWork: '',
                message: '',
            });
            setErrors({});
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error(error.message || t('form.errors.submit'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#020617] border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 p-6 flex items-center justify-between z-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-extrabold text-white tracking-tight">{t('form.title')}</h2>
                                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-bold">Request a Quote</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div 
                            className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full"
                        />

                        <form onSubmit={handleSubmit} className="relative z-10 p-8 space-y-7">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.fullName')} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#1E67C6] transition-colors" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                                            errors.fullName ? 'border-red-500/50' : 'border-white/10'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] outline-none text-white transition-all placeholder:text-white/20`}
                                        placeholder={t('form.fullNamePlaceholder')}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.phoneNumber')} <span className="text-red-500">*</span>
                                </label>
                                <div dir="ltr" className="relative group">
                                    <PhoneInput
                                        defaultCountry="ma"
                                        value={formData.phoneNumber}
                                        onChange={(phone) => {
                                            setFormData((prev) => ({ ...prev, phoneNumber: phone }));
                                            if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                                        }}
                                        className={`phone-dark-input block w-full border-none rounded-xl ${errors.phoneNumber ? 'ring-1 ring-red-500/50' : ''}`}
                                        style={{ 
                                            padding: '4px',
                                            '--react-international-phone-background': 'rgba(255,255,255,0.05)',
                                            '--react-international-phone-text-color': 'white',
                                            '--react-international-phone-border-color': 'rgba(255,255,255,0.1)',
                                            '--react-international-phone-dropdown-item-background': '#1e293b',
                                            '--react-international-phone-dropdown-item-text-color': 'white',
                                            '--react-international-phone-dropdown-item-hover-background': '#334155'
                                        } as React.CSSProperties}
                                        placeholder="+1 555 555 5555"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.email')} ({t('form.optional')})
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#1E67C6] transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                                            errors.email ? 'border-red-500/50' : 'border-white/10'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] outline-none text-white transition-all placeholder:text-white/20`}
                                        placeholder="example@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.email}</p>
                                )}
                            </div>

                            {/* Service Type */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.serviceType')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleInputChange}
                                    disabled={services.length === 0}
                                    className={`w-full px-4 py-3.5 bg-white/5 border ${
                                        errors.serviceType ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] outline-none text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
                                >
                                    <option value="" className="bg-[#020617]">{t('form.selectService')}</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.type} className="bg-[#020617]">
                                            {service.type}
                                        </option>
                                    ))}
                                    <option value="Other" className="bg-[#020617]">{t('form.otherOption')}</option>
                                </select>
                                {errors.serviceType && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.serviceType}</p>
                                )}
                            </div>

                            {/* Domain of Work */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.domainOfWork')} {formData.serviceType === 'Other' && <span className="text-red-500">*</span>} {formData.serviceType !== 'Other' && `(${t('form.optional')})`}
                                </label>
                                <input
                                    type="text"
                                    name="domainOfWork"
                                    value={formData.domainOfWork}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3.5 bg-white/5 border ${
                                        errors.domainOfWork ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] outline-none text-white transition-all placeholder:text-white/20`}
                                    placeholder={t('form.domainOfWorkPlaceholder')}
                                    maxLength={100}
                                />
                                {errors.domainOfWork && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.domainOfWork}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                                    {t('form.message')} ({t('form.optional')})
                                </label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30 group-focus-within:text-[#1E67C6] transition-colors" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                                            errors.message ? 'border-red-500/50' : 'border-white/10'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] outline-none text-white transition-all placeholder:text-white/20 resize-none`}
                                        placeholder={t('form.messagePlaceholder')}
                                        maxLength={1000}
                                    />
                                </div>
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.message}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                                >
                                    {t('form.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#1E67C6] to-[#13FFAA] text-[#020617] rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin" />
                                            {t('form.submitting')}
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            {t('form.submit')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <style jsx global>{`
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                            .phone-dark-input .react-international-phone-input {
                                width: 100% !important;
                                background: transparent !important;
                                border: none !important;
                                height: 50px !important;
                                color: white !important;
                                font-size: 1rem !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-button {
                                background: transparent !important;
                                border: none !important;
                                height: 50px !important;
                                padding-left: 12px !important;
                            }
                        `}</style>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

