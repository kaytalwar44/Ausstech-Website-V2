import { ArrowRight, ClipboardList, FileText, Phone, Receipt } from 'lucide-react';

import { Section, SectionHeading } from '@/components/Section';
import { siteConfig } from '@/config/site';

const services = [
  {
    icon: ClipboardList,
    title: 'Project administration',
    description: 'Keep project records, action lists and documentation organised so your team can focus on delivery.',
  },
  {
    icon: FileText,
    title: 'Documentation & reporting',
    description: 'Practical help preparing, updating and organising business documents, spreadsheets and reports.',
  },
  {
    icon: Receipt,
    title: 'Bookkeeping & reconciliation support',
    description: 'Support with day-to-day records and reconciliation, with a clear scope agreed before work begins.',
  },
  {
    icon: ClipboardList,
    title: 'General office support',
    description: 'Help with routine administration, data entry and record organisation when your team is stretched.',
  },
];

export default function AdminSupport() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-52 text-white sm:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <span className="eyebrow">Admin &amp; business support</span>
          <h1 className="heading-xl max-w-4xl text-balance">
            Less time on paperwork. More time for your business.
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-navy-200">
            Practical administrative support for Australian small and medium
            businesses. Tell us what needs doing and we&apos;ll agree the scope
            and price before work starts.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={`tel:${siteConfig.phone}`} className="btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {siteConfig.phoneDisplay}
            </a>
            <a href="#contact" className="btn-secondary">
              Discuss your needs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-electric-300">
            {siteConfig.quoteGuarantee}
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="How we can help"
          title="Support for the work that keeps piling up"
          lead="One-off tasks or help with recurring administration — start with a conversation about what your business needs."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
              <Icon className="mb-5 h-7 w-7 text-electric-600" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Getting started"
          title="Clear scope. Fixed price. Practical help."
          lead="Call us about the tasks you need help with. We’ll clarify the requirements, agree the deliverables and provide a fixed-price quote before any work begins."
        />
        <div className="text-center">
          <a href={`tel:${siteConfig.phone}`} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </Section>
    </>
  );
}
