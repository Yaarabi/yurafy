"use client";

import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (initialServiceType) {
            setFormData((prev) => ({ ...prev, serviceType: initialServiceType }));
        }
    }, [initialServiceType, isOpen]);

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

        // Validate that service type is in the available services list, initialServiceType, or 'Other'
        if (formData.serviceType && formData.serviceType !== 'Other') {
            const isValidService = services.some(service => service.type === formData.serviceType) || formData.serviceType === initialServiceType;
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
                    className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="tahoe-glass-card relative rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar bg-[#070e24]/98 border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-[#070e24]/95 backdrop-blur-xl border-b border-white/10">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{t('form.title')}</h2>
                                <p className="text-xs text-white/50 mt-1 uppercase tracking-widest font-semibold">Request a Quote</p>
                            </div>
                            <button
                                onClick={onClose}
                                type="button"
                                aria-label="Close"
                                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all active:scale-95 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div 
                            className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full"
                        />

                        <form onSubmit={handleSubmit} className="relative z-10 p-5 sm:p-8 space-y-5 sm:space-y-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.fullName')} <span className="text-red-400">*</span>
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#13FFAA] transition-colors" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/[0.06] hover:bg-white/[0.09] border ${
                                            errors.fullName ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-white/20 hover:border-white/35'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] focus:bg-[#070e24] outline-none text-white transition-all placeholder:text-white/45`}
                                        placeholder={t('form.fullNamePlaceholder')}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.phoneNumber')} <span className="text-red-400">*</span>
                                </label>
                                <div dir="ltr" className="relative group">
                                    <PhoneInput
                                        defaultCountry="ma"
                                        value={formData.phoneNumber}
                                        onChange={(phone) => {
                                            setFormData((prev) => ({ ...prev, phoneNumber: phone }));
                                            if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                                        }}
                                        className={`phone-dark-input block w-full rounded-xl ${errors.phoneNumber ? 'phone-error' : ''}`}
                                        style={{ 
                                            '--react-international-phone-background': 'rgba(255,255,255,0.06)',
                                            '--react-international-phone-text-color': 'white',
                                            '--react-international-phone-border-color': 'rgba(255,255,255,0.2)',
                                            '--react-international-phone-dropdown-item-background': '#0b1329',
                                            '--react-international-phone-dropdown-item-text-color': 'white',
                                            '--react-international-phone-dropdown-item-hover-background': '#1e293b',
                                            '--react-international-phone-dropdown-z-index': '100005',
                                        } as React.CSSProperties}
                                        placeholder="+212 600-000000"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.email')} ({t('form.optional')})
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#13FFAA] transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/[0.06] hover:bg-white/[0.09] border ${
                                            errors.email ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-white/20 hover:border-white/35'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] focus:bg-[#070e24] outline-none text-white transition-all placeholder:text-white/45`}
                                        placeholder="example@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.email}</p>
                                )}
                            </div>

                            {/* Service Type */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.serviceType')} <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleInputChange}
                                        disabled={services.length === 0}
                                        className={`w-full pl-4 pr-10 py-3.5 bg-white/[0.06] hover:bg-white/[0.09] border ${
                                            errors.serviceType ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-white/20 hover:border-white/35'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] focus:bg-[#070e24] outline-none text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer`}
                                    >
                                        <option value="" className="bg-[#0b1329] text-white/60">{t('form.selectService')}</option>
                                        {formData.serviceType && !services.some(s => s.type === formData.serviceType) && formData.serviceType !== 'Other' && (
                                            <option value={formData.serviceType} className="bg-[#0b1329] text-white">
                                                {formData.serviceType}
                                            </option>
                                        )}
                                        {services.map((service) => (
                                            <option key={service.id} value={service.type} className="bg-[#0b1329] text-white">
                                                {service.type}
                                            </option>
                                        ))}
                                        <option value="Other" className="bg-[#0b1329] text-white">{t('form.otherOption')}</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.serviceType && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.serviceType}</p>
                                )}
                            </div>

                            {/* Domain of Work */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.domainOfWork')} {formData.serviceType === 'Other' && <span className="text-red-400">*</span>} {formData.serviceType !== 'Other' && `(${t('form.optional')})`}
                                </label>
                                <input
                                    type="text"
                                    name="domainOfWork"
                                    value={formData.domainOfWork}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3.5 bg-white/[0.06] hover:bg-white/[0.09] border ${
                                        errors.domainOfWork ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-white/20 hover:border-white/35'
                                    } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] focus:bg-[#070e24] outline-none text-white transition-all placeholder:text-white/45`}
                                    placeholder={t('form.domainOfWorkPlaceholder')}
                                    maxLength={100}
                                />
                                {errors.domainOfWork && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.domainOfWork}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest">
                                    {t('form.message')} ({t('form.optional')})
                                </label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/50 group-focus-within:text-[#13FFAA] transition-colors" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-white/[0.06] hover:bg-white/[0.09] border ${
                                            errors.message ? 'border-red-500/60 ring-2 ring-red-500/20' : 'border-white/20 hover:border-white/35'
                                        } rounded-xl focus:ring-2 focus:ring-[#1E67C6]/50 focus:border-[#1E67C6] focus:bg-[#070e24] outline-none text-white transition-all placeholder:text-white/45 resize-none`}
                                        placeholder={t('form.messagePlaceholder')}
                                        maxLength={1000}
                                    />
                                </div>
                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-400 font-medium">{errors.message}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="order-2 sm:order-1 flex-1 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white rounded-xl font-bold transition-all uppercase tracking-widest text-xs cursor-pointer active:scale-98"
                                >
                                    {t('form.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="order-1 sm:order-2 flex-1 px-6 py-3.5 bg-gradient-to-r from-[#1E67C6] to-[#13FFAA] text-[#020617] rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
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
                            .phone-dark-input.react-international-phone-input-container {
                                width: 100% !important;
                                display: flex !important;
                                align-items: center !important;
                                background-color: rgba(255, 255, 255, 0.06) !important;
                                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                                border-radius: 0.75rem !important;
                                transition: all 0.2s ease !important;
                                box-sizing: border-box !important;
                                position: relative !important;
                            }
                            .phone-dark-input.react-international-phone-input-container:hover {
                                background-color: rgba(255, 255, 255, 0.09) !important;
                                border-color: rgba(255, 255, 255, 0.35) !important;
                            }
                            .phone-dark-input.react-international-phone-input-container:focus-within {
                                background-color: #070e24 !important;
                                border-color: #1E67C6 !important;
                                box-shadow: 0 0 0 2px rgba(30, 103, 198, 0.5) !important;
                            }
                            .phone-dark-input.react-international-phone-input-container.phone-error {
                                border-color: rgba(239, 68, 68, 0.7) !important;
                                box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25) !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-button {
                                background: transparent !important;
                                border: none !important;
                                border-right: 1px solid rgba(255, 255, 255, 0.18) !important;
                                height: 48px !important;
                                padding: 0 12px 0 14px !important;
                                border-top-left-radius: 0.75rem !important;
                                border-bottom-left-radius: 0.75rem !important;
                                display: flex !important;
                                align-items: center !important;
                                justify-content: center !important;
                                cursor: pointer !important;
                                transition: background-color 0.15s ease !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-button:hover {
                                background-color: rgba(255, 255, 255, 0.08) !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-button__dropdown-arrow {
                                border-top-color: rgba(255, 255, 255, 0.75) !important;
                                margin-left: 8px !important;
                            }
                            .phone-dark-input .react-international-phone-input {
                                width: 100% !important;
                                background: transparent !important;
                                border: none !important;
                                height: 48px !important;
                                color: #ffffff !important;
                                font-size: 0.95rem !important;
                                font-family: inherit !important;
                                padding-left: 14px !important;
                                padding-right: 14px !important;
                                outline: none !important;
                                box-shadow: none !important;
                            }
                            .phone-dark-input .react-international-phone-input::placeholder {
                                color: rgba(255, 255, 255, 0.45) !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-dropdown {
                                background-color: #0b1329 !important;
                                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                                border-radius: 0.75rem !important;
                                box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7) !important;
                                z-index: 100005 !important;
                                max-height: 240px !important;
                                color: #ffffff !important;
                                margin-top: 8px !important;
                                overflow-y: auto !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-dropdown__list-item {
                                color: #e2e8f0 !important;
                                padding: 8px 12px !important;
                                font-size: 0.875rem !important;
                                display: flex !important;
                                align-items: center !important;
                                gap: 8px !important;
                                cursor: pointer !important;
                                transition: background-color 0.15s ease !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-dropdown__list-item:hover,
                            .phone-dark-input .react-international-phone-country-selector-dropdown__list-item--selected,
                            .phone-dark-input .react-international-phone-country-selector-dropdown__list-item--focused {
                                background-color: #1e293b !important;
                                color: #ffffff !important;
                            }
                            .phone-dark-input .react-international-phone-country-selector-dropdown__list-item-dial-code {
                                color: #94a3b8 !important;
                                font-weight: 500 !important;
                                margin-left: auto !important;
                            }
                        `}</style>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

