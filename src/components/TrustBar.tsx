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

  return (
    <section className="border-y border-navy-100 bg-navy-50/60 py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => {
            const isStat = 'value' in item;
            return (
              <div key={isStat ? item.label : item.title} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-electric-500"
                  aria-hidden="true"
                />
                <div>
                  {isStat ? (
                    <>
                      <p className="text-2xl font-bold tabular-nums text-navy-950">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-muted">{item.label}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-navy-950">{item.title}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        {item.detail}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Serving {siteConfig.serviceArea.join(' · ')}
        </p>
      </div>
    </section>
  );
}
