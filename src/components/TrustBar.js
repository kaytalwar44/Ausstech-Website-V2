import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
/**
 * Trust band.
 *
 * Shows real statistics when siteConfig.stats is populated, and falls back to
 * qualitative commitments when it is not. The fallback exists because
 * fabricated numbers are the fastest way to lose a business buyer — a claim
 * that cannot be checked reads as marketing, not as evidence.
 */
export function TrustBar() {
    const hasStats = siteConfig.stats.length > 0;
    const items = hasStats ? siteConfig.stats : siteConfig.commitments;
    return (_jsx("section", { className: "border-y border-navy-100 bg-navy-50/60 py-12", children: _jsxs("div", { className: "container", children: [_jsx(motion.div, { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.5 }, className: "grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4", children: items.map((item) => {
                        const isStat = 'value' in item;
                        return (_jsxs("div", { className: "flex gap-3", children: [_jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-electric-500", "aria-hidden": "true" }), _jsx("div", { children: isStat ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-2xl font-bold tabular-nums text-navy-950", children: item.value }), _jsx("p", { className: "mt-0.5 text-sm text-ink-muted", children: item.label })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "font-semibold text-navy-950", children: item.title }), _jsx("p", { className: "mt-0.5 text-sm text-ink-muted", children: item.detail })] })) })] }, isStat ? item.label : item.title));
                    }) }), _jsxs("p", { className: "mt-8 text-center text-xs text-ink-muted", children: ["Serving ", siteConfig.serviceArea.join(' · ')] })] }) }));
}
