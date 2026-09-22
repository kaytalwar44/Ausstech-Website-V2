import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ShieldCheck, Network, Code2, Database, Wifi, Calculator, ArrowRight, } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
/**
 * Six cards. Titles match the service lines published on the existing site, so
 * the redesign does not silently drop a revenue stream.
 */
const SERVICES = [
    {
        icon: ShieldCheck,
        title: 'Cybersecurity',
        summary: 'Find the gaps before someone else does — and close them with measures proportionate to your business.',
        points: [
            'Security posture review',
            'Endpoint and email protection',
            'Access control and MFA rollout',
            'Incident response planning',
        ],
    },
    {
        icon: Network,
        title: 'IT Consulting',
        summary: 'Infrastructure, cloud and digital transformation guidance from someone who will also do the work.',
        points: [
            'Infrastructure planning',
            'Cloud migration guidance',
            'Network design and review',
            'Technology roadmapping',
        ],
    },
    {
        icon: Database,
        title: 'ERP & Application Support',
        summary: 'Implementation, troubleshooting and optimisation for the systems your business actually runs on.',
        points: [
            'ERP implementation',
            'Application troubleshooting',
            'Process automation',
            'System optimisation',
        ],
    },
    {
        icon: Wifi,
        title: 'NBN Services',
        summary: 'End-to-end NBN resolution, including the faults your provider keeps closing without fixing.',
        points: [
            'Fault diagnosis and escalation',
            'Modem and router setup',
            'Speed and stability issues',
            'Home and office network setup',
        ],
    },
    {
        icon: Code2,
        title: 'Website Development',
        summary: 'Fast, accessible, search-ready websites — built and maintained by the same team that supports your IT.',
        points: [
            'Custom design and build',
            'Hosting and maintenance',
            'SEO-ready structure',
            'Ongoing content updates',
        ],
    },
    {
        icon: Calculator,
        title: 'Business Support',
        summary: 'The administrative and financial groundwork that keeps projects moving when your team is stretched.',
        points: [
            'Project administration',
            'Bookkeeping and reconciliation',
            'Documentation and reporting',
            'General office support',
        ],
    },
];
export function Services() {
    return (_jsxs(Section, { id: "services", className: "bg-white", children: [_jsx(SectionHeading, { eyebrow: "What we do", title: "Six ways we keep your business running", lead: "From a laptop that will not connect to a security review of your whole estate \u2014 the same team, the same accountability." }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: SERVICES.map((service, index) => (_jsxs(motion.article, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.45, delay: index * 0.06 }, className: "service-card group", children: [_jsx("span", { className: "card-icon", children: _jsx(service.icon, { className: "h-6 w-6", "aria-hidden": "true" }) }), _jsx("h3", { className: "text-lg font-semibold text-navy-950", children: service.title }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-ink-muted", children: service.summary }), _jsx("ul", { className: "mt-5 space-y-2 border-t border-navy-100 pt-5", children: service.points.map((point) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-ink-muted", children: [_jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500", "aria-hidden": "true" }), point] }, point))) }), _jsxs("a", { href: "#contact", className: "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600 transition-colors group-hover:text-electric-500", children: ["Discuss this service", _jsx(ArrowRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })] })] }, service.title))) })] }));
}
