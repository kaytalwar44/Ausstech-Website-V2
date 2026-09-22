import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';

import { Section } from '@/components/Section';
import { siteConfig } from '@/config/site';

/**
 * Conversion section. Deliberately low-friction: phone and email are given
 * equal weight, because Australian SMB buyers overwhelmingly prefer to call
 * before they fill in a form.
 *
 * A mailto fallback is used rather than a form so the page generates leads the
 * moment it deploys, with no backend required. Swap to a posted form plus a
 * handler (Formspree, Resend, or a Supabase table) when volume justifies it.
 */
export function CtaBand() {
  return (
    <Section id="contact" dark className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden="true"
      />

      <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Get in touch</span>

          <h2 className="heading-lg text-balance text-white">
            Tell us what is going wrong. We will tell you what it takes to fix
            it.
          </h2>

          <p className="body-lg mt-5 text-balance text-navy-200">
            A short conversation is usually enough to scope the work and give
            you a fixed price. No obligation, and no sales script.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            {siteConfig.phoneDisplay && (
              <a href={`tel:${siteConfig.phone}`} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {siteConfig.phoneDisplay}
              </a>
            )}

            <a
              href={`mailto:${siteConfig.email}?subject=Enquiry%20from%20website`}
              className="btn-secondary"
            >
              <Mail className="h-4 w-4" />
              Email us
            </a>
          </div>

          {!siteConfig.phoneDisplay && (
            <p className="mt-5 text-sm text-navy-300">
              Add a phone number in <code>src/config/site.ts</code> to show a
              click-to-call button here.
            </p>
          )}
        </motion.div>

        {/* Contact detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <h3 className="text-lg font-semibold text-white">
            How to reach us
          </h3>

          <dl className="mt-6 space-y-5">
            <div className="flex gap-4">
              <dt className="shrink-0">
                <Mail className="h-5 w-5 text-electric-400" aria-hidden="true" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-white transition-colors hover:text-electric-300"
                >
                  {siteConfig.email}
                </a>
                <p className="mt-0.5 text-sm text-navy-300">
                  Replies within one business day.
                </p>
              </dd>
            </div>

            <div className="flex gap-4">
              <dt className="shrink-0">
                <MapPin className="h-5 w-5 text-electric-400" aria-hidden="true" />
                <span className="sr-only">Service area</span>
              </dt>
              <dd>
                <p className="font-medium text-white">
                  {siteConfig.serviceArea.join(' · ')}
                </p>
                <p className="mt-0.5 text-sm text-navy-300">
                  On-site locally, remote Australia-wide.
                </p>
              </dd>
            </div>

            <div className="flex gap-4">
              <dt className="shrink-0">
                <Clock className="h-5 w-5 text-electric-400" aria-hidden="true" />
                <span className="sr-only">Hours</span>
              </dt>
              <dd>
                <p className="font-medium text-white">
                  Monday to Friday, 8am – 6pm
                </p>
                <p className="mt-0.5 text-sm text-navy-300">
                  Urgent faults: call and leave a message.
                </p>
              </dd>
            </div>
          </dl>

          <a
            href={`mailto:${siteConfig.email}?subject=Enquiry%20from%20website`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-electric-300 transition-colors hover:text-electric-200"
          >
            Send us the details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
