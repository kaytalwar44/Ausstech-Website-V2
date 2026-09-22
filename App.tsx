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
  return (
    <>
      <Helmet>
        <title>
          IT Support, Cybersecurity &amp; NBN Services | Ausstech Consulting Services
        </title>
        <meta
          name="description"
          content="Ausstech Consulting Services provides IT consulting, cybersecurity, ERP support and NBN fault resolution for Australian small and medium businesses."
        />
        <link rel="canonical" href={siteConfig.url} />

        {/*
          Structured data. This is what produces the business panel in Google
          results and lets the site appear for "IT support near me". The
          address, phone and opening hours come from siteConfig — fill those in
          and the markup becomes valid without further changes.
        */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: siteConfig.legalName,
            alternateName: 'Ausstech',
            url: siteConfig.url,
            description:
              'IT consulting, cybersecurity, ERP support and NBN fault resolution for Australian small and medium businesses.',
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
          })}
        </script>
      </Helmet>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Testimonials />
        <CtaBand />
      </main>

      <Footer />
    </>
  );
}
