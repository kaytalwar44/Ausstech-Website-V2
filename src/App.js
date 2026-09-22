import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { WhyUs } from '@/components/WhyUs';
import { Testimonials } from '@/components/Testimonials';
import { CtaBand } from '@/components/CtaBand';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "IT Support, Cybersecurity & NBN Services | Ausstech Consulting Services" }), _jsx("meta", { name: "description", content: "Ausstech Consulting Services provides IT consulting, cybersecurity, ERP support and NBN fault resolution for Australian small and medium businesses." }), _jsx("link", { rel: "canonical", href: siteConfig.url }), _jsx("script", { type: "application/ld+json", children: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ProfessionalService',
                            name: siteConfig.legalName,
                            alternateName: 'Ausstech',
                            url: siteConfig.url,
                            description: 'IT consulting, cybersecurity, ERP support and NBN fault resolution for Australian small and medium businesses.',
                            telephone: siteConfig.phone || undefined,
                            email: siteConfig.email,
                            areaServed: siteConfig.serviceArea.map((area) => ({
                                '@type': 'AdministrativeArea',
                                name: area,
                            })),
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: siteConfig.addressSuburb,
                                addressRegion: siteConfig.addressState,
                                addressCountry: 'AU',
                            },
                            knowsAbout: [
                                'IT Consulting',
                                'Cybersecurity',
                                'NBN Fault Resolution',
                                'ERP Support',
                                'Website Development',
                            ],
                        }) })] }), _jsx("a", { href: "#main", className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900", children: "Skip to content" }), _jsx(Navigation, {}), _jsxs("main", { id: "main", children: [_jsx(Hero, {}), _jsx(TrustBar, {}), _jsx(Services, {}), _jsx(WhyUs, {}), _jsx(Testimonials, {}), _jsx(CtaBand, {})] }), _jsx(Footer, {})] }));
}
