import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Quote, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
/**
 * Testimonials drawn from the client feedback already published on the
 * existing site.
 *
 * Photos are rendered as initials avatars rather than the previous stock
 * imagery. Two reasons: a stock face beside a specific technical claim
 * ("traced the fault to the pit") reads as fabricated to a business buyer, and
 * initials with a suburb are verifiable. Swap back to real photographs only
 * with written customer permission.
 *
 * TODO: confirm each customer is happy to be named, and add their actual
 * suburb in place of the current placeholders.
 */
const TESTIMONIALS = [
    {
        initials: 'JD',
        name: 'John D.',
        suburb: 'Sydney',
        quote: 'Ausstech resolved our office IT issues quickly and professionally.',
        service: 'IT support',
    },
    {
        initials: 'SK',
        name: 'Sarah K.',
        suburb: 'Sydney',
        quote: 'Ausstech secured our systems and gave us peace of mind.',
        service: 'Cybersecurity',
    },
    {
        initials: 'MP',
        name: 'Michael P.',
        suburb: 'Sydney',
        quote: 'They rebuilt our website and fixed ERP issues with great expertise.',
        service: 'Website & ERP',
    },
    {
        initials: 'MT',
        name: 'Mark T.',
        suburb: 'Sydney',
        quote: 'Daily dropouts fixed after Ausstech coordinated NBN repairs.',
        service: 'NBN fault resolution',
    },
    {
        initials: 'OH',
        name: 'Olivia H.',
        suburb: 'Sydney',
        quote: 'Modem replaced and Wi-Fi improved across the house.',
        service: 'Home network',
    },
    {
        initials: 'JW',
        name: 'Jason W.',
        suburb: 'Sydney',
        quote: 'Ausstech traced the fault to the pit and got NBN to fix it.',
        service: 'NBN fault resolution',
    },
    {
        initials: 'RL',
        name: 'Rebecca L.',
        suburb: 'Sydney',
        quote: 'Quick installation, neat work, and clear explanation.',
        service: 'Installation',
    },
];
export function Testimonials() {
    return (_jsxs(Section, { id: "testimonials", className: "bg-white", children: [_jsx(SectionHeading, { eyebrow: "Client feedback", title: "What our clients say", lead: "Feedback from businesses and households we have supported across IT, security and NBN services." }), _jsx("div", { className: "columns-1 gap-6 md:columns-2 lg:columns-3", children: TESTIMONIALS.map((item, index) => (_jsxs(motion.figure, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.4, delay: (index % 3) * 0.06 }, className: "mb-6 break-inside-avoid rounded-2xl border border-navy-100 bg-navy-50/50 p-6 shadow-card", children: [_jsx(Quote, { className: "mb-4 h-6 w-6 text-electric-400", "aria-hidden": "true" }), _jsxs("blockquote", { className: "text-sm leading-relaxed text-navy-900", children: ["\u201C", item.quote, "\u201D"] }), _jsxs("figcaption", { className: "mt-5 flex items-center gap-3 border-t border-navy-100 pt-5", children: [_jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white", "aria-hidden": "true", children: item.initials }), _jsxs("span", { className: "min-w-0", children: [_jsx("span", { className: "block text-sm font-semibold text-navy-950", children: item.name }), _jsxs("span", { className: "mt-0.5 flex items-center gap-1 text-xs text-ink-muted", children: [_jsx(MapPin, { className: "h-3 w-3", "aria-hidden": "true" }), item.suburb, _jsx("span", { className: "mx-1 text-navy-200", children: "\u00B7" }), item.service] })] })] })] }, item.name))) })] }));
}
