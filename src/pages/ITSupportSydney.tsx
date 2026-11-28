import { ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';

import { Section, SectionHeading } from '@/components/Section';
import { siteConfig } from '@/config/site';
import content from '@/content/it-support-sydney.json';

function ContactLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <a href={`tel:${siteConfig.phone}`} className="btn-primary">
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        Call {siteConfig.phoneDisplay}
      </a>
      <a href={`mailto:${siteConfig.email}`} className="btn-secondary max-w-full !px-4 sm:!px-6">
        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 break-all">Email {siteConfig.email}</span>
      </a>
    </div>
  );
}

export default function ITSupportSydney() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-52 text-white sm:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-navy-200">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="underline underline-offset-4 hover:text-white">Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">IT Support Sydney</li>
            </ol>
          </nav>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="heading-xl max-w-4xl text-balance">{content.h1}</h1>
          <p className="body-lg mt-6 max-w-3xl text-navy-200">{content.intro}</p>
          <p className="body-lg mt-4 max-w-3xl text-navy-200">{content.introDetail}</p>
          <div className="mt-9"><ContactLinks /></div>
          <a href="#quote-guarantee" className="mt-6 inline-block text-sm font-semibold text-electric-300 underline underline-offset-4">
            {siteConfig.quoteGuarantee}
          </a>
        </div>
      </section>

      <Section id="services">
        <SectionHeading title={content.servicesHeading} lead={content.servicesIntro} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map(({ title, description }) => (
            <article key={title} className="service-card">
              <CheckCircle2 className="mb-5 h-7 w-7 text-electric-600" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading title={content.localHeading} align="left" />
        <div className="max-w-4xl space-y-5 text-lg leading-relaxed text-navy-600">
          {content.localParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </Section>

      <Section id="why-us">
        <SectionHeading title={content.whyHeading} />
        <div className="grid gap-6 md:grid-cols-2">
          {content.reasons.map(({ title, description }) => (
            <article key={title} className="rounded-2xl border border-navy-100 p-7">
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading title={content.processHeading} />
        <ol className="grid gap-6 md:grid-cols-3">
          {content.steps.map(({ title, description }, index) => (
            <li key={title} className="rounded-2xl border border-navy-100 bg-white p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-electric-50 font-bold text-electric-600" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="quote-guarantee" dark>
        <SectionHeading title={content.guaranteeHeading} lead={content.guaranteeText} dark />
        <div className="flex justify-center">
          <a href="#contact" className="btn-primary">
            Discuss your quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Section>

      <Section>
        <SectionHeading title={content.relatedHeading} lead={content.relatedIntro} />
        <div className="grid gap-6 md:grid-cols-2">
          {content.relatedLinks.map(({ href, label, description }) => (
            <article key={href} className="rounded-2xl border border-navy-100 p-7">
              <h3 className="text-xl font-semibold text-navy-950">
                <a href={href} className="text-electric-700 underline underline-offset-4 hover:text-electric-600">{label}</a>
              </h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faqs" className="bg-slate-50">
        <SectionHeading title={content.faqHeading} />
        <div className="mx-auto max-w-4xl space-y-4">
          {content.faqs.map(({ question, answer }) => (
            <details key={question} className="rounded-xl border border-navy-100 bg-white p-5 sm:p-6">
              <summary className="cursor-pointer text-lg font-semibold text-navy-950">
                <h3 className="inline">{question}</h3>
              </summary>
              <p className="mt-4 leading-relaxed text-navy-600">{answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" dark>
        <SectionHeading title={content.contactHeading} lead={content.contactText} dark align="left" />
        <ContactLinks />
      </Section>
    </>
  );
}
