import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Phone } from 'lucide-react';

import { siteConfig } from '@/config/site';

/** Shared entrance timing — one curve across the page reads as considered. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Layered background: gradient wash, grid, and two soft light blooms.
          All decorative, all pointer-events-none. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-electric-500/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-electric-600/15 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-xl"
          >
            <motion.div variants={rise} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5 text-sm font-medium text-electric-300">
                <ShieldCheck className="h-4 w-4" />
                IT &amp; cybersecurity for Australian business
              </span>
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.5 }}
              className="heading-xl mt-6 text-balance text-white"
            >
              Technology that works.
              <span className="mt-2 block bg-gradient-to-r from-electric-300 to-electric-500 bg-clip-text text-transparent">
                Support that answers.
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.5 }}
              className="body-lg mt-6 text-balance text-navy-200"
            >
              We look after IT infrastructure, cybersecurity, ERP systems and NBN
              connections for small and medium businesses across Australia — with
              local engineers, fixed-scope quotes, and plain-English reporting.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="btn-primary">
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>

              <a href="#services" className="btn-secondary">
                See our services
              </a>
            </motion.div>

            {siteConfig.phoneDisplay && (
              <motion.a
                variants={rise}
                transition={{ duration: 0.5 }}
                href={`tel:${siteConfig.phone}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric-300 transition-colors hover:text-electric-200"
              >
                <Phone className="h-4 w-4" />
                Or call {siteConfig.phoneDisplay}
              </motion.a>
            )}
          </motion.div>

          {/* Illustration: a stylised network/security diagram built from
              divs and SVG, so it costs no image weight and scales cleanly. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-[12%] rounded-full border border-white/10" />
              <div className="absolute inset-[26%] rounded-full border border-electric-500/20" />
              <div className="absolute inset-[40%] rounded-full border border-electric-500/30" />

              {/* Centre node */}
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-electric-400/40 bg-navy-900/80 shadow-glow backdrop-blur">
                <ShieldCheck className="h-10 w-10 text-electric-400" />
              </div>

              {/* Orbiting nodes — each a labelled service point */}
              {[
                { label: 'Network', top: '6%', left: '50%' },
                { label: 'Cloud', top: '50%', left: '94%' },
                { label: 'ERP', top: '94%', left: '50%' },
                { label: 'NBN', top: '50%', left: '6%' },
              ].map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  style={{ top: node.top, left: node.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-navy-900/70 px-3 py-1.5 text-xs font-semibold text-navy-100 backdrop-blur"
                >
                  {node.label}
                </motion.div>
              ))}

              {/* Connective lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none">
                {[
                  'M200 40 L200 160',
                  'M360 200 L240 200',
                  'M200 360 L200 240',
                  'M40 200 L160 200',
                ].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    stroke="url(#line)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                  />
                ))}
                <defs>
                  <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
