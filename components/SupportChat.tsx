"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type Message = { _id?: string; role: "user" | "bot"; text: string };

export default function SupportChat() {
    const t = useTranslations("Support");
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const LOCAL_STORAGE_KEY = "support_services_messages";

    // Load messages from localStorage
    useEffect(() => {
        if (!open) return;
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            setMessages(raw ? JSON.parse(raw) : []);
        } catch {
            setMessages([]);
        }
    }, [open]);

    // Persist messages to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
        } catch {}
    }, [messages]);

    // Scroll to bottom
    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Focus input when chat opens
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 120);
    }, [open]);

    // Close chat if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                open &&
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                !(e.target as HTMLElement).closest("button[aria-label='Open support chat']")
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    async function handleSend() {
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.text }),
            });
            const data = await res.json();
            if (data?.reply) {
                setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "bot", text: t("chat.defaultError") || "Sorry, an error occurred." },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: t("chat.defaultError") || "Sorry, an error occurred." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Toggle Button */}
            <button
                aria-label={open ? "Close support chat" : "Open support chat"}
                aria-expanded={open}
                aria-controls="support-chat-panel"
                onClick={() => setOpen((o) => !o)}
                className="fixed right-4 bottom-4 z-[99999] bg-gradient-to-b from-[#13FFAA] to-[#1E67C6] text-slate-950 rounded-full p-4 sm:p-3.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ring-2 ring-white/20"
            >
                {open ? "✕" : "💬"}
            </button>

            {/* Chat Panel */}
            {open && (
                <div
                    ref={panelRef}
                    id="support-chat-panel"
                    role="dialog"
                    aria-label={t("chat.title") || "Support Chat"}
                    className="fixed z-[99999] bg-[#020617]/95 text-white border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col p-4
                        inset-x-4 bottom-20 sm:inset-auto sm:right-4 sm:bottom-16 sm:w-84 md:w-96 max-h-[70vh] sm:max-h-[60vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                        <div className="font-bold text-base text-white">{t("chat.title") || "Support Chat"}</div>
                        <button
                            aria-label="Close chat"
                            onClick={() => setOpen(false)}
                            className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 mb-3 p-3 bg-white/5 border border-white/5 rounded-xl overflow-auto flex flex-col gap-2.5 max-h-[320px]">
                        {messages.length === 0 && (
                            <p className="text-xs text-white/40 text-center my-auto">
                                {t("chat.welcome") || "How can we help you today?"}
                            </p>
                        )}
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`text-xs sm:text-sm p-3 rounded-xl max-w-[85%] leading-relaxed ${
                                    m.role === "user"
                                        ? "bg-[#1E67C6] text-white self-end rounded-br-none"
                                        : "bg-white/10 text-white/90 self-start rounded-bl-none border border-white/5"
                                }`}
                            >
                                {m.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-xs text-white/40 italic p-2 self-start animate-pulse">
                                {t("chat.typing") || "Thinking..."}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder={t("chat.inputPlaceholder") || "Type your message..."}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#13FFAA]/50 focus:ring-1 focus:ring-[#13FFAA]/50 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="bg-gradient-to-b from-[#13FFAA] to-[#1E67C6] text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
                        >
                            {t("chat.send") || "Send"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
