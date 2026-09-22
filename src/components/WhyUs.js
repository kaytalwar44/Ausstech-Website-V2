import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { PhoneCall, FileCheck2, Wrench, LifeBuoy } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
/**
 * Process section. A premium services site shows how engagement works — it
 * removes the buyer's main hesitation, which is not knowing what happens after
 * they make contact.
 */
const STEPS = [
    {
        icon: PhoneCall,
        step: '01',
        title: 'Tell us what is happening',
        detail: 'A short call or email. No obligation, no sales script — we ask enough questions to understand the problem.',
    },
    {
        icon: FileCheck2,
        step: '02',
        title: 'Receive a fixed-scope quote',
        detail: 'Written scope and price before any work begins, so you can approve a number rather than an hourly estimate.',
    },
    {
        icon: Wrench,
        step: '03',
        title: 'We do the work',
        detail: 'Scheduled around your operating hours where possible, with the engineer who scoped it doing the work.',
    },
    {
        icon: LifeBuoy,
        step: '04',
        title: 'Support continues',
        detail: 'Documentation of what changed, and a direct line back to us if something needs revisiting.',
    },
];
const REASONS = [
    {
        title: 'Australian-based engineers',
        detail: 'You deal with the person doing the work — not a ticket queue that routes offshore.',
    },
    {
        title: 'Fixed-scope pricing',
        detail: 'Quoted up front so you can budget. We would rather decline unclear work than bill open-ended.',
    },
    {
        title: 'Sized for small and medium business',
        detail: 'Proportionate security and infrastructure advice — enterprise process without enterprise overhead.',
    },
    {
        title: 'Plain-English reporting',
        detail: 'Findings and recommendations written for the person signing the invoice, not for a technician.',
    },
];
export function WhyUs() {
    return (_jsxs(Section, { id: "why-us", className: "bg-navy-50/60", children: [_jsx(SectionHeading, { eyebrow: "How we work", title: "Straightforward process, no surprises", lead: "Most IT frustration comes from unclear scope and unanswered calls. Both are avoidable." }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: STEPS.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.45, delay: index * 0.08 }, className: "relative rounded-2xl border border-navy-100 bg-white p-6 shadow-card", children: [_jsx("span", { className: "absolute right-5 top-5 text-3xl font-bold tabular-nums text-navy-100", children: item.step }), _jsx("span", { className: "card-icon", children: _jsx(item.icon, { className: "h-6 w-6", "aria-hidden": "true" }) }), _jsx("h3", { className: "text-base font-semibold text-navy-950", children: item.title }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-ink-muted", children: item.detail })] }, item.step))) }), _jsx("div", { className: "mt-16 grid gap-8 lg:grid-cols-2", children: REASONS.map((reason, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -16 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.4, delay: index * 0.06 }, className: "flex gap-4 border-l-2 border-electric-500 pl-5", children: _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-navy-950", children: reason.title }), _jsx("p", { className: "mt-1 text-sm leading-relaxed text-ink-muted", children: reason.detail })] }) }, reason.title))) })] }));
}
