import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Ausstech' },
  { href: '#testimonials', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Deepen the glass on scroll so the nav separates from the hero as it moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function go(href: string) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={cn(
        'glass-nav fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled && 'glass-nav-scrolled',
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Wordmark */}
          <a
            href="#main"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5"
            aria-label={`${siteConfig.tradingName} — home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-400 to-electric-600 text-sm font-bold text-white">
              A
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-white">
                Ausstech
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-navy-300">
                Consulting
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {siteConfig.phoneDisplay && (
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-electric-300"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            )}
            <button onClick={() => go('#contact')} className="btn-primary !py-2.5 !text-sm">
              Request a quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="rounded-lg px-4 py-3 text-left text-base font-medium text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              ))}

              {siteConfig.phoneDisplay && (
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-semibold text-electric-300"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phoneDisplay}
                </a>
              )}

              <button
                onClick={() => go('#contact')}
                className="btn-primary mt-2 w-full"
              >
                Request a quote
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
