import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { WhyUs } from '@/components/WhyUs';
import { Testimonials } from '@/components/Testimonials';
import { CtaBand } from '@/components/CtaBand';
import { Footer } from '@/components/Footer';
import AdminSupport from '@/pages/AdminSupport';
import ITSupportSydney from '@/pages/ITSupportSydney';

export default function App() {
  const isAdminSupport = /^\/admin-support\/?$/.test(window.location.pathname);
  const isITSupportSydney = /^\/it-support-sydney\/?$/.test(window.location.pathname);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main">
        {isITSupportSydney ? <ITSupportSydney /> : isAdminSupport ? <AdminSupport /> : (
          <>
            <Hero />
            <TrustBar />
            <Services />
            <WhyUs />
            <Testimonials />
          </>
        )}
        {!isAdminSupport && !isITSupportSydney && <CtaBand />}
      </main>

      <Footer />
    </>
  );
}
