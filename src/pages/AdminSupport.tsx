import { CheckCircle2, Mail, Phone } from 'lucide-react';

import { Section, SectionHeading } from '@/components/Section';
import { siteConfig } from '@/config/site';

const benefits = [
  {
    title: 'Lower Staffing Costs',
    description: 'Reduce employment overheads while maintaining service quality and business efficiency.',
  },
  {
    title: 'Extended Business Hours',
    description: 'Provide support across multiple time zones and improve responsiveness to customers and projects.',
  },
  {
    title: 'Trained Administrative Staff',
    description: 'Access experienced resources for administration, scheduling, reporting, customer service and back-office operations.',
  },
  {
    title: 'Dedicated Support Resources',
    description: 'Work with dedicated team members who become familiar with your business processes and requirements.',
  },
  {
    title: 'Australian Managed',
    description: 'All engagements are managed through Auss-Tech, providing a local point of contact and accountability.',
  },
  {
    title: 'Flexible Scaling',
    description: 'Increase or reduce resources as your business requirements change.',
  },
];

const services = [
  'Administrative Support',
  'Customer Service Support',
  'Scheduling & Dispatch Coordination',
  'Data Entry & Documentation',
  'Microsoft 365 Administration',
  'Help Desk Support',
  'Project Administration',
  'CRM Management',
  'Reporting & Compliance Assistance',
  'Back Office Operations',
];

export default function AdminSupport() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-52 text-white sm:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <span className="eyebrow">Administrative &amp; Offshore Support Services</span>
          <h1 className="heading-xl max-w-4xl text-balance">
            Scale Your Business Without The Cost Of Local Hiring
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-navy-200">
            Auss-Tech helps Australian businesses access skilled administrative,
            customer service and technical support resources without the overheads
            of traditional recruitment.
          </p>
          <p className="body-lg mt-4 max-w-2xl text-navy-200">
            Whether you need a dedicated administrator, customer service
            representative, scheduling coordinator, data entry specialist or IT
            support resource, we can help you extend your team quickly and
            cost-effectively.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={`tel:${siteConfig.phone}`} className="btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn-secondary max-w-full !px-4 sm:!px-6">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 break-all">Email {siteConfig.email}</span>
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-electric-300">
            {siteConfig.quoteGuarantee}
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading title="Benefits" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, description }) => (
            <article key={title} className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
              <CheckCircle2 className="mb-5 h-7 w-7 text-electric-600" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-navy-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-navy-600">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading title="Services Available" />
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5 font-medium text-navy-950">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-electric-600" aria-hidden="true" />
              {service}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" dark>
        <SectionHeading
          title="Need additional resources without the cost of local recruitment?"
          dark
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:flex-wrap">
          <a href={`tel:${siteConfig.phone}`} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {siteConfig.phoneDisplay}
          </a>
          <span className="text-navy-200">or</span>
          <a href={`mailto:${siteConfig.email}`} className="btn-secondary max-w-full !px-4 sm:!px-6">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0 break-all">Email {siteConfig.email}</span>
          </a>
        </div>
      </Section>
    </>
  );
}
